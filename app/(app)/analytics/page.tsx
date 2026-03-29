import { MockBarChart } from "@/components/shared/mock-chart";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hourlyOrders, salesByChannel, topProducts } from "@/lib/selectors";

export default function AnalyticsPage() {
  const totalOrders = salesByChannel.reduce((acc, item) => acc + item.orders, 0);
  const totalSales = salesByChannel.reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="space-y-5">
      <SectionHeader title="Analítica del día" description="Métricas para decidir operación, producción y rentabilidad por canal." />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Ventas por canal</CardTitle></CardHeader>
          <CardContent><MockBarChart data={salesByChannel.map((c) => ({ label: c.channel, value: c.amount }))} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pedidos por franja</CardTitle></CardHeader>
          <CardContent><MockBarChart data={hourlyOrders.map((h) => ({ label: h.hour, value: h.total }))} /></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Productos más vendidos</CardTitle></CardHeader>
          <CardContent><MockBarChart data={topProducts.map((p) => ({ label: p.name, value: p.qty }))} /></CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <Card><CardHeader><CardTitle>Total ventas</CardTitle></CardHeader><CardContent className="text-xl font-semibold">$ {totalSales.toLocaleString("es-AR")}</CardContent></Card>
        <Card><CardHeader><CardTitle>Total pedidos</CardTitle></CardHeader><CardContent className="text-xl font-semibold">{totalOrders}</CardContent></Card>
        <Card><CardHeader><CardTitle>Tasa cancelación</CardTitle></CardHeader><CardContent className="text-xl font-semibold">6.9%</CardContent></Card>
        <Card><CardHeader><CardTitle>Prep promedio</CardTitle></CardHeader><CardContent className="text-xl font-semibold">18 min</CardContent></Card>
      </div>
    </div>
  );
}
