#!/bin/sh
set -e

echo "Running migrations..."
i=0
until npx prisma migrate deploy; do
  i=$((i + 1))
  if [ "$i" -gt 30 ]; then
    echo "migrate deploy failed after retries"
    exit 1
  fi
  echo "Database not ready, retry $i..."
  sleep 2
done

echo "Seeding database..."
npx prisma db seed || echo "Seed skipped or already applied"

echo "Starting Norris Construction on :3000..."
exec node server.js
