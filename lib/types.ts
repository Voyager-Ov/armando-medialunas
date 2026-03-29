export type Channel = "MOSTRADOR" | "PEDIDOS_YA" | "UBER_EATS" | "RAPPI" | "MERCADO_LIBRE";

export type OrderStatus =
  | "NUEVO"
  | "CONFIRMADO"
  | "EN_PREPARACION"
  | "LISTO"
  | "EN_CAMINO"
  | "ENTREGADO"
  | "CANCELADO";

export type Priority = "ALTA" | "MEDIA" | "BAJA";

export type OrderItem = {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  code: string;
  channel: Channel;
  customer: string;
  phone: string;
  address: string;
  pickup: boolean;
  status: OrderStatus;
  priority: Priority;
  createdAt: string;
  etaMinutes: number;
  elapsedMinutes: number;
  notes?: string;
  paymentMethod: "EFECTIVO" | "TARJETA" | "MERCADO_PAGO";
  items: OrderItem[];
};

export type InventoryItem = {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  affectedProducts: string[];
};

export type CatalogProduct = {
  id: string;
  name: string;
  category: "Panadería" | "Cafetería" | "Sandwiches" | "Combos";
  price: number;
  featured: boolean;
  active: boolean;
  stockImpactIds: string[];
};

export type OperationalAlert = {
  id: string;
  type: "DEMORA" | "STOCK" | "SATURACION" | "CANCELACION" | "INCIDENCIA_CANAL";
  severity: "ALTA" | "MEDIA" | "BAJA";
  title: string;
  detail: string;
  relatedOrderId?: string;
  channel?: Channel;
};
