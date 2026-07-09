import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { attendanceTrend, monthlyAttendance, feeCollection, mockTests, dashboardStats, activities, currency } from "@/lib/mock-data";
import { FileDown } from "lucide-react";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports · Scholaria" }] }),
  component: ReportsPage,
});

const modeSplit = [
  { name: "Online", value: dashboardStats.online, color: "var(--secondary)" },
  { name: "Physical", value: dashboardStats.physical, color: "var(--primary)" },
];

function Card({ title, subtitle, children, span }: { title: string; subtitle?: string; children: React.ReactNode; span?: string }) {
  return (
    <div className={`rounded-2xl border border-border bg-card p-6 shadow-soft ${span ?? ""}`}>
      <div className="mb-4">
        <h3 className="text-base font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="h-64">{children}</div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Performance, attendance and financial insights"
        actions={<Button variant="outline" className="rounded-full"><FileDown className="mr-2 h-4 w-4" />Download PDF</Button>}
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Daily Attendance" subtitle="Present vs absent" span="lg:col-span-2">
          <ResponsiveContainer>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="present" fill="var(--primary)" radius={[8,8,0,0]} />
              <Bar dataKey="absent" fill="var(--destructive)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Online vs Physical" subtitle="Enrollment split">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={modeSplit} innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                {modeSplit.map((e, i) => <Cell key={i} fill={e.color} stroke="var(--card)" strokeWidth={3} />)}
              </Pie>
              <Legend iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Monthly Attendance Rate" subtitle="Trailing 9 months" span="lg:col-span-2">
          <ResponsiveContainer>
            <LineChart data={monthlyAttendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Activity Completion" subtitle="Today's checklist">
          <ResponsiveContainer>
            <BarChart data={activities} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={90} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="completed" fill="var(--success)" radius={[0,8,8,0]} />
              <Bar dataKey="pending" fill="var(--warning)" radius={[0,8,8,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Fee Collection" subtitle="Collected vs pending" span="lg:col-span-2">
          <ResponsiveContainer>
            <BarChart data={feeCollection}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} formatter={(v: number) => currency(v)} />
              <Bar dataKey="collected" fill="var(--chart-3)" radius={[8,8,0,0]} />
              <Bar dataKey="pending" fill="var(--chart-4)" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Weekly Mock Performance" subtitle="Avg score per test">
          <ResponsiveContainer>
            <LineChart data={mockTests}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Line type="monotone" dataKey="avg" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="high" stroke="var(--success)" strokeWidth={2} strokeDasharray="4 4" />
              <Line type="monotone" dataKey="low" stroke="var(--destructive)" strokeWidth={2} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
