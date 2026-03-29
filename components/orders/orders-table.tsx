"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChannelBadge } from "@/components/shared/channel-badge";
import { StatusBadge } from "@/components/shared/status-badge";
import { currencyAr } from "@/lib/utils";
import { Order, OrderStatus, StockItem } from "@/types/domain";
import { OrderDetailSheet } from "@/components/orders/order-detail-sheet";

export function OrdersTable({ orders, stockItems }: { orders: Order[]; stockItems: StockItem[] }) {
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("TODOS");
  const [status, setStatus] = useState("TODOS");

  const filtered = useMemo(() => {
    return [...orders]
      .filter((order) => (channel === "TODOS" ? true : order.channel === channel))
      .filter((order) => (status === "TODOS" ? true : order.status === status))
      .filter((order) => `${order.code}${order.customer}`.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => b.elapsedMinutes - a.elapsedMinutes);
  }, [orders, channel, search, status]);

  return (
    <Card>
      <CardHeader><CardTitle>Bandeja unificada de pedidos</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2 md:grid-cols-4">
          <Input placeholder="Buscar por código o cliente" value={search} onChange={(e) => setSearch(e.target.value)} />
          <Select value={channel} onChange={(e) => setChannel(e.target.value)}>
            <option value="TODOS">Todos los canales</option>
            <option value="MOSTRADOR">Mostrador</option>
            <option value="PEDIDOSYA">PedidosYa</option>
            <option value="UBER_EATS">Uber Eats</option>
            <option value="RAPPI">Rappi</option>
            <option value="MERCADO_LIBRE">Mercado Libre</option>
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="TODOS">Todos los estados</option>
            {(["NUEVO", "CONFIRMADO", "EN_PREPARACION", "LISTO", "ENTREGADO", "CANCELADO"] as OrderStatus[]).map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </Select>
          <div className="text-xs text-slate-500">Ordenado por urgencia (más demorado primero)</div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Canal</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Prioridad</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => {
              const amount = order.items.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0);
              const relatedStock = stockItems.filter((s) => order.items.flatMap((i) => i.requires).includes(s.id) && s.current <= s.min);
              return (
                <TableRow key={order.id} className={order.elapsedMinutes > order.etaMinutes ? "bg-red-50/60" : ""}>
                  <TableCell><ChannelBadge channel={order.channel} /></TableCell>
                  <TableCell>
                    <div className="font-medium">{order.code}</div>
                    <div className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</div>
                  </TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell><StatusBadge status={order.status} /></TableCell>
                  <TableCell>{order.priority}</TableCell>
                  <TableCell>{order.elapsedMinutes}/{order.etaMinutes} min</TableCell>
                  <TableCell>{currencyAr(amount)}</TableCell>
                  <TableCell><OrderDetailSheet order={order} relatedStock={relatedStock} /></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
