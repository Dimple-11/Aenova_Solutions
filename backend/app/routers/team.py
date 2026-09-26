from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import TeamMember, User
from app.schemas import TeamMemberInvite, TeamMemberOut, TeamMemberRoleUpdate

router = APIRouter(prefix="/api/team", tags=["team"])


def _get_owned_member(member_id: str, current_user: User, db: Session) -> TeamMember:
    member = (
        db.query(TeamMember)
        .filter(TeamMember.id == member_id, TeamMember.owner_id == current_user.id)
        .first()
    )
    if not member:
        raise HTTPException(status_code=404, detail="Team member not found.")
    return member


@router.get("", response_model=list[TeamMemberOut])
def list_team_members(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(TeamMember).filter(TeamMember.owner_id == current_user.id).all()


@router.post("", response_model=TeamMemberOut, status_code=201)
def invite_team_member(
    payload: TeamMemberInvite,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    member = TeamMember(
        owner_id=current_user.id,
        name=payload.name,
        email=payload.email,
        role=payload.role,
        department=payload.department,
        status="Pending",
    )
    db.add(member)
    db.commit()
    db.refresh(member)
    # In production, send an invitation email with a signup link here.
    return member


@router.patch("/{member_id}/role", response_model=TeamMemberOut)
def update_team_member_role(
    member_id: str,
    payload: TeamMemberRoleUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    member = _get_owned_member(member_id, current_user, db)
    if member.role == "Owner":
        raise HTTPException(status_code=400, detail="Cannot change the role of the workspace owner.")
    member.role = payload.role
    db.commit()
    db.refresh(member)
    return member


@router.delete("/{member_id}", status_code=204)
def remove_team_member(member_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    member = _get_owned_member(member_id, current_user, db)
    if member.role == "Owner":
        raise HTTPException(status_code=400, detail="Cannot remove the workspace owner.")
    db.delete(member)
    db.commit()
