import { hourlyOrders, inventory, operationalAlerts, orders, products, salesByChannel } from "./mock-data";

export const totals = {
  active: orders.filter((o) => !["ENTREGADO", "CANCELADO"].includes(o.status)).length,
  pending: orders.filter((o) => ["NUEVO", "CONFIRMADO"].includes(o.status)).length,
  preparing: orders.filter((o) => o.status === "EN_PREPARACION").length,
  ready: orders.filter((o) => o.status === "LISTO").length,
  delivered: orders.filter((o) => o.status === "ENTREGADO").length,
  cancelled: orders.filter((o) => o.status === "CANCELADO").length,
  revenue: orders.reduce((sum, order) => sum + order.items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0), 0)
};

export const avgTicket = Math.round(totals.revenue / Math.max(1, orders.length));

export const topProducts = products
  .map((product) => ({
    name: product.name,
    qty: orders.reduce(
      (sum, order) => sum + order.items.filter((item) => item.productId === product.id).reduce((acc, it) => acc + it.qty, 0),
      0
    )
  }))
  .sort((a, b) => b.qty - a.qty)
  .slice(0, 5);

export const criticalInventory = inventory.filter((item) => item.currentStock <= item.minStock);

export { orders, inventory, products, operationalAlerts, salesByChannel, hourlyOrders };
