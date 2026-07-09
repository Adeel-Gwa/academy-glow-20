import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Trophy, TrendingDown, Users, Bell } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTests, missedMocks } from "@/lib/mock-data";

export const Route = createFileRoute("/mock-tests")({
  head: () => ({ meta: [{ title: "Mock Tests · Scholaria" }] }),
  component: MocksPage,
});

function MocksPage() {
  return (
    <div>
      <PageHeader title="Weekly Mock Tests" subtitle="3 tests every week — Monday, Wednesday, Friday" />

      <div className="grid gap-4 md:grid-cols-3">
        {mockTests.map((t, i) => {
          const grads = ["gradient-primary", "gradient-info", "gradient-success"];
          const g = grads[i];
          return (
            <div key={t.id} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-3xl ${g}`} />
              <div className="relative flex items-center justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl text-white shadow-soft ${g}`}>
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <Badge variant="outline" className="rounded-full">{t.date}</Badge>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight">{t.name}</h3>
              <p className="text-xs text-muted-foreground">{t.subject}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Stat label="Participants" value={t.participants} icon={Users} />
                <Stat label="Average" value={t.avg} icon={TrendingDown} />
                <Stat label="Highest" value={t.high} icon={Trophy} tone="success" />
                <Stat label="Lowest" value={t.low} icon={TrendingDown} tone="danger" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h3 className="text-base font-semibold">Mock Test Performance</h3>
          <p className="text-xs text-muted-foreground">Average score comparison</p>
          <div className="mt-4 h-72">
            <ResponsiveContainer>
              <BarChart data={mockTests}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="high" fill="var(--chart-3)" radius={[8,8,0,0]} />
                <Bar dataKey="avg" fill="var(--chart-1)" radius={[8,8,0,0]} />
                <Bar dataKey="low" fill="var(--chart-5)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base font-semibold">Quick Actions</h3>
          <div className="mt-4 space-y-2">
            <Button className="w-full gradient-primary rounded-full text-primary-foreground shadow-elegant">Schedule Test</Button>
            <Button variant="outline" className="w-full rounded-full">Publish Results</Button>
            <Button variant="outline" className="w-full rounded-full">Download Report</Button>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div>
            <h3 className="text-base font-semibold">Missed Mock Test Report</h3>
            <p className="text-xs text-muted-foreground">Auto-generated list of students who missed a test</p>
          </div>
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/15 rounded-full">{missedMocks.length} students</Badge>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Missed Test</TableHead>
              <TableHead>Total Missed</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {missedMocks.map(({ student, test, totalMissed }) => (
              <TableRow key={student.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={student.photo} /><AvatarFallback>{student.name[0]}</AvatarFallback></Avatar>
                    <span className="font-medium">{student.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{student.slot}</TableCell>
                <TableCell><Badge className="rounded-full bg-destructive/10 text-destructive hover:bg-destructive/15">{test}</Badge></TableCell>
                <TableCell><span className="font-bold text-destructive">{totalMissed}</span></TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline" className="rounded-full"><Bell className="mr-1 h-3.5 w-3.5" />Notify</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Stat({ label, value, icon: Icon, tone = "muted" }: { label: string; value: number; icon: any; tone?: "success" | "danger" | "muted" }) {
  const cls = tone === "success" ? "text-success" : tone === "danger" ? "text-destructive" : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-background/50 p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Icon className="h-3 w-3" />{label}</div>
      <div className={`mt-1 text-xl font-bold ${cls}`}>{value}</div>
    </div>
  );
}
