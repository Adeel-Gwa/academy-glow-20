import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users, Wifi, Building2, CheckCircle2, XCircle, Clock,
  FileCheck2, ClipboardX, CreditCard, CalendarClock, ArrowRight, Bell, Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { StatCard } from "@/components/stat-card";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dashboardStats, attendanceTrend, slotSummaries, notifications, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Scholaria" },
      { name: "description", content: "Real-time overview of students, attendance, mock tests and fees." },
    ],
  }),
  component: Dashboard,
});

const modeSplit = [
  { name: "Online", value: dashboardStats.online, color: "var(--secondary)" },
  { name: "Physical", value: dashboardStats.physical, color: "var(--primary)" },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <div className="pointer-events-none absolute inset-0 gradient-mesh" />
        <div className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">
              <Sparkles className="mr-1 h-3 w-3" /> Good morning, Anish
            </Badge>
            <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
              Here's what's happening at your school today.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              {dashboardStats.present} of {dashboardStats.total} students are present, {dashboardStats.pendingFees} fees pending and {dashboardStats.weeklyMocks} mock tests scheduled this week.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <Link to="/attendance"><Button className="gradient-primary rounded-full text-primary-foreground shadow-elegant">Mark Attendance <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
            <Link to="/reports"><Button variant="outline" className="rounded-full">View Reports</Button></Link>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Total Students" value={dashboardStats.total} icon={Users} tone="primary" trend={{ value: 4.2, positive: true }} />
        <StatCard label="Online Students" value={dashboardStats.online} icon={Wifi} tone="info" trend={{ value: 2.1, positive: true }} />
        <StatCard label="Physical Students" value={dashboardStats.physical} icon={Building2} tone="primary" trend={{ value: 1.2, positive: true }} />
        <StatCard label="Present Today" value={dashboardStats.present} icon={CheckCircle2} tone="success" hint={`${Math.round((dashboardStats.present / dashboardStats.total) * 100)}% attendance rate`} />
        <StatCard label="Absent Today" value={dashboardStats.absent} icon={XCircle} tone="danger" trend={{ value: 1.4, positive: false }} />
        <StatCard label="Late Today" value={dashboardStats.late} icon={Clock} tone="warning" />
        <StatCard label="Weekly Mock Tests" value={dashboardStats.weeklyMocks} icon={FileCheck2} tone="info" hint="Mon · Wed · Fri" />
        <StatCard label="Missed Mock Tests" value={dashboardStats.missedMocks} icon={ClipboardX} tone="danger" trend={{ value: 1.1, positive: false }} />
        <StatCard label="Pending Fees" value={dashboardStats.pendingFees} icon={CreditCard} tone="warning" hint={currency(dashboardStats.totalPending) + " outstanding"} />
        <StatCard label="Fees Due Today" value={dashboardStats.dueToday} icon={CalendarClock} tone="danger" />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold">Weekly Attendance</h3>
              <p className="text-xs text-muted-foreground">Present vs absent across last 6 days</p>
            </div>
            <Badge variant="outline" className="rounded-full">This Week</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--destructive)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--destructive)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="present" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g1)" />
                <Area type="monotone" dataKey="absent" stroke="var(--destructive)" strokeWidth={2} fill="url(#g2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base font-semibold">Student Mode Split</h3>
          <p className="text-xs text-muted-foreground">Online vs physical batches</p>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={modeSplit} innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                  {modeSplit.map((e, i) => <Cell key={i} fill={e.color} stroke="var(--card)" strokeWidth={3} />)}
                </Pie>
                <Legend iconType="circle" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Active Slots Today</h3>
            <Link to="/slots"><Button variant="ghost" size="sm" className="rounded-full">View all <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {slotSummaries.slice(0, 4).map((s) => (
              <div key={s.id} className="group rounded-xl border border-border bg-background/50 p-4 transition hover:border-primary/40 hover:shadow-soft">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{s.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.teacher} · {s.timing}</div>
                  </div>
                  <Badge className={s.mode === "Online" ? "bg-info/10 text-info hover:bg-info/15" : "bg-primary/10 text-primary hover:bg-primary/15"}>{s.mode}</Badge>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <div className="text-2xl font-bold">{s.attendance}%</div>
                    <div className="text-[11px] text-muted-foreground">{s.count} students</div>
                  </div>
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
                    <div className="h-full gradient-primary" style={{ width: `${s.attendance}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold">Recent Notifications</h3>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
          <ul className="space-y-3">
            {notifications.slice(0, 5).map((n) => {
              const toneBg = n.type === "danger" ? "bg-destructive/10 text-destructive" : n.type === "warning" ? "bg-warning/15 text-warning" : n.type === "success" ? "bg-success/10 text-success" : "bg-info/10 text-info";
              return (
                <li key={n.id} className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-muted/60">
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${toneBg}`}>
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium leading-snug">{n.title}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">{n.time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
