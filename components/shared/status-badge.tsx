import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types";

const map: Record<OrderStatus, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  NUEVO: { label: "Nuevo", variant: "outline" },
  CONFIRMADO: { label: "Confirmado", variant: "secondary" },
  EN_PREPARACION: { label: "En preparación", variant: "default" },
  LISTO: { label: "Listo", variant: "secondary" },
  EN_CAMINO: { label: "En camino", variant: "outline" },
  ENTREGADO: { label: "Entregado", variant: "secondary" },
  CANCELADO: { label: "Cancelado", variant: "destructive" }
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const current = map[status];
  return <Badge variant={current.variant}>{current.label}</Badge>;
}
