import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { inventory, products } from "@/lib/selectors";

export default function CatalogPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Catálogo y productos" description="Qué vender, qué destacar y qué ocultar según disponibilidad real." />

      <Card>
        <CardHeader><CardTitle>Catálogo operativo</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Stock relacionado</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const related = inventory.filter((item) => product.stockImpactIds.includes(item.id));
                const critical = related.some((item) => item.currentStock <= item.minStock);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>$ {product.price.toLocaleString("es-AR")}</TableCell>
                    <TableCell className="space-x-1">
                      {product.featured ? <Badge variant="secondary">Destacado</Badge> : null}
                      {product.category === "Combos" ? <Badge variant="outline">Promo</Badge> : null}
                    </TableCell>
                    <TableCell>{critical ? <Badge variant="outline">Riesgo por stock</Badge> : <Badge variant="secondary">Disponible</Badge>}</TableCell>
                    <TableCell>{product.active ? <Badge variant="default">Activo</Badge> : <Badge variant="destructive">Inactivo</Badge>}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
