from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import ServiceRequest, User
from app.schemas import ServiceRequestCreate, ServiceRequestOut

router = APIRouter(prefix="/api/service-requests", tags=["service-requests"])


@router.get("", response_model=list[ServiceRequestOut])
def list_service_requests(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(ServiceRequest).filter(ServiceRequest.owner_id == current_user.id).all()


@router.post("", response_model=ServiceRequestOut, status_code=201)
def create_service_request(
    payload: ServiceRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    request = ServiceRequest(
        owner_id=current_user.id,
        service_id=payload.service_id,
        service_title=payload.service_title,
        category=payload.category,
        estimated_delivery="4-6 weeks",
        budget=payload.budget,
        notes=payload.notes,
    )
    db.add(request)
    db.commit()
    db.refresh(request)
    return request
