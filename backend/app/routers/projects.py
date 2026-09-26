from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.deps import get_current_user
from app.models import Project, User
from app.schemas import ProjectCreate, ProjectOut, ProjectUpdate

router = APIRouter(prefix="/api/projects", tags=["projects"])


def _to_out(project: Project) -> ProjectOut:
    return ProjectOut.model_validate(
        {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "service_type": project.service_type,
            "status": project.status,
            "priority": project.priority,
            "progress": project.progress,
            "start_date": project.start_date,
            "deadline": project.deadline,
            "budget": project.budget,
            "team_members": project.team_members,
            "tasks_count": project.tasks_count,
        }
    )


@router.get("", response_model=list[ProjectOut])
def list_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.owner_id == current_user.id).all()
    return [_to_out(p) for p in projects]


@router.post("", response_model=ProjectOut, status_code=201)
def create_project(
    payload: ProjectCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = Project(
        owner_id=current_user.id,
        name=payload.name,
        description=payload.description,
        service_type=payload.service_type,
        status=payload.status,
        priority=payload.priority,
        progress=0,
        start_date=payload.start_date,
        deadline=payload.deadline,
        budget=payload.budget,
        team_members=[
            {"name": current_user.name, "avatar": current_user.avatar or "", "role": "Owner"}
        ],
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    return _to_out(project)


def _get_owned_project(project_id: str, current_user: User, db: Session) -> Project:
    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.owner_id == current_user.id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Project not found.")
    return project


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return _to_out(_get_owned_project(project_id, current_user, db))


@router.patch("/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: str,
    payload: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = _get_owned_project(project_id, current_user, db)
    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key == "team_members" and value is not None:
            value = [tm if isinstance(tm, dict) else tm.model_dump() for tm in value]
        setattr(project, key, value)
    db.commit()
    db.refresh(project)
    return _to_out(project)


@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = _get_owned_project(project_id, current_user, db)
    db.delete(project)
    db.commit()
