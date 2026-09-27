from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database import Base, SessionLocal, engine
from app.routers import (
    auth,
    billing,
    files,
    messages,
    notifications,
    portfolio,
    projects,
    service_requests,
    support,
    tasks,
    team,
    users,
)
from app.seed import seed_defaults

# Import models so that they are registered on Base.metadata before create_all runs.
from app import models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_defaults(db)
    finally:
        db.close()
    yield


app = FastAPI(title="Aevona Solutions API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(projects.router)
app.include_router(portfolio.router)
app.include_router(tasks.router)
app.include_router(files.router)
app.include_router(service_requests.router)
app.include_router(notifications.router)
app.include_router(messages.router)
app.include_router(team.router)
app.include_router(billing.router)
app.include_router(support.router)


@app.get("/", tags=["health"])
def health_check():
    return {"status": "ok", "service": "Aevona Solutions API"}
