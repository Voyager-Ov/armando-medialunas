import { AlertCard } from "@/components/shared/alert-card";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inventory, operationalAlerts } from "@/lib/selectors";

export default function StockPage() {
  return (
    <div className="space-y-5">
      <SectionHeader title="Stock, faltantes y alertas" description="Anticipá quiebres antes de que afecten producción y promesas de entrega." />

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Estado de insumos</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Insumo</TableHead>
                  <TableHead>Stock actual</TableHead>
                  <TableHead>Mínimo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Impacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventory.map((item) => {
                  const ratio = (item.currentStock / Math.max(item.minStock, 1)) * 100;
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.currentStock} {item.unit}</TableCell>
                      <TableCell>{item.minStock} {item.unit}</TableCell>
                      <TableCell className="w-56">
                        <Progress value={Math.min(ratio, 100)} />
                      </TableCell>
                      <TableCell>
                        {item.currentStock === 0 ? <Badge variant="destructive">Agotado</Badge> : item.currentStock <= item.minStock ? <Badge variant="outline">Crítico</Badge> : <Badge variant="secondary">OK</Badge>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pedidos afectados</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>Falta queso tybo impacta 3 pedidos activos (tostados y medialunas JyQ).</p>
            <p>Jamón cocido bajo: 2 pedidos podrían salir con demora.</p>
            <p>Banana agotada: ocultar licuado en catálogo y apps.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {operationalAlerts.filter((a) => a.type === "STOCK").map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}
