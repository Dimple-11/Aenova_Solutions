import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status

from google.oauth2 import id_token
from google.auth.transport import requests

from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.security import (
    create_access_token,
    create_admin_access_token,
    create_admin_refresh_token,
    create_refresh_token,
    decode_token,
    hash_password,
    verify_password,
)
from app.database import get_db
from app.deps import get_current_admin, get_current_user
from app.models import Admin, PasswordResetToken, User
from app.schemas import (
    ForgotPasswordRequest,
    ResetPasswordRequest,
    SignupRequest,
    TokenResponse,
    UserOut,
)

router = APIRouter(prefix="/api/auth", tags=["auth"])


def _issue_tokens(user_id: str) -> TokenResponse:
    return TokenResponse(
        access_token=create_access_token(user_id),
        refresh_token=create_refresh_token(user_id),
    )


def _issue_admin_tokens(admin_id: str) -> TokenResponse:
    return TokenResponse(
        access_token=create_admin_access_token(admin_id),
        refresh_token=create_admin_refresh_token(admin_id),
    )


def _google_profile(credential: str) -> dict:
    if not settings.google_client_id:
        raise HTTPException(status_code=503, detail="Google sign-in is not configured.")
    try:
        profile = id_token.verify_oauth2_token(
            credential, requests.Request(), settings.google_client_id
        )
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid Google credential.")
    email = profile.get("email")
    if not email or profile.get("email_verified") is not True:
        raise HTTPException(status_code=401, detail="A verified Google email is required.")
    profile["email"] = email.strip().lower()
    return profile


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def signup(payload: SignupRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")

    user = User(
        name=payload.full_name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        company=payload.company,
        onboarded=False,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return _issue_tokens(user.id)


@router.post("/login", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .filter(
            (User.email == form_data.username)
            | (User.phone == form_data.username)
        )
        .first()
    )

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email/phone or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return _issue_tokens(user.id)

@router.post("/refresh", response_model=TokenResponse)
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    payload = decode_token(refresh_token)
    if payload is None or payload.get("type") not in {"refresh", "admin_refresh"}:
        raise HTTPException(status_code=401, detail="Invalid refresh token.")
    user_id = payload.get("sub")
    if payload.get("type") == "admin_refresh":
        admin = db.get(Admin, user_id)
        if not admin or admin.status != "Active":
            raise HTTPException(status_code=401, detail="Invalid refresh token.")
        return _issue_admin_tokens(admin.id)

    user = db.get(User, user_id)
    if user:
        return _issue_tokens(user.id)
    # Backward compatibility for admin refresh tokens issued before this change.
    admin = db.get(Admin, user_id)
    if admin and admin.status == "Active":
        return _issue_admin_tokens(admin.id)
    raise HTTPException(status_code=401, detail="Invalid refresh token.")


@router.get("/me", response_model=UserOut)
def read_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.post("/verify-email", response_model=UserOut)
def verify_email(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    current_user.is_email_verified = True
    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/forgot-password")
def forgot_password(payload: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    # Always return a generic response to avoid leaking whether an email is registered.
    if user:
        token = secrets.token_urlsafe(32)
        reset = PasswordResetToken(
            user_id=user.id,
            token=token,
            expires_at=datetime.utcnow() + timedelta(hours=1),
        )
        db.add(reset)
        db.commit()
        # In production, email `token` to the user via a transactional email service.
    return {"message": "If an account with that email exists, a reset link has been sent."}


@router.post("/reset-password")
def reset_password(payload: ResetPasswordRequest, db: Session = Depends(get_db)):
    reset = db.query(PasswordResetToken).filter(PasswordResetToken.token == payload.token).first()
    if not reset or reset.used or reset.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="Invalid or expired reset token.")
    user = db.get(User, reset.user_id)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid reset token.")
    user.hashed_password = hash_password(payload.new_password)
    reset.used = True
    db.commit()
    return {"message": "Password has been reset successfully."}

@router.post("/google", response_model=TokenResponse)
def google_login(payload: dict, db: Session = Depends(get_db)):
    google_token = payload.get("credential")
    if not google_token:
        raise HTTPException(status_code=400, detail="Google credential is required.")

    profile = _google_profile(google_token)
    email = profile["email"]
    if email in settings.admin_google_emails_list:
        raise HTTPException(status_code=403, detail="Use the admin sign-in page for this account.")

    user = db.query(User).filter(User.email.ilike(email)).first()
    if user is None:
        user = User(
            name=profile.get("name") or email,
            email=email,
            avatar=profile.get("picture"),
            hashed_password=hash_password(secrets.token_urlsafe(32)),
            onboarded=False,
            is_email_verified=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        # Email errors must not prevent the new client from signing in.
        from app.core.welcome_email import send_client_welcome_email
        send_client_welcome_email(user.name, user.email)

    return _issue_tokens(user.id)


@router.post("/admin/google", response_model=TokenResponse)
def admin_google_login(payload: dict, db: Session = Depends(get_db)):
    google_token = payload.get("credential")
    if not google_token:
        raise HTTPException(status_code=400, detail="Google credential is required.")

    profile = _google_profile(google_token)
    email = profile["email"]
    if email not in settings.admin_google_emails_list:
        raise HTTPException(status_code=403, detail="This Google account is not authorized for admin access.")

    admin = db.query(Admin).filter(Admin.username.ilike(email)).first()
    if not admin:
        admin = Admin(
            username=email,
            name=profile.get("name") or email,
            hashed_password=hash_password(secrets.token_urlsafe(32)),
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
    if admin.status != "Active":
        raise HTTPException(status_code=403, detail="This admin account is inactive.")
    return _issue_admin_tokens(admin.id)


@router.get("/admin/me")
def read_admin_me(current_admin: Admin = Depends(get_current_admin)):
    return {
        "id": current_admin.id,
        "username": current_admin.username,
        "name": current_admin.name,
        "status": current_admin.status,
    }

@router.post("/admin/login", response_model=TokenResponse)
def admin_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    admin = (
        db.query(Admin)
        .filter(Admin.username == form_data.username)
        .first()
    )

    if not admin or not verify_password(
        form_data.password,
        admin.hashed_password,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin username or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return TokenResponse(
        access_token=create_admin_access_token(admin.id),
        refresh_token=create_admin_refresh_token(admin.id),
    )