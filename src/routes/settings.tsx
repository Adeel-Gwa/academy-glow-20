import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · Scholaria" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="School profile, preferences and integrations" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
          <h3 className="text-base font-semibold">School Profile</h3>
          <div className="mt-5 flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-4 ring-primary/15"><AvatarImage src="https://i.pravatar.cc/128?img=32" /><AvatarFallback>SC</AvatarFallback></Avatar>
            <div>
              <div className="font-semibold">Scholaria Coaching Institute</div>
              <div className="text-xs text-muted-foreground">Established 2014 · Bengaluru</div>
            </div>
            <Button variant="outline" size="sm" className="ml-auto rounded-full">Change Logo</Button>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div><Label>School Name</Label><Input defaultValue="Scholaria Coaching Institute" className="mt-1.5 rounded-full" /></div>
            <div><Label>Contact Email</Label><Input defaultValue="admin@scholaria.io" className="mt-1.5 rounded-full" /></div>
            <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" className="mt-1.5 rounded-full" /></div>
            <div><Label>Academic Year</Label><Input defaultValue="2025 - 2026" className="mt-1.5 rounded-full" /></div>
          </div>
          <Button className="mt-6 gradient-primary rounded-full text-primary-foreground shadow-elegant">Save Changes</Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-base font-semibold">Preferences</h3>
          <div className="mt-5 space-y-4">
            {[
              { label: "Email attendance summaries", def: true },
              { label: "SMS fee reminders", def: true },
              { label: "Weekly mock test recap", def: false },
              { label: "Daily activity digest", def: true },
              { label: "Enable dark mode by default", def: false },
            ].map((p) => (
              <div key={p.label} className="flex items-center justify-between rounded-xl border border-border p-3">
                <span className="text-sm font-medium">{p.label}</span>
                <Switch defaultChecked={p.def} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
