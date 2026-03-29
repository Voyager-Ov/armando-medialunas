import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Armando Medialunas | Deliveries",
  description: "Panel unificado de pedidos y notificaciones multicanal"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
