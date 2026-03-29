"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Dialog({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className={cn("w-full max-w-lg rounded-xl border bg-white p-4 shadow-lg")}>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button onClick={onClose} className="text-xs text-muted-foreground">Cerrar</button>
        </div>
        {children}
      </div>
    </div>
  );
}
