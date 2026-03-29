import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home">
      <section>
        <h1>Armando Medialunas</h1>
        <p>Panel operativo de integraciones multicanal.</p>
        <Link href="/deliveries">Ir a Deliveries</Link>
      </section>
    </main>
  );
}
