"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BellRing, Boxes, ClipboardList, LayoutDashboard, PackageSearch, PanelRight } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/deliveries", label: "Pedidos", icon: ClipboardList },
  { href: "/production", label: "Producción", icon: PanelRight },
  { href: "/stock", label: "Stock", icon: PackageSearch },
  { href: "/catalog", label: "Catálogo", icon: Boxes },
  { href: "/alerts", label: "Alertas", icon: BellRing },
  { href: "/analytics", label: "Analítica", icon: BarChart3 }
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 border-r bg-white lg:block">
      <div className="p-5">
        <h1 className="text-base font-semibold">Armando Medialunas</h1>
        <p className="mt-1 text-xs text-muted-foreground">Sistema operativo unificado</p>
      </div>
      <nav className="space-y-1 px-3 pb-4">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
              pathname === href && "bg-muted text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
