# ── Stage 1: install dependencies and compile ───────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

COPY services/ws-server/package.json ./
RUN npm install

COPY services/ws-server/tsconfig.json ./
COPY services/ws-server/src/ ./src/
RUN npx tsc

# ── Stage 2: production runner ───────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY services/ws-server/package.json ./
RUN npm install --omit=dev

COPY --from=deps /app/dist ./dist

EXPOSE 3002
CMD ["node", "dist/index.js"]
