import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Calendar, Check, X, Clock as ClockIcon, Circle, Search, FileDown, FileSpreadsheet, Save, CheckCheck } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, slotSummaries, type Status } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/attendance")({
  head: () => ({ meta: [{ title: "Attendance · Scholaria" }] }),
  component: AttendancePage,
});

const statusMeta: Record<Status, { icon: any; label: string; cls: string; active: string }> = {
  Present: { icon: Check,     label: "Present", cls: "text-success",     active: "bg-success text-success-foreground border-success" },
  Absent:  { icon: X,         label: "Absent",  cls: "text-destructive", active: "bg-destructive text-destructive-foreground border-destructive" },
  Late:    { icon: ClockIcon, label: "Late",    cls: "text-warning",     active: "bg-warning text-warning-foreground border-warning" },
  Leave:   { icon: Circle,    label: "Leave",   cls: "text-info",        active: "bg-info text-info-foreground border-info" },
};

function AttendancePage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [slot, setSlot] = useState<string>("all");
  const [q, setQ] = useState("");
  const [marks, setMarks] = useState<Record<string, Status>>(() =>
    Object.fromEntries(students.map(s => [s.id, "Present" as Status]))
  );

  const list = useMemo(() => students.filter(s => (slot === "all" || s.slot === slot) && s.name.toLowerCase().includes(q.toLowerCase())), [slot, q]);

  const counts = useMemo(() => {
    const c: Record<Status, number> = { Present: 0, Absent: 0, Late: 0, Leave: 0 };
    list.forEach(s => c[marks[s.id]]++);
    return c;
  }, [list, marks]);

  const total = list.length || 1;
  const rate = Math.round((counts.Present / total) * 100);

  const setAll = (st: Status) => setMarks(m => ({ ...m, ...Object.fromEntries(list.map(s => [s.id, st])) }));

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle="Mark, review and export daily attendance"
        actions={<>
          <Button variant="outline" className="rounded-full"><FileDown className="mr-2 h-4 w-4" />PDF</Button>
          <Button variant="outline" className="rounded-full"><FileSpreadsheet className="mr-2 h-4 w-4" />Excel</Button>
          <Button className="gradient-primary rounded-full text-primary-foreground shadow-elegant" onClick={() => toast.success("Attendance saved successfully")}><Save className="mr-2 h-4 w-4" />Save</Button>
        </>}
      />

      {/* Filters */}
      <div className="mb-4 grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft md:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted-foreground">Attendance Date</label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-10 rounded-full pl-10" />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted-foreground">Slot</label>
          <Select value={slot} onValueChange={setSlot}>
            <SelectTrigger className="h-10 rounded-full"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All slots</SelectItem>
              {slotSummaries.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-muted-foreground">Search Student</label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name…" className="h-10 rounded-full pl-10" />
          </div>
        </div>
        <div className="flex items-end gap-2">
          <Button variant="outline" className="flex-1 rounded-full" onClick={() => setAll("Present")}><CheckCheck className="mr-2 h-4 w-4" />All Present</Button>
          <Button variant="outline" className="flex-1 rounded-full" onClick={() => setAll("Absent")}>All Absent</Button>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2 md:grid-cols-5">
        {(["Present", "Absent", "Late", "Leave"] as Status[]).map(k => {
          const m = statusMeta[k];
          return (
            <div key={k} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <div className={cn("grid h-9 w-9 place-items-center rounded-lg", m.cls, "bg-current/10")}>
                  <m.icon className={cn("h-4 w-4", m.cls)} />
                </div>
                <span className="text-2xl font-bold">{counts[k]}</span>
              </div>
              <div className="mt-2 text-xs font-medium text-muted-foreground">{m.label}</div>
            </div>
          );
        })}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft gradient-primary text-primary-foreground">
          <div className="text-xs font-medium opacity-80">Attendance Rate</div>
          <div className="mt-2 text-3xl font-bold">{rate}%</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.slice(0, 15).map(s => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={s.photo} /><AvatarFallback>{s.name[0]}</AvatarFallback></Avatar>
                    <span className="font-medium">{s.name}</span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{s.roll}</TableCell>
                <TableCell className="text-sm">{s.slot}</TableCell>
                <TableCell><Badge variant="outline" className="rounded-full text-xs">{s.mode}</Badge></TableCell>
                <TableCell>
                  <div className="inline-flex overflow-hidden rounded-full border border-border">
                    {(["Present", "Absent", "Late", "Leave"] as Status[]).map(st => {
                      const m = statusMeta[st];
                      const active = marks[s.id] === st;
                      return (
                        <button
                          key={st}
                          onClick={() => setMarks(prev => ({ ...prev, [s.id]: st }))}
                          className={cn("border-l border-border first:border-l-0 px-2.5 py-1.5 text-xs font-semibold transition", active ? m.active : "text-muted-foreground hover:bg-muted")}
                          aria-label={`${st} for ${s.name}`}
                          title={st}
                        >
                          <m.icon className="h-3.5 w-3.5" />
                        </button>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell><Input placeholder="Add remark…" className="h-9 rounded-full" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
