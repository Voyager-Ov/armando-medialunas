import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { alerts, orders } from "@/data/mock-data";

export default function AlertsPage() {
  const delayed = orders.filter((o) => o.elapsedMinutes > o.etaMinutes);

  return (
    <div className="space-y-4">
      <SectionHeader title="Alertas e incidencias operativas" description="Vista central de lo urgente: demoras, faltantes, cancelaciones y sobrecarga" />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Bandeja de incidencias</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-medium">{alert.title}</p>
                  <Badge variant={alert.severity === "CRITICA" ? "danger" : alert.severity === "MEDIA" ? "warning" : "info"}>{alert.severity}</Badge>
                </div>
                <p className="text-sm text-slate-600">{alert.detail}</p>
                {alert.relatedOrderIds?.length ? <p className="mt-1 text-xs text-slate-500">Pedidos: {alert.relatedOrderIds.join(", ")}</p> : null}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pedidos demorados</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {delayed.map((order) => (
              <div key={order.id} className="rounded-md border border-red-200 bg-red-50 p-2 text-sm">
                <p className="font-medium">{order.code} · {order.customer}</p>
                <p className="text-xs">ETA {order.etaMinutes}m · transcurrido {order.elapsedMinutes}m</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
