import random

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import FAQ, SupportTicket, User
from app.schemas import FAQOut, SupportTicketCreate, SupportTicketOut

router = APIRouter(prefix="/api/support", tags=["support"])


@router.get("/tickets", response_model=list[SupportTicketOut])
def list_support_tickets(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(SupportTicket).filter(SupportTicket.owner_id == current_user.id).all()


@router.post("/tickets", response_model=SupportTicketOut, status_code=201)
def create_support_ticket(
    payload: SupportTicketCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    ticket_number = f"TCK-{random.randint(10000, 99999)}"
    ticket = SupportTicket(
        owner_id=current_user.id,
        ticket_number=ticket_number,
        subject=payload.subject,
        category=payload.category,
        priority=payload.priority,
        description=payload.description,
        status="Open",
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("/faqs", response_model=list[FAQOut])
def list_faqs(db: Session = Depends(get_db)):
    return db.query(FAQ).all()
