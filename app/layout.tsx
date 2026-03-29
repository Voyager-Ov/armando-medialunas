import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Armando Medialunas | Sistema Operativo",
  description: "Demo de sistema gastronómico unificado multicanal"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
