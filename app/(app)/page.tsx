import { alerts, channels, getKpiData, orders, webhookEvents } from "@/data/mock-data";
import { KpiCard } from "@/components/shared/kpi-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { currencyAr } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const kpi = getKpiData();
  const topProducts = ["Combo Desayuno Oficina", "Medialuna de manteca", "Café con leche"];

  return (
    <div className="space-y-4">
      <SectionHeader title="Dashboard Ejecutivo" description="Del caos multicanal a una operación visible y priorizada" />

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Pedidos activos" value={`${kpi.activos}`} subtitle={`${kpi.pendientes} pendientes`} />
        <KpiCard title="En preparación" value={`${kpi.preparacion}`} subtitle={`${kpi.listos} listos`} />
        <KpiCard title="Cancelados" value={`${kpi.cancelados}`} subtitle="últimas 24 h" />
        <KpiCard title="Ventas del día" value={currencyAr(kpi.ventasDia)} subtitle="canales + mostrador" />
        <KpiCard title="Ticket promedio" value={currencyAr(kpi.ticketPromedio)} subtitle="meta: $8.200" />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Rendimiento por canal</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {channels.map((channel) => {
              const count = orders.filter((o) => o.channel === channel.id).length;
              const pct = Math.round((count / orders.length) * 100);
              return (
                <div key={channel.id} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{channel.label}</span>
                    <span className="text-slate-500">{count} pedidos · {pct}%</span>
                  </div>
                  <Progress value={pct} />
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Alertas operativas</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {alerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <Badge variant={alert.severity === "CRITICA" ? "danger" : alert.severity === "MEDIA" ? "warning" : "info"}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-slate-500">{alert.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Actividad reciente</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-md border p-2">
                <span>{o.code} · {o.customer}</span>
                <Badge variant="secondary">{o.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Sistema de notificaciones</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {webhookEvents.map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-md border p-2">
                <span>{e.event} · {e.orderCode}</span>
                <Badge variant={e.signature === "VALIDA" ? "success" : "danger"}>{e.signature}</Badge>
              </div>
            ))}
            <p className="text-xs text-slate-500">Top vendidos: {topProducts.join(" · ")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
