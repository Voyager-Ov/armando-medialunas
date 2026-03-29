"use client";

import * as React from "react";
import { Button } from "./button";

export function DropdownMenu({ label = "Acciones", children }: { label?: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setOpen((s) => !s)}>
        {label}
      </Button>
      {open && <div className="absolute right-0 z-10 mt-2 w-44 rounded-md border bg-white p-1 shadow">{children}</div>}
    </div>
  );
}

export function DropdownMenuItem({ children }: { children: React.ReactNode }) {
  return <button className="block w-full rounded px-2 py-1 text-left text-sm hover:bg-muted">{children}</button>;
}
