# Install dependencies only when needed
FROM node:20-alpine as deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN corepack enable
WORKDIR /usr/src/app
COPY dist/apps/portfolio/package.json dist/apps/portfolio/yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Production image, copy all the files and run next
FROM node:20-alpine as runner
RUN apk add --no-cache dumb-init

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

# Copy installed dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/package.json ./package.json
COPY --from=deps /usr/src/app/yarn.lock ./yarn.lock

# Copy built application files
COPY dist/apps/portfolio/public ./public
COPY dist/apps/portfolio/.next ./.next

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

# Run the application
CMD ["dumb-init", "node_modules/.bin/next", "start"]
