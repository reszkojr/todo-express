#!/bin/bash

apt-get update && apt-get install -y postgresql-client

until pg_isready -h postgres -p 5432 -U postgres; do
    echo "Waiting for PostgreSQL to start..."
    sleep 2
done
echo "PostgreSQL started"

pnpm run db:generate
pnpm run db:migrate

pnpm run dev
