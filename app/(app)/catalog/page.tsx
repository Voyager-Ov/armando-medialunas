import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, stockItems } from "@/data/mock-data";
import { currencyAr } from "@/lib/utils";

export default function CatalogPage() {
  const lowStockIds = new Set(stockItems.filter((s) => s.current <= s.min).map((s) => s.id));
  return (
    <div className="space-y-4">
      <SectionHeader title="Catálogo de productos" description="Gestión visual de oferta activa, promos y riesgo de stock" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => {
          const warning = product.stockSensitive && Array.from(lowStockIds).length > 0;
          return (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{product.name}</span>
                  <Badge variant={product.available ? "success" : "danger"}>{product.available ? "Activo" : "Inactivo"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between"><span>Categoría</span><span>{product.category}</span></div>
                <div className="flex items-center justify-between"><span>Precio</span><span>{currencyAr(product.price)}</span></div>
                <div className="flex items-center justify-between"><span>Destacado</span><Badge variant={product.featured ? "info" : "outline"}>{product.featured ? "Sí" : "No"}</Badge></div>
                {product.promo ? <p className="rounded-md bg-blue-50 p-2 text-xs text-blue-700">Promo: {product.promo}</p> : null}
                {warning ? <p className="rounded-md bg-amber-50 p-2 text-xs text-amber-700">Puede verse afectado por faltantes de insumos críticos</p> : null}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
