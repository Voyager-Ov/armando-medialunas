# Armando Medialunas

Proyecto Next.js + carga SQL del menú vigente del dueño.

## Deploy rápido (menú nuevo incluido)

### 1) Variables necesarias

```bash
export DATABASE_URL='postgresql://USER:PASSWORD@HOST:5432/DBNAME'
```

### 2) Cargar menú nuevo (reemplaza catálogo anterior)

```bash
./db/deploy_menu.sh
```

Este script ejecuta:

1. `db/menu_rebuild.sql` (crea/actualiza estructura y recarga datos del menú actual).
2. `db/menu_smoke_checks.sql` (validación mínima post-carga).

### 3) Deploy app Next.js

```bash
npm ci
npm run build
npm run start
```

---

## Validaciones esperadas post-carga

- 9 categorías.
- 56 productos.
- Variantes de precio cargadas para productos, pizzas y empanadas.
- Insumos con costo estimado en ARS.

Si alguna validación falla, el script corta con error y no continúa.
