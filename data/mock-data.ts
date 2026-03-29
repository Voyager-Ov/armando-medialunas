import { Channel, OpsAlert, Order, OrderStatus, Product, StockItem, WebhookEvent } from "@/types/domain";

export const channels: { id: Channel; label: string }[] = [
  { id: "MOSTRADOR", label: "Mostrador" },
  { id: "PEDIDOSYA", label: "PedidosYa" },
  { id: "UBER_EATS", label: "Uber Eats" },
  { id: "RAPPI", label: "Rappi" },
  { id: "MERCADO_LIBRE", label: "Mercado Libre" }
];

export const products: Product[] = [
  { id: "P1", name: "Medialuna de manteca", category: "Facturas", price: 900, available: true, featured: true, stockSensitive: false },
  { id: "P2", name: "Café con leche", category: "Cafetería", price: 2300, available: true, featured: true, stockSensitive: true },
  { id: "P3", name: "Tostado JyQ", category: "Sándwiches", price: 4900, available: true, featured: false, stockSensitive: true },
  { id: "P4", name: "Combo Desayuno Oficina", category: "Combos", price: 7800, available: true, featured: true, promo: "-10% desde 8 a 10 hs", stockSensitive: true },
  { id: "P5", name: "Criollos x 1/4", category: "Facturas", price: 3200, available: true, featured: false, stockSensitive: false },
  { id: "P6", name: "Facturas surtidas x12", category: "Facturas", price: 11800, available: false, featured: false, stockSensitive: true }
];

export const stockItems: StockItem[] = [
  { id: "S1", name: "Harina 0000", unit: "kg", current: 42, min: 25, impact: "Sin impacto inmediato" },
  { id: "S2", name: "Manteca", unit: "kg", current: 9, min: 12, impact: "Afecta producción de medialunas en 2 horas" },
  { id: "S3", name: "Jamón cocido", unit: "kg", current: 3, min: 8, impact: "Afecta 3 pedidos de tostados" },
  { id: "S4", name: "Queso tybo", unit: "kg", current: 2, min: 7, impact: "Riesgo alto para combos desayuno" },
  { id: "S5", name: "Dulce de leche", unit: "kg", current: 4, min: 5, impact: "Impacta promo facturas rellenas" },
  { id: "S6", name: "Café en grano", unit: "kg", current: 7, min: 4, impact: "Controlado" }
];

export const orders: Order[] = [
  {
    id: "o1",
    code: "A-1042",
    channel: "PEDIDOSYA",
    customer: "Lucía Gómez",
    phone: "+54 11 4444-1288",
    address: "Lavalle 1122, CABA",
    pickup: false,
    createdAt: "2026-03-29T11:10:00Z",
    etaMinutes: 35,
    elapsedMinutes: 42,
    status: "EN_PREPARACION",
    priority: "ALTA",
    notes: "Sin cebolla en el tostado",
    paymentMethod: "Online",
    items: [
      { productId: "P3", name: "Tostado JyQ", quantity: 2, unitPrice: 4900, requires: ["S3", "S4"] },
      { productId: "P2", name: "Café con leche", quantity: 2, unitPrice: 2300, requires: ["S6"] }
    ]
  },
  {
    id: "o2",
    code: "M-777",
    channel: "MOSTRADOR",
    customer: "Consumidor final",
    phone: "-",
    pickup: true,
    createdAt: "2026-03-29T11:45:00Z",
    etaMinutes: 10,
    elapsedMinutes: 5,
    status: "CONFIRMADO",
    priority: "MEDIA",
    paymentMethod: "Efectivo",
    items: [{ productId: "P1", name: "Medialuna de manteca", quantity: 6, unitPrice: 900, requires: ["S2"] }]
  },
  {
    id: "o3",
    code: "U-883",
    channel: "UBER_EATS",
    customer: "Marcos Ruiz",
    phone: "+54 11 4888-4500",
    address: "Charcas 2800, Palermo",
    pickup: false,
    createdAt: "2026-03-29T11:38:00Z",
    etaMinutes: 28,
    elapsedMinutes: 28,
    status: "LISTO",
    priority: "ALTA",
    notes: "Llamar al llegar",
    paymentMethod: "Online",
    items: [{ productId: "P4", name: "Combo Desayuno Oficina", quantity: 1, unitPrice: 7800, requires: ["S3", "S4", "S6"] }]
  },
  {
    id: "o4",
    code: "R-1189",
    channel: "RAPPI",
    customer: "Nora Roldán",
    phone: "+54 11 4321-5670",
    address: "Av. Córdoba 1640",
    pickup: false,
    createdAt: "2026-03-29T10:55:00Z",
    etaMinutes: 30,
    elapsedMinutes: 52,
    status: "EN_PREPARACION",
    priority: "ALTA",
    paymentMethod: "Online",
    items: [{ productId: "P6", name: "Facturas surtidas x12", quantity: 1, unitPrice: 11800, requires: ["S2", "S5"] }]
  },
  {
    id: "o5",
    code: "ML-510",
    channel: "MERCADO_LIBRE",
    customer: "Agustina Benítez",
    phone: "+54 11 2992-7751",
    address: "Sarmiento 931",
    pickup: false,
    createdAt: "2026-03-29T09:40:00Z",
    etaMinutes: 40,
    elapsedMinutes: 83,
    status: "CANCELADO",
    priority: "MEDIA",
    notes: "Cliente canceló por demora",
    paymentMethod: "Transferencia",
    items: [{ productId: "P3", name: "Tostado JyQ", quantity: 1, unitPrice: 4900, requires: ["S3", "S4"] }]
  },
  {
    id: "o6",
    code: "A-1049",
    channel: "PEDIDOSYA",
    customer: "Estudio Baires",
    phone: "+54 11 6789-1000",
    address: "Paraguay 745",
    pickup: false,
    createdAt: "2026-03-29T11:50:00Z",
    etaMinutes: 25,
    elapsedMinutes: 12,
    status: "NUEVO",
    priority: "ALTA",
    paymentMethod: "Online",
    items: [
      { productId: "P4", name: "Combo Desayuno Oficina", quantity: 4, unitPrice: 7800, requires: ["S3", "S4", "S6"] },
      { productId: "P1", name: "Medialuna de manteca", quantity: 12, unitPrice: 900, requires: ["S2"] }
    ]
  },
  {
    id: "o7",
    code: "M-781",
    channel: "MOSTRADOR",
    customer: "Mesa 3",
    phone: "-",
    pickup: true,
    createdAt: "2026-03-29T11:56:00Z",
    etaMinutes: 8,
    elapsedMinutes: 2,
    status: "NUEVO",
    priority: "BAJA",
    paymentMethod: "Tarjeta",
    items: [{ productId: "P2", name: "Café con leche", quantity: 1, unitPrice: 2300, requires: ["S6"] }]
  }
];

export const webhookEvents: WebhookEvent[] = [
  { id: "w1", provider: "PEDIDOSYA", event: "RECEIVED", orderCode: "A-1049", signature: "VALIDA", receivedAt: "11:50:03" },
  { id: "w2", provider: "UBER_EATS", event: "orders.release", orderCode: "U-883", signature: "VALIDA", receivedAt: "11:39:00" },
  { id: "w3", provider: "RAPPI", event: "ORDER_EVENT_CANCEL", orderCode: "R-1189", signature: "VALIDA", receivedAt: "11:30:20" },
  { id: "w4", provider: "MERCADO_LIBRE", event: "orders_v2", orderCode: "ML-510", signature: "INVALIDA", receivedAt: "11:21:45" }
];

export const alerts: OpsAlert[] = [
  {
    id: "a1",
    title: "Demoras en Rappi y PedidosYa",
    severity: "CRITICA",
    detail: "Hay 2 pedidos con más de 15 minutos sobre ETA.",
    relatedOrderIds: ["o1", "o4"]
  },
  {
    id: "a2",
    title: "Stock crítico de queso y jamón",
    severity: "CRITICA",
    detail: "Afecta tostados y combos desayuno para 3 pedidos activos.",
    relatedOrderIds: ["o1", "o6", "o5"]
  },
  { id: "a3", title: "Canal Mercado Libre con cancelación", severity: "MEDIA", detail: "1 cancelación por demora en última hora." },
  { id: "a4", title: "Pico operativo de 11:30 a 12:30", severity: "INFO", detail: "Sugerido reforzar producción de cafetería." }
];

export const statusColumns: OrderStatus[] = ["NUEVO", "CONFIRMADO", "EN_PREPARACION", "LISTO", "ENTREGADO", "CANCELADO"];

export const getOrderAmount = (order: Order) => order.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

export const getKpiData = () => {
  const totalSales = orders.filter((o) => o.status !== "CANCELADO").reduce((acc, o) => acc + getOrderAmount(o), 0);
  const delivered = orders.filter((o) => o.status === "ENTREGADO").length;
  const avgTicket = orders.length ? totalSales / Math.max(1, orders.length - 1) : 0;
  return {
    activos: orders.filter((o) => !["ENTREGADO", "CANCELADO"].includes(o.status)).length,
    pendientes: orders.filter((o) => o.status === "NUEVO").length,
    preparacion: orders.filter((o) => o.status === "EN_PREPARACION").length,
    listos: orders.filter((o) => o.status === "LISTO").length,
    entregados: delivered,
    cancelados: orders.filter((o) => o.status === "CANCELADO").length,
    ventasDia: totalSales,
    ticketPromedio: avgTicket
  };
};
