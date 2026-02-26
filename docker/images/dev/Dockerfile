FROM node:22-bookworm-slim

ENV PNPM_HOME=/pnpm
ENV PNPM_STORE_DIR=/pnpm/store
ENV PATH=${PNPM_HOME}:${PATH}

WORKDIR /workspace

RUN corepack enable

