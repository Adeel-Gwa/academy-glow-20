import { createFileRoute } from "@tanstack/react-router";
import { Bell, CreditCard, ClipboardList, ClipboardX, Utensils, Activity, TrendingDown, CheckCircle2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";

const iconMap: Record<string, any> = {
  "credit-card": CreditCard, "clipboard-list": ClipboardList, "clipboard-x": ClipboardX,
  utensils: Utensils, activity: Activity, "trending-down": TrendingDown, "check-circle-2": CheckCircle2, bell: Bell,
};
const toneMap: Record<string, string> = {
  danger: "bg-destructive/10 text-destructive",
  warning: "bg-warning/15 text-warning",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
};

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications · Scholaria" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <div>
      <PageHeader
        title="Notification Center"
        subtitle="Automatically generated alerts across the school"
        actions={<Button variant="outline" className="rounded-full">Mark all read</Button>}
      />
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <ul className="divide-y divide-border">
          {notifications.map(n => {
            const Icon = iconMap[n.icon] ?? Bell;
            return (
              <li key={n.id} className="flex items-start gap-4 p-4 transition hover:bg-muted/40">
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${toneMap[n.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{n.title}</span>
                    <Badge variant="outline" className="rounded-full text-[10px] uppercase">{n.type}</Badge>
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{n.time}</div>
                </div>
                <Button size="sm" variant="ghost" className="rounded-full">View</Button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
