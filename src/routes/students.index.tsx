import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Filter, Plus, Search } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/students/")({
  head: () => ({ meta: [{ title: "Students · Scholaria" }, { name: "description", content: "Manage all enrolled students." }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<string>("all");
  const filtered = useMemo(() => students.filter(s => (mode === "all" || s.mode === mode) && (s.name.toLowerCase().includes(q.toLowerCase()) || s.roll.includes(q))), [q, mode]);

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} enrolled across 5 batches`}
        actions={<>
          <Button variant="outline" className="rounded-full"><Download className="mr-2 h-4 w-4" />Export</Button>
          <Button className="gradient-primary rounded-full text-primary-foreground shadow-elegant"><Plus className="mr-2 h-4 w-4" />Add Student</Button>
        </>}
      />
      <div className="rounded-2xl border border-border bg-card shadow-soft">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border p-4 md:flex md:flex-wrap">
          <div className="relative min-w-0 md:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or roll…" className="h-10 rounded-full bg-muted pl-10" />
          </div>
          <Select value={mode} onValueChange={setMode}>
            <SelectTrigger className="h-10 w-full rounded-full md:w-40"><Filter className="mr-2 h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modes</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Physical">Physical</SelectItem>
            </SelectContent>
          </Select>
          <div className="ml-auto text-xs text-muted-foreground">{filtered.length} results</div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Roll</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.slice(0, 20).map(s => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarImage src={s.photo} /><AvatarFallback>{s.name[0]}</AvatarFallback></Avatar>
                    <div className="min-w-0">
                      <div className="truncate font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">{s.parent}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{s.roll}</TableCell>
                <TableCell className="text-sm">{s.slot}</TableCell>
                <TableCell>
                  <Badge className={s.mode === "Online" ? "bg-info/10 text-info hover:bg-info/15" : "bg-primary/10 text-primary hover:bg-primary/15"}>{s.mode}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                      <div className={`h-full ${s.attendanceRate >= 85 ? "gradient-success" : s.attendanceRate >= 75 ? "gradient-warning" : "gradient-danger"}`} style={{ width: `${s.attendanceRate}%` }} />
                    </div>
                    <span className="text-xs font-medium">{s.attendanceRate}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">{currency(s.paid)}<span className="text-muted-foreground">/{currency(s.totalFee)}</span></div>
                </TableCell>
                <TableCell className="text-right">
                  <Link to="/students/$id" params={{ id: s.id }}><Button variant="ghost" size="sm" className="rounded-full">View</Button></Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
