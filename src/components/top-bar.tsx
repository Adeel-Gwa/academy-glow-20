import { Bell, Search, Calendar } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Link } from "@tanstack/react-router";

export function TopBar() {
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short", year: "numeric" });
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl md:px-6">
      <SidebarTrigger className="rounded-full" />
      <div className="relative hidden max-w-md flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search students, batches, tests…" className="h-10 rounded-full border-transparent bg-muted pl-10 focus-visible:bg-background" />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground md:flex">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          {today}
        </div>
        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative rounded-full" aria-label="Notifications">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">7</Badge>
          </Button>
        </Link>
        <ThemeToggle />
        <div className="ml-1 flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="Admin" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <div className="hidden text-left leading-tight sm:block">
            <div className="text-xs font-semibold">Anish Kapoor</div>
            <div className="text-[10px] text-muted-foreground">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
