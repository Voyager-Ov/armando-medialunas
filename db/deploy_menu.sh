#!/usr/bin/env bash
set -euo pipefail

if ! command -v psql >/dev/null 2>&1; then
  echo "Error: psql no está instalado en el entorno." >&2
  exit 1
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "Error: falta DATABASE_URL." >&2
  exit 1
fi

echo "[1/2] Aplicando db/menu_rebuild.sql..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/menu_rebuild.sql

echo "[2/2] Ejecutando db/menu_smoke_checks.sql..."
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f db/menu_smoke_checks.sql

echo "OK: menú nuevo cargado y validado."
