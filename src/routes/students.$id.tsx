import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Mail, Phone, User, Wifi, Building2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { students, currency, mockTests, monthlyAttendance } from "@/lib/mock-data";

export const Route = createFileRoute("/students/$id")({
  loader: ({ params }) => {
    const s = students.find(st => st.id === params.id);
    if (!s) throw notFound();
    return { student: s };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.student.name ?? "Student"} · Scholaria` }] }),
  component: StudentDetail,
  notFoundComponent: () => <div className="p-8">Student not found. <Link to="/students" className="text-primary underline">Back</Link></div>,
});

function StudentDetail() {
  const { student: s } = Route.useLoaderData();
  const remaining = s.totalFee - s.paid;
  const perfData = monthlyAttendance.map((m, i) => ({ ...m, mock: 60 + ((i * 13 + s.mockAvg) % 35) }));
  return (
    <div>
      <Link to="/students"><Button variant="ghost" size="sm" className="mb-4 rounded-full"><ArrowLeft className="mr-1 h-4 w-4" />Back to students</Button></Link>

      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div className="pointer-events-none absolute inset-0 gradient-mesh" />
        <div className="relative flex flex-wrap items-center gap-5">
          <Avatar className="h-24 w-24 shrink-0 ring-4 ring-primary/20"><AvatarImage src={s.photo} /><AvatarFallback>{s.name[0]}</AvatarFallback></Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{s.name}</h1>
              <Badge className={s.mode === "Online" ? "bg-info/10 text-info hover:bg-info/15" : "bg-primary/10 text-primary hover:bg-primary/15"}>
                {s.mode === "Online" ? <Wifi className="mr-1 h-3 w-3" /> : <Building2 className="mr-1 h-3 w-3" />}
                {s.mode}
              </Badge>
            </div>
            <div className="mt-1 text-sm text-muted-foreground">Roll {s.roll} · {s.slot}</div>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{s.parent}</span>
              <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{s.contact}</span>
              <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />parents@scholaria.io</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-background/70 p-3 text-center">
              <div className="text-lg font-bold">{s.attendanceRate}%</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Attendance</div>
            </div>
            <div className="rounded-xl bg-background/70 p-3 text-center">
              <div className="text-lg font-bold">{s.mockAvg}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mock Avg</div>
            </div>
            <div className="rounded-xl bg-background/70 p-3 text-center">
              <div className="text-lg font-bold">{currency(remaining)}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="rounded-full bg-muted p-1">
          <TabsTrigger value="overview" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">Overview</TabsTrigger>
          <TabsTrigger value="attendance" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">Attendance</TabsTrigger>
          <TabsTrigger value="fees" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">Fees</TabsTrigger>
          <TabsTrigger value="mocks" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">Mock Tests</TabsTrigger>
          <TabsTrigger value="activities" className="rounded-full data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-base font-semibold">Performance Trend</h3>
            <p className="text-xs text-muted-foreground">Attendance rate vs mock test average</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <LineChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Line type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="mock" stroke="var(--success)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="mb-4 text-base font-semibold">Attendance History</h3>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => {
                const state = i % 9 === 3 ? "absent" : i % 11 === 5 ? "late" : "present";
                const cls = state === "present" ? "bg-success/20 text-success" : state === "late" ? "bg-warning/20 text-warning" : "bg-destructive/15 text-destructive";
                return <div key={i} className={`grid aspect-square place-items-center rounded-lg text-xs font-semibold ${cls}`}>{i + 1}</div>;
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="fees" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Total Fee</div><div className="mt-1 text-2xl font-bold">{currency(s.totalFee)}</div></div>
              <div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Paid</div><div className="mt-1 text-2xl font-bold text-success">{currency(s.paid)}</div></div>
              <div className="rounded-xl border border-border p-4"><div className="text-xs text-muted-foreground">Remaining</div><div className="mt-1 text-2xl font-bold text-destructive">{currency(remaining)}</div></div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="mocks" className="mt-4">
          <div className="grid gap-3 md:grid-cols-3">
            {mockTests.map(t => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="text-xs font-medium text-muted-foreground">{t.name}</div>
                <div className="mt-1 text-lg font-semibold">{t.subject}</div>
                <div className="mt-3 text-3xl font-bold">{60 + ((parseInt(s.id.slice(-3)) * 7 + t.avg) % 35)}<span className="text-sm text-muted-foreground">/100</span></div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activities" className="mt-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft text-sm text-muted-foreground">
            Breakfast and warm-up records for the past 30 days are logged automatically. Streak: <span className="font-semibold text-foreground">18 days</span>.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
