#!/usr/bin/env bash
# Serve the standalone output the Docker image uses. next start is not supported
# with output: "standalone".
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

[[ -f .next/standalone/server.js ]] || {
  echo "missing .next/standalone/server.js — run npm run build first" >&2
  exit 1
}

cp -a public .next/standalone/public
mkdir -p .next/standalone/.next
cp -a .next/static .next/standalone/.next/static

cd .next/standalone
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-127.0.0.1}"
exec node server.js
