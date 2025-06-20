FROM node:16-alpine AS builder
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@projectivate/frontend --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:16-alpine AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/backend/prisma ./prisma
RUN yarn install --frozen-lockfile
RUN yarn prisma generate


FROM node:16-alpine AS sourcer
RUN apk update
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
RUN yarn turbo run build --scope=@projectivate/frontend --include-dependencies --no-deps

FROM node:16-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
WORKDIR /app/apps/frontend/
CMD [ "npm", "start" ]
