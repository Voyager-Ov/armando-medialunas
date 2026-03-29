import { CatalogProduct, InventoryItem, OperationalAlert, Order } from "./types";

export const products: CatalogProduct[] = [
  { id: "p1", name: "Medialuna de manteca", category: "Panadería", price: 700, featured: true, active: true, stockImpactIds: ["i1", "i2"] },
  { id: "p2", name: "Café con leche", category: "Cafetería", price: 2600, featured: true, active: true, stockImpactIds: ["i3"] },
  { id: "p3", name: "Tostado jamón y queso", category: "Sandwiches", price: 4900, featured: true, active: true, stockImpactIds: ["i4", "i5"] },
  { id: "p4", name: "Combo desayuno clásico", category: "Combos", price: 6400, featured: true, active: true, stockImpactIds: ["i1", "i2", "i3"] },
  { id: "p5", name: "Criollos cordobeses", category: "Panadería", price: 1100, featured: false, active: true, stockImpactIds: ["i1"] },
  { id: "p6", name: "Medialuna JyQ", category: "Panadería", price: 1900, featured: false, active: true, stockImpactIds: ["i4", "i2"] },
  { id: "p7", name: "Licuado de banana", category: "Cafetería", price: 3200, featured: false, active: false, stockImpactIds: ["i6"] }
];

export const inventory: InventoryItem[] = [
  { id: "i1", name: "Harina 000", unit: "kg", currentStock: 14, minStock: 18, affectedProducts: ["Medialuna de manteca", "Criollos cordobeses", "Combo desayuno clásico"] },
  { id: "i2", name: "Manteca", unit: "kg", currentStock: 4, minStock: 8, affectedProducts: ["Medialuna de manteca", "Medialuna JyQ", "Combo desayuno clásico"] },
  { id: "i3", name: "Leche", unit: "L", currentStock: 22, minStock: 12, affectedProducts: ["Café con leche", "Combo desayuno clásico"] },
  { id: "i4", name: "Jamón cocido", unit: "kg", currentStock: 2, minStock: 6, affectedProducts: ["Tostado jamón y queso", "Medialuna JyQ"] },
  { id: "i5", name: "Queso tybo", unit: "kg", currentStock: 1, minStock: 5, affectedProducts: ["Tostado jamón y queso", "Medialuna JyQ"] },
  { id: "i6", name: "Banana", unit: "kg", currentStock: 0, minStock: 3, affectedProducts: ["Licuado de banana"] }
];

export const orders: Order[] = [
  {
    id: "o-1001",
    code: "AM-1001",
    channel: "PEDIDOS_YA",
    customer: "Lucía Fernández",
    phone: "+54 9 351 501 2233",
    address: "Av. Colón 1120",
    pickup: false,
    status: "EN_PREPARACION",
    priority: "ALTA",
    createdAt: "11:58",
    etaMinutes: 35,
    elapsedMinutes: 31,
    notes: "Sin azúcar en el café",
    paymentMethod: "MERCADO_PAGO",
    items: [
      { productId: "p4", name: "Combo desayuno clásico", qty: 1, unitPrice: 6400 },
      { productId: "p6", name: "Medialuna JyQ", qty: 2, unitPrice: 1900 }
    ]
  },
  {
    id: "o-1002",
    code: "AM-1002",
    channel: "MOSTRADOR",
    customer: "Consumidor final",
    phone: "-",
    address: "Retira en local",
    pickup: true,
    status: "LISTO",
    priority: "MEDIA",
    createdAt: "12:10",
    etaMinutes: 10,
    elapsedMinutes: 9,
    paymentMethod: "TARJETA",
    items: [
      { productId: "p1", name: "Medialuna de manteca", qty: 6, unitPrice: 700 },
      { productId: "p2", name: "Café con leche", qty: 1, unitPrice: 2600 }
    ]
  },
  {
    id: "o-1003",
    code: "AM-1003",
    channel: "UBER_EATS",
    customer: "Julián López",
    phone: "+54 9 351 421 8891",
    address: "Bv. Illia 412",
    pickup: false,
    status: "NUEVO",
    priority: "ALTA",
    createdAt: "12:13",
    etaMinutes: 30,
    elapsedMinutes: 4,
    notes: "Agregar servilletas",
    paymentMethod: "MERCADO_PAGO",
    items: [{ productId: "p3", name: "Tostado jamón y queso", qty: 2, unitPrice: 4900 }]
  },
  {
    id: "o-1004",
    code: "AM-1004",
    channel: "RAPPI",
    customer: "Nadia Quiroga",
    phone: "+54 9 351 718 4500",
    address: "Ayacucho 865",
    pickup: false,
    status: "EN_CAMINO",
    priority: "MEDIA",
    createdAt: "11:44",
    etaMinutes: 28,
    elapsedMinutes: 33,
    paymentMethod: "TARJETA",
    items: [
      { productId: "p5", name: "Criollos cordobeses", qty: 4, unitPrice: 1100 },
      { productId: "p2", name: "Café con leche", qty: 2, unitPrice: 2600 }
    ]
  },
  {
    id: "o-1005",
    code: "AM-1005",
    channel: "MERCADO_LIBRE",
    customer: "Claudia Benítez",
    phone: "+54 9 351 912 3377",
    address: "José de Calasanz 733",
    pickup: false,
    status: "CANCELADO",
    priority: "BAJA",
    createdAt: "11:18",
    etaMinutes: 40,
    elapsedMinutes: 15,
    notes: "Cliente canceló por demora",
    paymentMethod: "MERCADO_PAGO",
    items: [{ productId: "p4", name: "Combo desayuno clásico", qty: 1, unitPrice: 6400 }]
  },
  {
    id: "o-1006",
    code: "AM-1006",
    channel: "PEDIDOS_YA",
    customer: "Martín Ochoa",
    phone: "+54 9 351 613 5418",
    address: "Sarmiento 151",
    pickup: false,
    status: "CONFIRMADO",
    priority: "MEDIA",
    createdAt: "12:01",
    etaMinutes: 25,
    elapsedMinutes: 18,
    paymentMethod: "TARJETA",
    items: [
      { productId: "p1", name: "Medialuna de manteca", qty: 4, unitPrice: 700 },
      { productId: "p3", name: "Tostado jamón y queso", qty: 1, unitPrice: 4900 }
    ]
  }
];

export const operationalAlerts: OperationalAlert[] = [
  {
    id: "a1",
    type: "DEMORA",
    severity: "ALTA",
    title: "Pedido AM-1001 al límite de SLA",
    detail: "Lleva 31 min en preparación (ETA 35 min).",
    relatedOrderId: "o-1001",
    channel: "PEDIDOS_YA"
  },
  {
    id: "a2",
    type: "STOCK",
    severity: "ALTA",
    title: "Queso tybo crítico",
    detail: "Stock actual 1 kg. Impacta 3 pedidos en cola y 2 productos de catálogo."
  },
  {
    id: "a3",
    type: "INCIDENCIA_CANAL",
    severity: "MEDIA",
    title: "Rappi con alta latencia",
    detail: "3 pedidos superan ETA promedio del canal.",
    channel: "RAPPI"
  },
  {
    id: "a4",
    type: "SATURACION",
    severity: "MEDIA",
    title: "Pico de pedidos 12:00-13:00",
    detail: "Se recomienda priorizar combos rápidos y limitar items sin stock."
  }
];

export const salesByChannel = [
  { channel: "Mostrador", amount: 145000, orders: 39 },
  { channel: "PedidosYa", amount: 118500, orders: 28 },
  { channel: "Uber Eats", amount: 84300, orders: 17 },
  { channel: "Rappi", amount: 66200, orders: 14 },
  { channel: "Mercado Libre", amount: 24200, orders: 6 }
];

export const hourlyOrders = [
  { hour: "08:00", total: 8 },
  { hour: "09:00", total: 14 },
  { hour: "10:00", total: 22 },
  { hour: "11:00", total: 29 },
  { hour: "12:00", total: 37 },
  { hour: "13:00", total: 31 },
  { hour: "14:00", total: 16 }
];
