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

COPY --from=deps /workspace /workspace

RUN pnpm --filter api... build
RUN pnpm --filter api --prod deploy /prod/api

FROM node:22-bookworm-slim AS runner

ENV NODE_ENV=production
ENV PORT=5001

WORKDIR /app

COPY --from=builder /prod/api ./

USER node

EXPOSE 5001

CMD ["node", "dist/index.js"]
