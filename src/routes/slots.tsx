import { createFileRoute } from "@tanstack/react-router";
import { Wifi, Building2, Users, Clock, User, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { slotSummaries } from "@/lib/mock-data";

export const Route = createFileRoute("/slots")({
  head: () => ({ meta: [{ title: "Student Slots · Scholaria" }] }),
  component: SlotsPage,
});

function SlotsPage() {
  return (
    <div>
      <PageHeader
        title="Student Slots"
        subtitle="Batches, timings and current occupancy"
        actions={<Button className="gradient-primary rounded-full text-primary-foreground shadow-elegant"><Plus className="mr-2 h-4 w-4" />New Slot</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {slotSummaries.map(s => {
          const Icon = s.mode === "Online" ? Wifi : Building2;
          const grad = s.mode === "Online" ? "gradient-info" : "gradient-primary";
          return (
            <div key={s.id} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elegant">
              <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl ${grad}`} />
              <div className="relative flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-xl text-white shadow-soft ${grad}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <Badge className={s.status === "Active" ? "bg-success/10 text-success hover:bg-success/15" : "bg-warning/15 text-warning hover:bg-warning/20"}>{s.status}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{s.name}</h3>
              <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-primary" />{s.teacher}</div>
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />{s.timing}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />{s.count} students enrolled</div>
              </div>
              <div className="mt-5 rounded-xl bg-muted/60 p-3">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Attendance today</span>
                  <span className="font-bold text-foreground">{s.attendance}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
                  <div className={`h-full ${grad}`} style={{ width: `${s.attendance}%` }} />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full">View Students</Button>
                <Button size="sm" className="flex-1 gradient-primary rounded-full text-primary-foreground">Mark Attendance</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
