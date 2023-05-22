# ------------------------------------
# STAGE 01 - deps
# ------------------------------------
# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ------------------------------------
# STAGE 02 - builder
# ------------------------------------
# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Args needed for code generation
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT $NEXT_PUBLIC_GRAPHQL_ENDPOINT

ARG NEXT_PUBLIC_WS_ENDPOINT
ENV NEXT_PUBLIC_WS_ENDPOINT $NEXT_PUBLIC_WS_ENDPOINT

ARG NEXT_PUBLIC_URL_AUTH
ENV NEXT_PUBLIC_URL_AUTH $NEXT_PUBLIC_URL_AUTH

RUN yarn generate

# Build code
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# ------------------------------------
# STAGE 03 - runner
# ------------------------------------
# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

# Arg to manage production state
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Arg to port for node
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]