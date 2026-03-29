import { AlertCard } from "@/components/shared/alert-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { operationalAlerts, orders } from "@/lib/selectors";

export default function AlertsPage() {
  const delayed = orders.filter((o) => o.elapsedMinutes > o.etaMinutes);
  const cancelled = orders.filter((o) => o.status === "CANCELADO");

  return (
    <div className="space-y-5">
      <SectionHeader title="Alertas e incidencias" description="Bandeja de problemas operativos para reaccionar rápido." />

      <div className="grid gap-3 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Pedidos demorados</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{delayed.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Cancelaciones recientes</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{cancelled.length}</CardContent></Card>
        <Card><CardHeader><CardTitle>Incidencias activas</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{operationalAlerts.length}</CardContent></Card>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {operationalAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
