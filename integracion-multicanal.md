# Diseño de integración multicanal para panadería

Este documento propone un diseño **MVP** de middleware en Node.js/Next.js para integrar pedidos de:

- Uber Eats
- PedidosYa (Delivery Hero)
- Rappi
- Mercado Libre

## 1) Objetivo

Unificar recepción de pedidos, validación de seguridad, normalización de datos y distribución al back-office interno, desacoplando cada plataforma mediante adaptadores.

---

## 2) Principios de diseño

1. **Respuesta rápida a webhooks**: responder `HTTP 200` de inmediato para evitar reintentos y procesar en segundo plano.
2. **Idempotencia**: deduplicar por identificador de evento/plataforma.
3. **Seguridad por proveedor**: validar firma o credenciales antes de procesar.
4. **Modelo canónico**: mapear todos los pedidos a una estructura unificada.
5. **Trazabilidad**: guardar `raw` para auditoría/depuración.
6. **Extensibilidad**: permitir nuevos marketplaces sin romper el dominio interno.

---

## 3) Flujo de alto nivel

```text
Webhook Provider
   -> API Gateway (verifica firma, dedup inicial, ACK 200)
   -> Cola/Event Bus (opcional, recomendado)
   -> Adapter de plataforma
   -> Normalizador + Reglas de negocio
   -> Base de datos
   -> Back-office + métricas + alertas
```

---

## 4) Endpoints sugeridos del middleware

```http
POST /webhook/uber
POST /webhook/pedidosya
POST /webhook/rappi
POST /webhook/mercadolibre
```

Y endpoints internos de simulación:

```http
GET  /mock/uber/orders/:id
GET  /mock/uber/canceled-orders
GET  /mock/mercadolibre/orders/:id
POST /mock/pedidosya/generate
POST /mock/send/:platform
```

---

## 5) Modelo de pedido unificado

```json
{
  "id": "uuid",
  "source": "uber|pedidosya|rappi|mercadolibre",
  "externalId": "string",
  "orderCode": "string",
  "customer": {
    "name": "string",
    "phone": "string",
    "address": "string"
  },
  "items": [
    {
      "sku": "string",
      "name": "string",
      "quantity": 1,
      "price": 0
    }
  ],
  "total": 0,
  "status": "NEW|ACCEPTED|READY|DISPATCHED|DELIVERED|CANCELLED",
  "createdAt": "ISO8601",
  "updatedAt": "ISO8601",
  "raw": {}
}
```

### Mapeo de estados recomendado

| Plataforma      | Estado externo                              | Estado interno |
|----------------|----------------------------------------------|----------------|
| Uber           | `orders.notification`                         | `NEW`          |
| Uber           | `orders.release`                              | `ACCEPTED`/`READY` (según lógica interna) |
| PedidosYa      | `RECEIVED`                                    | `NEW`          |
| PedidosYa      | `READY_FOR_PICKUP`                            | `READY`        |
| PedidosYa      | `DISPATCHED`                                  | `DISPATCHED`   |
| PedidosYa      | `DELIVERED`                                   | `DELIVERED`    |
| PedidosYa      | `CANCELLED`                                   | `CANCELLED`    |
| Rappi          | `NEW_ORDER` / `CREATED`                       | `NEW`          |
| Rappi          | `ready_for_pick_up` / `READY_FOR_PICKUP`      | `READY`        |
| Rappi          | `close_order`                                 | `DELIVERED`    |
| Rappi          | eventos de cancelación (`cancel_by_*`, etc.)  | `CANCELLED`    |
| Mercado Libre  | `orders_v2` + consulta de recurso             | según estado real de la orden |

---

## 6) Seguridad por plataforma

- **Uber Eats**: validar `X-Uber-Signature` con HMAC SHA-256 y secreto de app.
- **Rappi**: validar `Rappi-Signature` con formato `t=<timestamp>,sign=<hex>` usando `timestamp.payload`.
- **PedidosYa**: validar Basic Auth (o secreto definido en portal).
- **Mercado Libre**: validar firma de notificación según configuración de la app.

### Recomendaciones transversales

- Solo HTTPS en producción.
- Rechazar requests sin firma/credenciales válidas.
- Validar tolerancia temporal (`timestamp`) para evitar replay attacks.
- Rotar secretos periódicamente y guardarlos en variables de entorno.

---

## 7) Adaptadores (contrato interno)

Definir una interfaz común por adaptador:

```ts
interface PlatformAdapter {
  verify(request: Request): Promise<boolean>;
  parseEvent(request: Request): Promise<PlatformEvent>;
  toUnifiedOrder(event: PlatformEvent): Promise<UnifiedOrder | null>;
}
```

### Uber Adapter

- Recibe `orders.notification` y `orders.release`.
- Obtiene detalle de orden vía API (`resource_href` / endpoint de orden).
- Maneja cancelaciones por polling periódico de canceladas.

### PedidosYa Adapter

- Procesa payload completo del webhook.
- Mapea estado y datos de cliente/items directamente.

### Rappi Adapter

- Procesa `NEW_ORDER`, `ORDER_EVENT_CANCEL`, `ORDER_OTHER_EVENT`.
- Mantiene traducción de subeventos logísticos a estado interno.

### Mercado Libre Adapter

- Procesa notificación mínima (`topic`, `resource`).
- Si `topic=orders_v2`, consulta detalles por API OAuth y normaliza.

---

## 8) Idempotencia y consistencia

Guardar y verificar llaves de deduplicación, por ejemplo:

- Uber: `event_id`
- PedidosYa: `order_id + status + updated_at` (o equivalente)
- Rappi: `event + order_id + timestamp`
- Mercado Libre: `topic + resource + sent`

Si un evento ya fue procesado: registrar como duplicado y responder `200`.

---

## 9) Simulación local (sin credenciales reales)

### Estrategia

1. Crear emisor de eventos aleatorios cada 10–60s.
2. Incluir transición de estados y cancelaciones.
3. Permitir disparo manual de eventos para QA.
4. Simular firmas válidas/invalidas para pruebas de seguridad.

### Casos mínimos de prueba

- Pedido nuevo por cada plataforma.
- Cambio de estado a `READY` y `DISPATCHED`.
- Cancelación (incluyendo causa).
- Reintento de webhook (evento duplicado).
- Firma inválida -> `401/403`.
- Timeout interno con ACK correcto al proveedor.

---

## 10) Observabilidad

Métricas recomendadas:

- Webhooks recibidos por plataforma/evento.
- % de firmas válidas vs inválidas.
- Tiempo de procesamiento por etapa.
- Tasa de duplicados.
- Pedidos por estado y por fuente.
- Errores de consulta a APIs externas.

Alertas recomendadas:

- Pico de errores de firma.
- Caída de eventos esperados (posible desconexión).
- Demora en aceptación de pedidos sensibles a SLA (ej. Uber).

---

## 11) Roadmap sugerido (MVP -> v2)

### MVP

- Webhooks + validación de seguridad.
- Modelo unificado + persistencia.
- Back-office básico de lectura.
- Simulador local de eventos.

### v1.1

- Cola de mensajes (Redis Streams/RabbitMQ).
- Retries internos con DLQ.
- Dashboard de métricas.

### v2

- Acciones bidireccionales completas (aceptar/rechazar/listo por plataforma).
- Motor de reglas de negocio configurable.
- Multi-tienda / multi-sucursal.

---

## 12) Variables de entorno sugeridas

```bash
NODE_ENV=production
PORT=3000

UBER_WEBHOOK_SECRET=...
UBER_API_BASE_URL=...
UBER_CLIENT_ID=...
UBER_CLIENT_SECRET=...

PEDIDOSYA_BASIC_USER=partner
PEDIDOSYA_BASIC_PASS=...

RAPPI_WEBHOOK_SECRET=...
RAPPI_API_BASE_URL=...

MELI_WEBHOOK_SECRET=...
MELI_API_BASE_URL=https://api.mercadolibre.com
MELI_CLIENT_ID=...
MELI_CLIENT_SECRET=...
MELI_REFRESH_TOKEN=...

DATABASE_URL=...
REDIS_URL=...
```

---

## 13) Criterios de aceptación técnicos

- El sistema responde `200` en < 1s para webhooks válidos.
- Toda notificación queda auditada con `raw` y correlación de evento.
- Duplicados no generan efectos secundarios.
- Estados externos se reflejan correctamente en el estado interno.
- Fallas de API externa no bloquean recepción (se reintenta internamente).

---

## 14) Nota final

Esta propuesta prioriza robustez operativa y simplicidad de implementación para un MVP, manteniendo capacidad de escalar a flujos bidireccionales completos y mayor volumen de pedidos.
