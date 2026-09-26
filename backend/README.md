# Aevona Solutions — Backend API

A FastAPI backend built to power the Aevona Solutions React/Vite frontend (`frontend/`). It replaces the mock, localStorage-backed `AuthContext` and `DashboardContext` with a real, persisted, authenticated API.

## Tech Stack

- **FastAPI** — REST API framework
- **SQLAlchemy 2.0** — ORM (SQLite by default, swap `DATABASE_URL` for Postgres/MySQL in production)
- **Pydantic v2** — request/response validation, schemas mirror `frontend/src/types/index.ts`
- **python-jose** — JWT access & refresh tokens
- **passlib[bcrypt]** — password hashing

## Project Structure

```
backend/
  app/
    core/
      config.py      # settings via .env
      security.py     # password hashing + JWT
    routers/
      auth.py         # signup, login, refresh, forgot/reset password, verify email, /me
      users.py        # profile get/update
      projects.py     # CRUD for Projects
      tasks.py        # CRUD + toggle-complete for Tasks
      files.py        # CRUD for File metadata
      service_requests.py
      notifications.py
      messages.py     # Conversations + Messages
      team.py         # Team members invite/role/remove
      billing.py       # Plans, current subscription, upgrade, invoices
      support.py       # Support tickets + FAQs
    database.py        # SQLAlchemy session/engine
    deps.py             # get_current_user dependency (JWT bearer)
    models.py           # SQLAlchemy models
    schemas.py           # Pydantic schemas
    seed.py               # seeds default billing plans + FAQs
    main.py               # FastAPI app, CORS, router registration
  requirements.txt
  .env.example
```

## Setup

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edit `.env` and set a strong `SECRET_KEY` (e.g. `python -c "import secrets; print(secrets.token_hex(32))"`).

## Run

```powershell
uvicorn app.main:app --reload --port 8000
```

- API base URL: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- SQLite database file `aevona.db` is created automatically on first run.

## Authentication Flow

1. `POST /api/auth/signup` — `{ full_name, email, company, password }` → returns `{ access_token, refresh_token }`
2. `POST /api/auth/login` — form-encoded `username` (email) + `password` (OAuth2 password flow) → tokens
3. Send `Authorization: Bearer <access_token>` on subsequent requests.
4. `POST /api/auth/refresh?refresh_token=...` — exchange refresh token for a new pair.
5. `GET /api/auth/me` — current user profile.
6. `POST /api/auth/forgot-password` / `POST /api/auth/reset-password` — password reset flow (reset tokens stored server-side; wire up an email provider to deliver the token in production).

Every dashboard resource (projects, tasks, files, notifications, conversations, team, tickets, invoices) is scoped to the authenticated user via `owner_id`, so each account has its own isolated workspace — mirroring the single-tenant dashboard shown in the frontend mock data.

## Connecting the Frontend

Replace the mock logic in `frontend/src/context/AuthContext.tsx` and `DashboardContext.tsx` with `fetch`/`axios` calls to these endpoints, storing the JWT (e.g. in memory + httpOnly cookie or `localStorage` for a quick prototype) and attaching it as a Bearer token. Set `VITE_API_URL=http://localhost:8000` in the frontend `.env` and point API calls there. Update `CORS_ORIGINS` in the backend `.env` to match the Vite dev server URL.

## Notes / Next Steps

- File uploads currently store metadata only (matching the current frontend mock). To support real uploads, add an `UploadFile` endpoint that streams to disk or S3-compatible storage and stores the resulting URL.
- Payment upgrade endpoint (`POST /api/billing/upgrade`) is a placeholder — integrate Stripe/Paddle webhooks for real billing.
- Add rate limiting and email verification delivery (SendGrid/SES) before going to production.
