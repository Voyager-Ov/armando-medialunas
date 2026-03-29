import styles from "./deliveries.module.css";

type Delivery = {
  id: string;
  source: "uber" | "pedidosya" | "rappi" | "mercadolibre";
  code: string;
  customer: string;
  total: string;
  status: "NEW" | "ACCEPTED" | "READY" | "DISPATCHED" | "DELIVERED" | "CANCELLED";
  updatedAt: string;
};

type Notification = {
  provider: "Uber Eats" | "PedidosYa" | "Rappi" | "Mercado Libre";
  event: string;
  orderRef: string;
  signature: "VALID" | "INVALID";
  receivedAt: string;
};

const deliveries: Delivery[] = [
  {
    id: "9e14f73a-4401",
    source: "uber",
    code: "UE-5401",
    customer: "Lucía Fernández",
    total: "$ 9.450",
    status: "NEW",
    updatedAt: "2026-03-29 12:05"
  },
  {
    id: "7d88a9a0-1182",
    source: "pedidosya",
    code: "PY-1018",
    customer: "Juan Pérez",
    total: "$ 4.200",
    status: "READY",
    updatedAt: "2026-03-29 12:03"
  },
  {
    id: "a2bb7f00-4402",
    source: "rappi",
    code: "RP-8832",
    customer: "María Ortiz",
    total: "$ 6.700",
    status: "DISPATCHED",
    updatedAt: "2026-03-29 11:59"
  },
  {
    id: "ML-987654321",
    source: "mercadolibre",
    code: "ML-2210",
    customer: "Carlos Díaz",
    total: "$ 3.350",
    status: "CANCELLED",
    updatedAt: "2026-03-29 11:52"
  }
];

const notifications: Notification[] = [
  {
    provider: "Uber Eats",
    event: "orders.notification",
    orderRef: "153dd7f1-339d",
    signature: "VALID",
    receivedAt: "2026-03-29 12:05:17"
  },
  {
    provider: "PedidosYa",
    event: "RECEIVED",
    orderRef: "807c225f-ac6d",
    signature: "VALID",
    receivedAt: "2026-03-29 12:03:01"
  },
  {
    provider: "Rappi",
    event: "ORDER_EVENT_CANCEL",
    orderRef: "a1b2c3",
    signature: "VALID",
    receivedAt: "2026-03-29 11:57:41"
  },
  {
    provider: "Mercado Libre",
    event: "orders_v2",
    orderRef: "/orders/987654321",
    signature: "INVALID",
    receivedAt: "2026-03-29 11:52:10"
  }
];

const sourceLabel: Record<Delivery["source"], string> = {
  uber: "Uber Eats",
  pedidosya: "PedidosYa",
  rappi: "Rappi",
  mercadolibre: "Mercado Libre"
};

export default function DeliveriesPage() {
  const now = new Date("2026-03-29T12:10:00Z");

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Deliveries</h1>
            <p className={styles.subtitle}>Panel unificado de pedidos y notificaciones multicanal</p>
          </div>
          <span className={styles.now}>Última actualización: {now.toISOString().replace("T", " ").slice(0, 16)}</span>
        </header>

        <section className={styles.statsGrid} aria-label="Resumen operativo">
          <article className={styles.card}>
            <p className={styles.cardLabel}>Pedidos activos</p>
            <p className={styles.cardValue}>24</p>
          </article>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Nuevos</p>
            <p className={styles.cardValue}>6</p>
          </article>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Listos para retiro</p>
            <p className={styles.cardValue}>5</p>
          </article>
          <article className={styles.card}>
            <p className={styles.cardLabel}>Cancelados hoy</p>
            <p className={styles.cardValue}>2</p>
          </article>
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Pedidos</h2>
            <span className={styles.chip}>Vista simple</span>
          </div>

          <div className={styles.filters}>
            <input className={styles.input} placeholder="Buscar por cliente, código o ID" defaultValue="" />
            <select className={styles.select} defaultValue="all">
              <option value="all">Todas las plataformas</option>
              <option value="uber">Uber Eats</option>
              <option value="pedidosya">PedidosYa</option>
              <option value="rappi">Rappi</option>
              <option value="mercadolibre">Mercado Libre</option>
            </select>
            <select className={styles.select} defaultValue="all">
              <option value="all">Todos los estados</option>
              <option value="NEW">NEW</option>
              <option value="READY">READY</option>
              <option value="DISPATCHED">DISPATCHED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
            <select className={styles.select} defaultValue="desc">
              <option value="desc">Más recientes</option>
              <option value="asc">Más antiguos</option>
            </select>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Plataforma</th>
                  <th>ID Externo</th>
                  <th>Código</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Actualizado</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>{sourceLabel[delivery.source]}</td>
                    <td className={styles.mono}>{delivery.id}</td>
                    <td>{delivery.code}</td>
                    <td>{delivery.customer}</td>
                    <td>{delivery.total}</td>
                    <td>
                      <span className={styles.status}>{delivery.status}</span>
                    </td>
                    <td>{delivery.updatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className={styles.sectionTitle}>Notificaciones de Webhook</p>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Eventos recientes</h2>
            <span className={styles.chip}>Validación de firma</span>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Proveedor</th>
                  <th>Evento</th>
                  <th>Referencia orden</th>
                  <th>Firma</th>
                  <th>Recibido</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification) => (
                  <tr key={`${notification.provider}-${notification.receivedAt}`}>
                    <td>{notification.provider}</td>
                    <td className={styles.mono}>{notification.event}</td>
                    <td className={styles.mono}>{notification.orderRef}</td>
                    <td>
                      <span className={styles.status}>{notification.signature}</span>
                    </td>
                    <td>{notification.receivedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
