from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import BillingPlan, Invoice, Subscription, User
from app.schemas import BillingPlanOut, InvoiceOut, UpgradePlanRequest

router = APIRouter(prefix="/api/billing", tags=["billing"])


@router.get("/plans", response_model=list[BillingPlanOut])
def list_plans(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    plans = db.query(BillingPlan).all()
    subscription = db.query(Subscription).filter(Subscription.owner_id == current_user.id).first()
    result = []
    for plan in plans:
        out = BillingPlanOut.model_validate(plan)
        out.isCurrent = bool(subscription and subscription.plan_id == plan.id)
        result.append(out)
    return result


@router.get("/subscription", response_model=BillingPlanOut | None)
def get_current_subscription(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    subscription = db.query(Subscription).filter(Subscription.owner_id == current_user.id).first()
    if not subscription:
        return None
    plan = db.get(BillingPlan, subscription.plan_id)
    if not plan:
        return None
    out = BillingPlanOut.model_validate(plan)
    out.isCurrent = True
    return out


@router.post("/upgrade", response_model=BillingPlanOut)
def upgrade_plan(
    payload: UpgradePlanRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    plan = db.get(BillingPlan, payload.plan_id)
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found.")

    subscription = db.query(Subscription).filter(Subscription.owner_id == current_user.id).first()
    if subscription:
        subscription.plan_id = plan.id
    else:
        subscription = Subscription(owner_id=current_user.id, plan_id=plan.id)
        db.add(subscription)
    db.commit()
    # In production, this is where you would call Stripe/Paddle to create/update the subscription.
    out = BillingPlanOut.model_validate(plan)
    out.isCurrent = True
    return out


@router.get("/invoices", response_model=list[InvoiceOut])
def list_invoices(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(Invoice).filter(Invoice.owner_id == current_user.id).all()
