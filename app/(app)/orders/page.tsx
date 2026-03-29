import { OrdersTable } from "@/components/orders/orders-table";
import { SectionHeader } from "@/components/shared/section-header";
import { orders, stockItems } from "@/data/mock-data";

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Bandeja unificada de pedidos"
        description="Pedidos de mostrador y delivery en una sola vista para decidir rápido qué atender primero"
      />
      <OrdersTable orders={orders} stockItems={stockItems} />
    </div>
  );
}
