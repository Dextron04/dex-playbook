# ── Stage 1: install dependencies ──────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /repo

# Copy manifests only for better layer caching
COPY package.json package-lock.json ./
COPY packages/ui/package.json      ./packages/ui/
COPY packages/theme/package.json   ./packages/theme/
COPY apps/landing/package.json     ./apps/landing/
COPY apps/app/package.json         ./apps/app/

RUN npm ci

# ── Stage 2: build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /repo

COPY --from=deps /repo/node_modules ./node_modules
COPY packages/                     ./packages/
COPY apps/app/                     ./apps/app/

WORKDIR /repo/apps/app
RUN npx next build

# ── Stage 3: production runner ──────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /repo

ENV NODE_ENV=production
ENV PORT=3001
ENV HOSTNAME=0.0.0.0

# standalone output includes its own node_modules copy
COPY --from=builder /repo/apps/app/.next/standalone ./
COPY --from=builder /repo/apps/app/.next/static     ./apps/app/.next/static
COPY --from=builder /repo/apps/app/public           ./apps/app/public

EXPOSE 3001
CMD ["node", "apps/app/server.js"]
