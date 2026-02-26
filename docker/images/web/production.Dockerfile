FROM node:22-bookworm-slim AS base

ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV PATH=${PNPM_HOME}:${PATH}

WORKDIR /workspace

RUN corepack enable

FROM base AS deps

COPY . .

RUN pnpm install --frozen-lockfile

FROM base AS builder

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_WEB_OUTPUT_STANDALONE=1

COPY --from=deps /workspace /workspace

RUN pnpm --filter web build

FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /workspace/apps/web/.next/standalone ./
COPY --from=builder /workspace/apps/web/.next/static ./.next/static
COPY --from=builder /workspace/apps/web/public ./public

RUN mkdir -p /app/.next/cache && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["node", "server.js"]
