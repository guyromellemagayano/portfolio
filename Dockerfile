# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim AS base

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV npm_config_store_dir=/pnpm/store
ENV PATH="${PNPM_HOME}:${PATH}"

WORKDIR /workspace

RUN corepack enable && corepack prepare pnpm@10.30.0 --activate

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/e2e/package.json apps/e2e/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/components/package.json packages/components/package.json
COPY packages/config-commit/package.json packages/config-commit/package.json
COPY packages/config-commit/src/bin packages/config-commit/src/bin
COPY packages/config-eslint/package.json packages/config-eslint/package.json
COPY packages/config-typescript/package.json packages/config-typescript/package.json
COPY packages/hooks/package.json packages/hooks/package.json
COPY packages/logger/package.json packages/logger/package.json
COPY packages/ui/package.json packages/ui/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/vitest-presets/package.json packages/vitest-presets/package.json

RUN pnpm install --frozen-lockfile

FROM base AS dev

ENV NODE_ENV=development

COPY --from=deps /workspace /workspace
COPY . .

EXPOSE 4321

CMD ["pnpm", "--filter", "web", "dev"]
