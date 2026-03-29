"use client";

import { SectionHeader } from "@/components/shared/section-header";
import { OrdersTable } from "@/components/orders/orders-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { orders, stockItems, webhookEvents } from "@/data/mock-data";

export default function DeliveriesPage() {
  return (
    <div className="space-y-4 p-4">
      <SectionHeader title="Deliveries" description="Vista consolidada para operar delivery y notificaciones en tiempo real" />

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="events">Notificaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-4">
          <OrdersTable orders={orders} stockItems={stockItems} />
        </TabsContent>

        <TabsContent value="events" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Eventos de webhook</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader><TableRow><TableHead>Proveedor</TableHead><TableHead>Evento</TableHead><TableHead>Pedido</TableHead><TableHead>Firma</TableHead><TableHead>Hora</TableHead></TableRow></TableHeader>
                <TableBody>
                  {webhookEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>{event.provider}</TableCell>
                      <TableCell>{event.event}</TableCell>
                      <TableCell>{event.orderCode}</TableCell>
                      <TableCell><Badge variant={event.signature === "VALIDA" ? "success" : "danger"}>{event.signature}</Badge></TableCell>
                      <TableCell>{event.receivedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
