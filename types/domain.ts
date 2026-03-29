export type Channel = "MOSTRADOR" | "PEDIDOSYA" | "UBER_EATS" | "RAPPI" | "MERCADO_LIBRE";

export type OrderStatus = "NUEVO" | "CONFIRMADO" | "EN_PREPARACION" | "LISTO" | "ENTREGADO" | "CANCELADO";
export type Priority = "ALTA" | "MEDIA" | "BAJA";

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  requires: string[];
};

export type Order = {
  id: string;
  code: string;
  channel: Channel;
  customer: string;
  phone: string;
  address?: string;
  pickup: boolean;
  createdAt: string;
  etaMinutes: number;
  elapsedMinutes: number;
  status: OrderStatus;
  priority: Priority;
  notes?: string;
  paymentMethod: "Efectivo" | "Tarjeta" | "Transferencia" | "Online";
  items: OrderItem[];
};

export type StockItem = {
  id: string;
  name: string;
  unit: string;
  current: number;
  min: number;
  impact: string;
};

export type Product = {
  id: string;
  name: string;
  category: "Facturas" | "Cafetería" | "Sándwiches" | "Combos";
  price: number;
  available: boolean;
  featured: boolean;
  promo?: string;
  stockSensitive: boolean;
};

export type OpsAlert = {
  id: string;
  title: string;
  severity: "CRITICA" | "MEDIA" | "INFO";
  detail: string;
  relatedOrderIds?: string[];
};

export type WebhookEvent = {
  id: string;
  provider: Channel;
  event: string;
  orderCode: string;
  signature: "VALIDA" | "INVALIDA";
  receivedAt: string;
};
