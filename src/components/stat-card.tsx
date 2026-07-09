import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "info" | "success" | "warning" | "danger" | "muted";

const toneMap: Record<Tone, { grad: string; text: string; ring: string }> = {
  primary: { grad: "gradient-primary", text: "text-primary", ring: "ring-primary/20" },
  info:    { grad: "gradient-info", text: "text-info", ring: "ring-info/20" },
  success: { grad: "gradient-success", text: "text-success", ring: "ring-success/20" },
  warning: { grad: "gradient-warning", text: "text-warning", ring: "ring-warning/20" },
  danger:  { grad: "gradient-danger", text: "text-destructive", ring: "ring-destructive/20" },
  muted:   { grad: "bg-muted", text: "text-foreground", ring: "ring-border" },
};

export function StatCard({
  label, value, icon: Icon, tone = "primary", trend, hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  tone?: Tone;
  trend?: { value: number; positive?: boolean };
  hint?: string;
}) {
  const t = toneMap[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant">
      <div className={cn("pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl", t.grad)} />
      <div className="flex items-start justify-between">
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl text-white shadow-soft", t.grad)}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold", trend.positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive")}>
            {trend.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
        {hint && <div className="mt-2 text-xs text-muted-foreground/80">{hint}</div>}
      </div>
    </div>
  );
}
