import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { channels, orders } from "@/data/mock-data";
import { currencyAr } from "@/lib/utils";

export default function AnalyticsPage() {
  const salesByChannel = channels.map((channel) => {
    const channelOrders = orders.filter((o) => o.channel === channel.id && o.status !== "CANCELADO");
    const revenue = channelOrders.reduce((sum, o) => sum + o.items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0), 0);
    return { ...channel, revenue, count: channelOrders.length };
  });

  const peak = [
    { hour: "08-10", orders: 6 },
    { hour: "10-12", orders: 13 },
    { hour: "12-14", orders: 9 },
    { hour: "14-16", orders: 4 }
  ];

  return (
    <div className="space-y-4">
      <SectionHeader title="Analítica y métricas" description="Datos del día para decidir producción, tiempos y rentabilidad por canal" />

      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Ventas por canal</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {salesByChannel.map((row) => (
              <div key={row.id} className="rounded-md border p-3">
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">{row.label}</span>
                  <Badge variant="secondary">{row.count} pedidos</Badge>
                </div>
                <p className="text-sm text-slate-600">{currencyAr(row.revenue)}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pedidos por franja horaria</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {peak.map((slot) => (
              <div key={slot.hour} className="space-y-1">
                <div className="flex items-center justify-between text-sm"><span>{slot.hour}</span><span>{slot.orders} pedidos</span></div>
                <div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-slate-900" style={{ width: `${slot.orders * 7}%` }} /></div>
              </div>
            ))}
            <div className="rounded-md bg-slate-100 p-2 text-xs text-slate-600">Tiempo promedio de preparación: 19 min · Eficiencia operativa: 83%</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
