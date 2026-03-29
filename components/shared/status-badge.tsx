import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/types/domain";

const statusMap: Record<OrderStatus, { label: string; variant: "secondary" | "info" | "warning" | "success" | "danger" | "outline" }> = {
  NUEVO: { label: "Nuevo", variant: "info" },
  CONFIRMADO: { label: "Confirmado", variant: "secondary" },
  EN_PREPARACION: { label: "En preparación", variant: "warning" },
  LISTO: { label: "Listo", variant: "success" },
  ENTREGADO: { label: "Entregado", variant: "outline" },
  CANCELADO: { label: "Cancelado", variant: "danger" }
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const data = statusMap[status];
  return <Badge variant={data.variant}>{data.label}</Badge>;
}
