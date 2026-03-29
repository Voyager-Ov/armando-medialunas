"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { Bell, ChartPie, ClipboardList, LayoutDashboard, PackageSearch, Sandwich, ShieldAlert, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Pedidos", icon: ClipboardList },
  { href: "/kitchen", label: "Producción", icon: Sandwich },
  { href: "/stock", label: "Stock", icon: PackageSearch },
  { href: "/catalog", label: "Catálogo", icon: Store },
  { href: "/alerts", label: "Alertas", icon: ShieldAlert },
  { href: "/analytics", label: "Analítica", icon: ChartPie }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 p-4 lg:grid-cols-[250px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500">Armando Medialunas</p>
              <p className="font-semibold">Centro Operativo</p>
            </div>
            <Badge variant="success">Demo</Badge>
          </div>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100",
                    active && "bg-slate-900 text-white hover:bg-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-4">
          <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Operación en tiempo real</p>
              <p className="text-sm font-medium text-slate-900">Turno mañana · Domingo, 29 de marzo de 2026</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                4 alertas
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm">Acciones rápidas</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Crear pedido de mostrador</DropdownMenuItem>
                  <DropdownMenuItem>Marcar stock recibido</DropdownMenuItem>
                  <DropdownMenuItem>Ver incidencias críticas</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
