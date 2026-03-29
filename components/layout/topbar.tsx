import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-4 py-3 lg:px-6">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-8" placeholder="Buscar pedidos, clientes, incidencias..." />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Bell className="h-4 w-4" />
          4 alertas activas
        </div>
      </div>
    </header>
  );
}
