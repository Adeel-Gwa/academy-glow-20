export type Mode = "Online" | "Physical";
export type Status = "Present" | "Absent" | "Late" | "Leave";

export interface Student {
  id: string;
  name: string;
  roll: string;
  slot: string;
  mode: Mode;
  photo: string;
  parent: string;
  contact: string;
  totalFee: number;
  paid: number;
  dueDate: string;
  attendanceRate: number;
  mockAvg: number;
}

const first = ["Aarav","Vivaan","Aditya","Arjun","Sai","Reyansh","Krishna","Ishaan","Rohan","Kabir","Ananya","Diya","Saanvi","Aadhya","Kiara","Myra","Anika","Navya","Riya","Zara"];
const last = ["Sharma","Verma","Kapoor","Iyer","Nair","Menon","Rao","Patel","Reddy","Khan","Shah","Bose","Das","Ghosh","Mehta"];
const slots = ["Online Slot A","Online Slot B","Physical Slot A","Physical Slot B","Physical Slot C"];

function rng(seed: number) { let s = seed; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
const r = rng(42);

export const students: Student[] = Array.from({ length: 48 }).map((_, i) => {
  const name = `${first[i % first.length]} ${last[i % last.length]}`;
  const slot = slots[i % slots.length];
  const total = 45000;
  const paid = [45000, 30000, 15000, 45000, 0, 22500, 45000, 40000][i % 8];
  const daysOffset = (i % 30) - 10;
  const due = new Date();
  due.setDate(due.getDate() + daysOffset);
  return {
    id: `stu-${(i + 1).toString().padStart(3, "0")}`,
    name,
    roll: `R${(2024000 + i + 1)}`,
    slot,
    mode: slot.startsWith("Online") ? "Online" : "Physical",
    photo: `https://i.pravatar.cc/128?img=${(i % 70) + 1}`,
    parent: `${last[(i + 3) % last.length]} Family`,
    contact: `+91 9${(800000000 + i * 137).toString().slice(0, 9)}`,
    totalFee: total,
    paid,
    dueDate: due.toISOString().slice(0, 10),
    attendanceRate: 72 + Math.floor(r() * 28),
    mockAvg: 55 + Math.floor(r() * 40),
  };
});

export const slotSummaries = [
  { id: "online-a", name: "Online Slot A", mode: "Online" as Mode, count: 35, timing: "07:00 – 09:00 AM", teacher: "Ms. Priya Sharma", attendance: 92, status: "Active" },
  { id: "online-b", name: "Online Slot B", mode: "Online" as Mode, count: 28, timing: "05:00 – 07:00 PM", teacher: "Mr. Rahul Verma", attendance: 88, status: "Active" },
  { id: "physical-a", name: "Physical Slot A", mode: "Physical" as Mode, count: 32, timing: "08:00 – 11:00 AM", teacher: "Ms. Anjali Kapoor", attendance: 95, status: "Active" },
  { id: "physical-b", name: "Physical Slot B", mode: "Physical" as Mode, count: 30, timing: "12:00 – 03:00 PM", teacher: "Mr. Sanjay Iyer", attendance: 84, status: "Pending" },
  { id: "physical-c", name: "Physical Slot C", mode: "Physical" as Mode, count: 26, timing: "04:00 – 07:00 PM", teacher: "Ms. Neha Nair", attendance: 90, status: "Active" },
];

export const dashboardStats = {
  total: students.length,
  online: students.filter(s => s.mode === "Online").length,
  physical: students.filter(s => s.mode === "Physical").length,
  present: 42, absent: 3, late: 2, leave: 1,
  weeklyMocks: 3, missedMocks: 5,
  pendingFees: students.filter(s => s.paid < s.totalFee).length,
  dueToday: 4,
  totalCollected: students.reduce((a, s) => a + s.paid, 0),
  totalPending: students.reduce((a, s) => a + (s.totalFee - s.paid), 0),
  overdue: 7,
};

export const attendanceTrend = [
  { day: "Mon", present: 44, absent: 4 },
  { day: "Tue", present: 46, absent: 2 },
  { day: "Wed", present: 41, absent: 7 },
  { day: "Thu", present: 45, absent: 3 },
  { day: "Fri", present: 47, absent: 1 },
  { day: "Sat", present: 40, absent: 8 },
];

export const monthlyAttendance = [
  { month: "Jan", rate: 88 },{ month: "Feb", rate: 91 },{ month: "Mar", rate: 87 },
  { month: "Apr", rate: 93 },{ month: "May", rate: 90 },{ month: "Jun", rate: 94 },
  { month: "Jul", rate: 92 },{ month: "Aug", rate: 89 },{ month: "Sep", rate: 95 },
];

export const feeCollection = [
  { month: "Apr", collected: 320000, pending: 60000 },
  { month: "May", collected: 410000, pending: 40000 },
  { month: "Jun", collected: 380000, pending: 55000 },
  { month: "Jul", collected: 440000, pending: 35000 },
  { month: "Aug", collected: 465000, pending: 30000 },
  { month: "Sep", collected: 495000, pending: 25000 },
];

export const mockTests = [
  { id: "mt1", name: "Mock Test 1", subject: "Quant Aptitude", date: "Mon", participants: 45, avg: 72, high: 96, low: 41 },
  { id: "mt2", name: "Mock Test 2", subject: "Verbal Reasoning", date: "Wed", participants: 43, avg: 68, high: 92, low: 38 },
  { id: "mt3", name: "Mock Test 3", subject: "Logical Reasoning", date: "Fri", participants: 40, avg: 75, high: 98, low: 44 },
];

export const missedMocks = [
  { student: students[4], test: "Mock Test 2", totalMissed: 3 },
  { student: students[7], test: "Mock Test 1", totalMissed: 2 },
  { student: students[12], test: "Mock Test 3", totalMissed: 1 },
  { student: students[18], test: "Mock Test 2", totalMissed: 4 },
  { student: students[22], test: "Mock Test 1", totalMissed: 2 },
];

export const activities = [
  { id: "breakfast", name: "Breakfast", icon: "utensils", completed: 40, pending: 8, note: "Served in Hall B" },
  { id: "warmup", name: "Warm-up Activity", icon: "activity", completed: 36, pending: 12, note: "Yoga & stretching" },
  { id: "assembly", name: "Morning Assembly", icon: "megaphone", completed: 46, pending: 2, note: "Speaker: Principal" },
  { id: "revision", name: "Evening Revision", icon: "book-open", completed: 32, pending: 16, note: "Focus: Mock Test 2" },
];

export const notifications = [
  { id: 1, type: "danger", icon: "credit-card", title: "3 students have fees due today", time: "5m ago" },
  { id: 2, type: "warning", icon: "clipboard-x", title: "Rohan Iyer missed Mock Test 2", time: "22m ago" },
  { id: 3, type: "info", icon: "clipboard-list", title: "Online Slot A attendance not marked", time: "1h ago" },
  { id: 4, type: "info", icon: "clipboard-list", title: "Physical Slot B attendance pending", time: "2h ago" },
  { id: 5, type: "warning", icon: "utensils", title: "Breakfast record incomplete (8 students)", time: "3h ago" },
  { id: 6, type: "warning", icon: "activity", title: "Warm-up activity pending for Slot C", time: "4h ago" },
  { id: 7, type: "danger", icon: "trending-down", title: "Weekly attendance below 75% for 2 students", time: "6h ago" },
  { id: 8, type: "success", icon: "check-circle-2", title: "Physical Slot A attendance saved", time: "yesterday" },
];

export function currency(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}
