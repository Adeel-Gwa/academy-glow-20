import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, CalendarClock, AlertCircle, TrendingUp, Bell, FileDown } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, currency, dashboardStats, feeCollection } from "@/lib/mock-data";
import { AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/fees")({
  head: () => ({ meta: [{ title: "Fee Management · Scholaria" }] }),
  component: FeesPage,
});

function statusOf(paid: number, total: number, dueDate: string): { label: string; cls: string } {
  const today = new Date().toISOString().slice(0, 10);
  if (paid >= total) return { label: "Paid", cls: "bg-success/10 text-success hover:bg-success/15" };
  if (dueDate < today) return { label: "Overdue", cls: "bg-destructive/10 text-destructive hover:bg-destructive/15" };
  if (dueDate === today) return { label: "Due Today", cls: "bg-warning/15 text-warning hover:bg-warning/20" };
  return { label: "Pending", cls: "bg-muted text-muted-foreground" };
}

function FeesPage() {
  return (
    <div>
      <PageHeader
        title="Fee Management"
        subtitle="Collections, dues and reminders"
        actions={<Button variant="outline" className="rounded-full"><FileDown className="mr-2 h-4 w-4" />Export</Button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Collected" value={currency(dashboardStats.totalCollected)} icon={TrendingUp} tone="success" trend={{ value: 12.4, positive: true }} />
        <StatCard label="Pending Fees" value={currency(dashboardStats.totalPending)} icon={CreditCard} tone="warning" />
        <StatCard label="Due Today" value={dashboardStats.dueToday} icon={CalendarClock} tone="info" />
        <StatCard label="Overdue" value={dashboardStats.overdue} icon={AlertCircle} tone="danger" trend={{ value: 2.1, positive: false }} />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h3 className="text-base font-semibold">Fee Collection Trend</h3>
        <p className="text-xs text-muted-foreground">Collected vs pending across 6 months</p>
        <div className="mt-4 h-64">
          <ResponsiveContainer>
            <AreaChart data={feeCollection}>
              <defs>
                <linearGradient id="fg1" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--success)" stopOpacity={0.5}/><stop offset="95%" stopColor="var(--success)" stopOpacity={0}/></linearGradient>
                <linearGradient id="fg2" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--warning)" stopOpacity={0.5}/><stop offset="95%" stopColor="var(--warning)" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => currency(v)} />
              <Area type="monotone" dataKey="collected" stroke="var(--success)" strokeWidth={2.5} fill="url(#fg1)" />
              <Area type="monotone" dataKey="pending" stroke="var(--warning)" strokeWidth={2.5} fill="url(#fg2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">Student Fees</h3>
          <p className="text-xs text-muted-foreground">Individual fee status & reminders</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.slice(0, 12).map(s => {
              const st = statusOf(s.paid, s.totalFee, s.dueDate);
              const remaining = s.totalFee - s.paid;
              return (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={s.photo} /><AvatarFallback>{s.name[0]}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.roll}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{currency(s.totalFee)}</TableCell>
                  <TableCell className="font-medium text-success">{currency(s.paid)}</TableCell>
                  <TableCell className="font-medium">{currency(remaining)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.dueDate}</TableCell>
                  <TableCell><Badge className={`rounded-full ${st.cls}`}>{st.label}</Badge></TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" className="rounded-full" disabled={st.label === "Paid"}><Bell className="mr-1 h-3.5 w-3.5" />Remind</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
