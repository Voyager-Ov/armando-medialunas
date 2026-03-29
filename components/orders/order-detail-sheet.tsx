"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { currencyAr } from "@/lib/utils";
import { Order, StockItem } from "@/types/domain";
import { AlertTriangle } from "lucide-react";

export function OrderDetailSheet({ order, relatedStock }: { order: Order; relatedStock: StockItem[] }) {
  const total = order.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">Ver detalle</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="text-lg font-semibold">Pedido {order.code}</SheetTitle>
        <SheetDescription className="text-sm text-slate-500">Trazabilidad completa del pedido y acciones operativas</SheetDescription>

        <div className="mt-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex gap-2"><ChannelBadge channel={order.channel} /><StatusBadge status={order.status} /></div>
              <p><b>Cliente:</b> {order.customer}</p>
              <p><b>Contacto:</b> {order.phone}</p>
              <p><b>Entrega:</b> {order.pickup ? "Retiro en mostrador" : order.address}</p>
              <p><b>Pago:</b> {order.paymentMethod}</p>
              <p><b>ETA:</b> {order.etaMinutes} min · transcurrido {order.elapsedMinutes} min</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle>Productos</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between rounded-md border p-2">
                  <span>{item.quantity}x {item.name}</span>
                  <span>{currencyAr(item.quantity * item.unitPrice)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{currencyAr(total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2"><CardTitle>Alertas de stock vinculadas</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm">
              {relatedStock.length === 0 ? (
                <p className="text-slate-500">Sin impacto de stock detectado.</p>
              ) : (
                relatedStock.map((stock) => (
                  <div key={stock.id} className="rounded-md border border-amber-200 bg-amber-50 p-2 text-amber-800">
                    <div className="flex items-center gap-2 font-medium"><AlertTriangle className="h-4 w-4" /> {stock.name}</div>
                    <p className="text-xs">Stock actual: {stock.current}{stock.unit} · mínimo: {stock.min}{stock.unit}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary">Aceptar</Button>
            <Button variant="secondary">En preparación</Button>
            <Button variant="outline">Marcar listo</Button>
            <Button variant="outline">Entregar</Button>
            <Button variant="outline" className="col-span-2 border-red-200 text-red-600 hover:bg-red-50">Cancelar pedido</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
