import { SectionHeader } from "@/components/shared/section-header";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { orders, stockItems } from "@/data/mock-data";

export default function StockPage() {
  const critical = stockItems.filter((s) => s.current <= s.min);

  return (
    <div className="space-y-4">
      <SectionHeader title="Stock, faltantes y alertas" description="Anticipación de quiebres y su impacto directo en pedidos activos" />
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader><CardTitle>Estado de insumos</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Insumo</TableHead><TableHead>Stock actual</TableHead><TableHead>Mínimo</TableHead><TableHead>Estado</TableHead><TableHead>Impacto</TableHead></TableRow></TableHeader>
              <TableBody>
                {stockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.current} {item.unit}</TableCell>
                    <TableCell>{item.min} {item.unit}</TableCell>
                    <TableCell>
                      <Badge variant={item.current <= item.min ? "danger" : "success"}>{item.current <= item.min ? "Crítico" : "OK"}</Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{item.impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pedidos afectados</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {critical.map((item) => {
              const affected = orders.filter((order) => order.items.some((orderItem) => orderItem.requires.includes(item.id)));
              return (
                <Alert key={item.id} className="border-amber-200 bg-amber-50">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-slate-600">Afecta {affected.length} pedidos: {affected.map((a) => a.code).join(", ") || "sin impacto"}</p>
                </Alert>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
