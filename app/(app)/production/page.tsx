import { ChannelBadge } from "@/components/shared/channel-badge";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { orders } from "@/lib/selectors";
import { OrderStatus } from "@/lib/types";

const columns: { title: string; statuses: OrderStatus[] }[] = [
  { title: "Nuevo", statuses: ["NUEVO"] },
  { title: "Confirmado", statuses: ["CONFIRMADO"] },
  { title: "En preparación", statuses: ["EN_PREPARACION"] },
  { title: "Listo para entregar", statuses: ["LISTO"] },
  { title: "Cierre", statuses: ["EN_CAMINO", "ENTREGADO", "CANCELADO"] }
];

export default function ProductionPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Tablero operativo de producción" description="Flujo visual para cocina: qué entra, qué se prepara y qué está demorado." />
      <div className="grid gap-3 lg:grid-cols-5">
        {columns.map((column) => (
          <Card key={column.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">{column.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {orders.filter((order) => column.statuses.includes(order.status)).map((order) => (
                <div key={order.id} className="rounded-lg border bg-white p-3 text-xs">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">{order.code}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="mb-2"><ChannelBadge channel={order.channel} /></div>
                  <p className="mb-1 text-muted-foreground">{order.items.map((i) => `${i.qty}x ${i.name}`).join(" · ")}</p>
                  <p>Tiempo: {order.elapsedMinutes} min / ETA {order.etaMinutes} min</p>
                  <p className={order.elapsedMinutes > order.etaMinutes ? "font-semibold text-red-600" : "text-muted-foreground"}>
                    {order.elapsedMinutes > order.etaMinutes ? "Demorado" : `Prioridad ${order.priority}`}
                  </p>
                  {order.notes ? <p className="mt-1 text-[11px]">Obs: {order.notes}</p> : null}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
