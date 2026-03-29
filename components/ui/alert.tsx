import { cn } from "@/lib/utils";
import type React from "react";

export function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-lg border border-slate-200 bg-white p-3", className)} {...props} />;
}
