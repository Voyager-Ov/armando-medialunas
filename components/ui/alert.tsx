import { cn } from "@/lib/utils";

export function Alert({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-lg border border-border bg-card p-3", className)}>{children}</div>;
}
