import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Activity, Megaphone, BookOpen, CheckCircle2, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { activities } from "@/lib/mock-data";

export const Route = createFileRoute("/activities")({
  head: () => ({ meta: [{ title: "Daily Activities · Scholaria" }] }),
  component: ActivitiesPage,
});

const iconMap: Record<string, any> = { utensils: Utensils, activity: Activity, megaphone: Megaphone, "book-open": BookOpen };

function ActivitiesPage() {
  return (
    <div>
      <PageHeader title="Daily Activities" subtitle="Track breakfast, warm-up, assembly and revision" />
      <div className="grid gap-4 md:grid-cols-2">
        {activities.map(a => {
          const Icon = iconMap[a.icon];
          const total = a.completed + a.pending;
          const pct = Math.round((a.completed / total) * 100);
          return (
            <div key={a.id} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-elegant">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{a.name}</h3>
                    <p className="text-xs text-muted-foreground">{a.note}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{pct}%</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Complete</div>
                </div>
              </div>
              <Progress value={pct} className="mt-4 h-2" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><CheckCircle2 className="h-3.5 w-3.5 text-success" />Completed</div>
                  <div className="mt-1 text-xl font-bold text-success">{a.completed}</div>
                </div>
                <div className="rounded-xl border border-border bg-background/50 p-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5 text-warning" />Pending</div>
                  <div className="mt-1 text-xl font-bold text-warning">{a.pending}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full">Teacher Remarks</Button>
                <Button size="sm" className="flex-1 gradient-primary rounded-full text-primary-foreground">Mark Complete</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
