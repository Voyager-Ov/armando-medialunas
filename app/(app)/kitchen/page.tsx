import { ChannelBadge } from "@/components/shared/channel-badge";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { statusColumns, orders } from "@/data/mock-data";

export default function KitchenPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Tablero operativo de producción" description="Flujo de cocina por estado para reducir cuellos de botella" />
      <div className="grid gap-3 xl:grid-cols-6">
        {statusColumns.map((status) => {
          const columnOrders = orders.filter((order) => order.status === status);
          return (
            <Card key={status} className="min-h-[420px]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-sm">
                  {status}
                  <Badge variant="secondary">{columnOrders.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[340px] space-y-2">
                  {columnOrders.map((order) => (
                    <div key={order.id} className="mb-2 rounded-lg border p-2 text-sm">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium">{order.code}</span>
                        <Badge variant={order.elapsedMinutes > order.etaMinutes ? "danger" : "outline"}>{order.elapsedMinutes}m</Badge>
                      </div>
                      <ChannelBadge channel={order.channel} />
                      <p className="mt-1 text-xs text-slate-600">{order.items.map((i) => `${i.quantity}x ${i.name}`).join(" · ")}</p>
                      <p className="mt-1 text-xs">Prioridad: <b>{order.priority}</b></p>
                      {order.notes ? <p className="text-xs text-amber-700">Obs: {order.notes}</p> : null}
                    </div>
                  ))}
                  {columnOrders.length === 0 ? <p className="text-xs text-slate-400">Sin pedidos</p> : null}
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
