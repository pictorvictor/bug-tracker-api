# BUG TRACKER API

Developed with Express 🚀🚀🚀

## Prerequisites

- Node.js v18
- Yarn v1
- Docker

## Usage

- Install - `yarn install`
- Build - `yarn build`
- Run Development - `yarn dev`
- Run Production - `yarn start`

## Migrations

- Generate migrations + prisma client `yarn prisma migrate dev --name NAME`
- Generate prisma client `yarn prisma generate`
- Run pending migrations `yarn prisma migrate deploy`
- Show migration status `yarn prisma migrate status`
- Open Studio `yarn prisma studio`

## First Time

- Install node modules - `yarn install`
- Create .env file from .env.example - `cp .env.example .env`
- Adjust .env file for database: password and database name
- Run database container - `docker-compose up -d`
- Apply migrations - `yarn prisma migrate deploy`