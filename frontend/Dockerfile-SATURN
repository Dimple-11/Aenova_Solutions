FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ARG VITE_API_URL=__SAME_ORIGIN__
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

FROM nginx:alpine

# nginx's built-in entrypoint runs envsubst on *.template files, so $PORT (set by Render) is applied at startup.
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT=80
EXPOSE 80
