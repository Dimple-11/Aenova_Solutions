from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import ProjectFile, User
from app.schemas import FileCreate, FileOut

router = APIRouter(prefix="/api/files", tags=["files"])


def _get_owned_file(file_id: str, current_user: User, db: Session) -> ProjectFile:
    file = (
        db.query(ProjectFile)
        .filter(ProjectFile.id == file_id, ProjectFile.owner_id == current_user.id)
        .first()
    )
    if not file:
        raise HTTPException(status_code=404, detail="File not found.")
    return file


@router.get("", response_model=list[FileOut])
def list_files(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(ProjectFile).filter(ProjectFile.owner_id == current_user.id).all()


@router.post("", response_model=FileOut, status_code=201)
def create_file(
    payload: FileCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    file = ProjectFile(
        owner_id=current_user.id,
        project_id=payload.project_id,
        name=payload.name,
        size=payload.size,
        type=payload.type,
        category=payload.category,
        uploaded_by=payload.uploaded_by or current_user.name,
    )
    db.add(file)
    db.commit()
    db.refresh(file)
    return file


@router.delete("/{file_id}", status_code=204)
def delete_file(file_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    file = _get_owned_file(file_id, current_user, db)
    db.delete(file)
    db.commit()
