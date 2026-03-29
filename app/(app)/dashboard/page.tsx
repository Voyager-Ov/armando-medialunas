"use client";

import { AlertCard } from "@/components/shared/alert-card";
import { KpiCard } from "@/components/shared/kpi-card";
import { MockBarChart } from "@/components/shared/mock-chart";
import { SectionHeader } from "@/components/shared/section-header";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Clock3, PackageCheck, ShoppingBag, Store, TrendingUp } from "lucide-react";
import { criticalInventory, hourlyOrders, operationalAlerts, salesByChannel, topProducts, totals, avgTicket } from "@/lib/selectors";
import * as React from "react";

export default function DashboardPage() {
  const [view, setView] = React.useState<"hoy" | "turno">("hoy");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <SectionHeader title="Centro de control operativo" description="Visibilidad en tiempo real de pedidos, producción, stock y alertas." />
        <Tabs>
          <TabsList>
            <TabsTrigger active={view === "hoy"} onClick={() => setView("hoy")}>Hoy</TabsTrigger>
            <TabsTrigger active={view === "turno"} onClick={() => setView("turno")}>Turno mañana</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard title="Pedidos activos" value={`${totals.active}`} hint="En flujo operativo" icon={ShoppingBag} />
        <KpiCard title="Pendientes" value={`${totals.pending}`} hint="Requieren confirmación" icon={Clock3} />
        <KpiCard title="En preparación" value={`${totals.preparing}`} hint="Cocina trabajando" icon={Store} />
        <KpiCard title="Ventas del día" value={`$${totals.revenue.toLocaleString("es-AR")}`} hint={`Ticket promedio $${avgTicket.toLocaleString("es-AR")}`} icon={TrendingUp} />
        <KpiCard title="Alertas de stock" value={`${criticalInventory.length}`} hint="Insumos críticos / agotados" icon={AlertTriangle} />
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-900">
        Pico operativo 12:00–13:00. Recomendación: priorizar combos y frenar productos con faltantes críticos.
      </Alert>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Pedidos por franja horaria ({view})</CardTitle>
          </CardHeader>
          <CardContent>
            <MockBarChart data={hourlyOrders.map((h) => ({ label: h.hour, value: h.total }))} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top productos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProducts.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-semibold">{item.qty} uds</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Resumen por canal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {salesByChannel.map((channel) => (
              <div key={channel.channel}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>{channel.channel}</span>
                  <span className="font-medium">{channel.orders} pedidos</span>
                </div>
                <div className="text-xs text-muted-foreground">$ {channel.amount.toLocaleString("es-AR")}</div>
                <Separator />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertas operativas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {operationalAlerts.slice(0, 3).map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actividad reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-44 space-y-3 text-sm">
            <p className="mb-3 flex items-center gap-2"><PackageCheck className="h-4 w-4 text-muted-foreground" /> Pedido AM-1002 marcado como listo para retiro en mostrador.</p>
            <p className="mb-3 flex items-center gap-2"><PackageCheck className="h-4 w-4 text-muted-foreground" /> Uber Eats ingresó AM-1003, prioridad alta por distancia.</p>
            <p className="mb-3 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-muted-foreground" /> Stock bajo de queso tybo impacta tostados y medialunas JyQ.</p>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
