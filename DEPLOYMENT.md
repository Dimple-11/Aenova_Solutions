# Docker Deployment

## Start

1. Copy `.env.example` to `.env` in the repository root.
2. Replace `SECRET_KEY` with a unique random value. Update `FRONTEND_URL` to the public site origin and set Google OAuth and SMTP values if those features are used.
3. Start both services:

   ```sh
   docker compose up --build -d
   ```

The web app is available at `http://localhost` (or the configured `WEB_PORT`). FastAPI's OpenAPI docs are available at `/docs`. Nginx serves the frontend and proxies API requests to the backend, so the backend does not need a public port.

SQLite data is stored in the named `api_data` volume and survives container rebuilds and restarts. `docker compose down` preserves it; `docker compose down -v` deletes it.

## Production Notes

Use a strong `SECRET_KEY` and configure a TLS-terminating reverse proxy or load balancer in front of the web container. Set `FRONTEND_URL` to the public origin for email links, and configure `CORS_ORIGINS` for any additional origins that call the API directly. Keep `VITE_API_URL=__SAME_ORIGIN__` to use the included same-origin Nginx proxy.

Useful commands:

```sh
docker compose logs -f
docker compose ps
docker compose down
```

## Deploy to Render

Render doesn't run `docker-compose`; each container becomes its own web service. Use the included [`render.yaml`](render.yaml) blueprint:

1. Push this repo to GitHub or GitLab.
2. In the [Render Dashboard](https://dashboard.render.com), choose **New > Blueprint** and select the repo. Render reads `render.yaml` automatically.
3. Render provisions:
   - `aevona-db` — a managed Postgres database (replaces SQLite so data survives redeploys without needing a paid disk).
   - `aevona-backend` — FastAPI, built from `backend/Dockerfile`.
   - `aevona-frontend` — Nginx serving the built SPA, built from `frontend/Dockerfile`.
4. You'll be prompted for `GOOGLE_CLIENT_ID`, `ADMIN_GOOGLE_EMAILS`, and SMTP credentials (marked `sync: false` in the blueprint). Leave blank to skip those features.
5. After the first deploy completes, manually redeploy both services once. `CORS_ORIGINS`, `FRONTEND_URL`, and `VITE_API_URL` reference each other's public URLs and only populate after both services exist.

Both Dockerfiles already bind to Render's dynamic `$PORT` (falling back to `8000`/`80` for local Docker Compose use), so no further changes are needed.

