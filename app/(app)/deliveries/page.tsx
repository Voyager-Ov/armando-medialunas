"use client";

import * as React from "react";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { SectionHeader } from "@/components/shared/section-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Sheet } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip } from "@/components/ui/tooltip";
import { inventory, orders as initialOrders } from "@/lib/selectors";
import { Order, OrderStatus } from "@/lib/types";

function total(order: Order) {
  return order.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

export default function DeliveriesPage() {
  const [query, setQuery] = React.useState("");
  const [channel, setChannel] = React.useState("ALL");
  const [status, setStatus] = React.useState("ALL");
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [orders, setOrders] = React.useState(initialOrders);
  const [cancelOrderId, setCancelOrderId] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    return orders
      .filter((order) => (channel === "ALL" ? true : order.channel === channel))
      .filter((order) => (status === "ALL" ? true : order.status === status))
      .filter((order) => {
        const q = query.toLowerCase();
        return [order.code, order.customer, order.id].join(" ").toLowerCase().includes(q);
      })
      .sort((a, b) => b.elapsedMinutes - a.elapsedMinutes);
  }, [orders, channel, status, query]);

  const updateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
    setSelectedOrder((prev) => (prev && prev.id === orderId ? { ...prev, status: nextStatus } : prev));
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="Bandeja unificada de pedidos" description="Consolidá mostrador y delivery en una sola operación visible y priorizada." />

      <Card>
        <CardHeader>
          <CardTitle>Filtros operativos</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Input placeholder="Buscar por código, cliente o ID" value={query} onChange={(e) => setQuery(e.target.value)} />
          <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="ALL">Todos los canales</option>
            <option value="MOSTRADOR">Mostrador</option>
            <option value="PEDIDOS_YA">PedidosYa</option>
            <option value="UBER_EATS">Uber Eats</option>
            <option value="RAPPI">Rappi</option>
            <option value="MERCADO_LIBRE">Mercado Libre</option>
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">Todos los estados</option>
            <option value="NUEVO">Nuevo</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="LISTO">Listo</option>
            <option value="EN_CAMINO">En camino</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </Select>
          <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">Ordenado por urgencia (tiempo transcurrido)</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Tiempo</TableHead>
                <TableHead>ETA</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => (
                <TableRow key={order.id} className={order.elapsedMinutes > order.etaMinutes ? "bg-red-50/50" : ""}>
                  <TableCell>
                    <p className="font-medium">{order.code}</p>
                    <p className="text-xs text-muted-foreground">{order.createdAt}</p>
                  </TableCell>
                  <TableCell><ChannelBadge channel={order.channel} /></TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell className="max-w-48 truncate">{order.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</TableCell>
                  <TableCell>{order.priority}</TableCell>
                  <TableCell>{order.elapsedMinutes} min</TableCell>
                  <TableCell>{order.etaMinutes} min</TableCell>
                  <TableCell>
                    <Tooltip>
                      <StatusBadge status={order.status} />
                    </Tooltip>
                  </TableCell>
                  <TableCell>$ {total(order).toLocaleString("es-AR")}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedOrder(order)}>Detalle</Button>
                      <DropdownMenu label="Más">
                        <DropdownMenuItem>Imprimir ticket</DropdownMenuItem>
                        <DropdownMenuItem>Asignar repartidor</DropdownMenuItem>
                        <DropdownMenuItem>Contactar cliente</DropdownMenuItem>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={Boolean(selectedOrder)} title={`Detalle ${selectedOrder?.code ?? ""}`} onClose={() => setSelectedOrder(null)}>
        {selectedOrder ? (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3 rounded-lg border p-3">
              <div><p className="text-xs text-muted-foreground">Cliente</p><p className="font-medium">{selectedOrder.customer}</p></div>
              <div><p className="text-xs text-muted-foreground">Canal</p><ChannelBadge channel={selectedOrder.channel} /></div>
              <div><p className="text-xs text-muted-foreground">Entrega</p><p>{selectedOrder.pickup ? "Retiro en local" : selectedOrder.address}</p></div>
              <div><p className="text-xs text-muted-foreground">Pago</p><p>{selectedOrder.paymentMethod}</p></div>
            </div>

            <Card>
              <CardHeader><CardTitle>Productos</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {selectedOrder.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span>{item.qty} x {item.name}</span>
                    <span>$ {(item.qty * item.unitPrice).toLocaleString("es-AR")}</span>
                  </div>
                ))}
                <p className="pt-2 text-right font-semibold">Total: $ {total(selectedOrder).toLocaleString("es-AR")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Riesgo de faltantes</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {inventory
                  .filter((input) => selectedOrder.items.some((item) => input.affectedProducts.includes(item.name)))
                  .map((input) => (
                    <p key={input.id} className="text-xs">
                      {input.name}: {input.currentStock}{input.unit} / mínimo {input.minStock}{input.unit}
                    </p>
                  ))}
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={() => updateOrderStatus(selectedOrder.id, "CONFIRMADO")}>Aceptar</Button>
              <Button variant="secondary" onClick={() => updateOrderStatus(selectedOrder.id, "EN_PREPARACION")}>En preparación</Button>
              <Button variant="outline" onClick={() => updateOrderStatus(selectedOrder.id, "LISTO")}>Marcar listo</Button>
              <Button variant="outline" onClick={() => updateOrderStatus(selectedOrder.id, "ENTREGADO")}>Entregar</Button>
              <Button variant="destructive" className="col-span-2" onClick={() => setCancelOrderId(selectedOrder.id)}>Cancelar pedido</Button>
            </div>
          </div>
        ) : null}
      </Sheet>

      <Dialog
        open={Boolean(cancelOrderId)}
        onClose={() => setCancelOrderId(null)}
        title="¿Cancelar pedido?"
      >
        <div className="space-y-3 text-sm">
          <p>Esta acción simula cancelación operativa y actualizará la bandeja unificada.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setCancelOrderId(null)}>Volver</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (cancelOrderId) updateOrderStatus(cancelOrderId, "CANCELADO");
                setCancelOrderId(null);
              }}
            >
              Confirmar cancelación
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
