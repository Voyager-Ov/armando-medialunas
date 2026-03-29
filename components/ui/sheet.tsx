"use client";

export function Sheet({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/25">
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
          <button className="text-xs text-muted-foreground" onClick={onClose}>Cerrar</button>
        </div>
        {children}
      </aside>
    </div>
  );
}
