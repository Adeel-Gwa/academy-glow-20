import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, LayoutGrid, ClipboardCheck, Activity,
  FileCheck2, CreditCard, Bell, BarChart3, Settings, GraduationCap,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Students", url: "/students", icon: Users },
  { title: "Student Slots", url: "/slots", icon: LayoutGrid },
  { title: "Attendance", url: "/attendance", icon: ClipboardCheck },
  { title: "Daily Activities", url: "/activities", icon: Activity },
  { title: "Mock Tests", url: "/mock-tests", icon: FileCheck2 },
  { title: "Fee Management", url: "/fees", icon: CreditCard },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (u: string) => (u === "/" ? pathname === "/" : pathname.startsWith(u));

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 px-2 py-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl gradient-primary shadow-elegant">
            <GraduationCap className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0 leading-tight">
              <div className="truncate text-base font-bold tracking-tight">Scholaria</div>
              <div className="truncate text-[11px] text-muted-foreground">School Admin Suite</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest">Workspace</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.title} className="h-10 rounded-xl data-[active=true]:gradient-primary data-[active=true]:text-primary-foreground data-[active=true]:shadow-elegant">
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="h-[18px] w-[18px] shrink-0" />
                        {!collapsed && <span className="truncate font-medium">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="glass-card rounded-2xl p-3">
            <div className="text-xs font-semibold">Academic Year</div>
            <div className="text-lg font-bold tracking-tight text-primary">2025 – 2026</div>
            <div className="mt-1 text-[11px] text-muted-foreground">Term 2 · Week 14</div>
          </div>
        ) : (
          <div className="grid h-9 place-items-center rounded-xl bg-accent text-accent-foreground text-xs font-bold">T2</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
