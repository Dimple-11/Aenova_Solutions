from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user, get_portfolio_editor
from app.models import PortfolioItem, User
from app.schemas import PortfolioItemCreate, PortfolioItemOut, PortfolioItemUpdate

router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])


@router.get("", response_model=list[PortfolioItemOut])
def list_published_portfolio(db: Session = Depends(get_db)):
    return (
        db.query(PortfolioItem)
        .filter(PortfolioItem.published.is_(True))
        .order_by(PortfolioItem.sort_order, PortfolioItem.name)
        .all()
    )


@router.get("/manage", response_model=list[PortfolioItemOut])
def list_portfolio_for_management(
    db: Session = Depends(get_db),
    _: User = Depends(get_portfolio_editor),
):
    return db.query(PortfolioItem).order_by(PortfolioItem.sort_order, PortfolioItem.name).all()


@router.post("", response_model=PortfolioItemOut, status_code=status.HTTP_201_CREATED)
def create_portfolio_item(
    payload: PortfolioItemCreate,
    db: Session = Depends(get_db),
    _: User = Depends(get_portfolio_editor),
):
    item = PortfolioItem(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{item_id}", response_model=PortfolioItemOut)
def update_portfolio_item(
    item_id: str,
    payload: PortfolioItemUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(get_portfolio_editor),
):
    item = db.get(PortfolioItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Portfolio item not found.")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio_item(
    item_id: str,
    db: Session = Depends(get_db),
    _: User = Depends(get_portfolio_editor),
):
    item = db.get(PortfolioItem, item_id)
    if item is None:
        raise HTTPException(status_code=404, detail="Portfolio item not found.")
    db.delete(item)
    db.commit()