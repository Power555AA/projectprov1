import { createFileRoute } from "@tanstack/react-router";
import { ModuleScaffold } from "@/components/layout/module-scaffold";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — EZY PM" },
      {
        name: "description",
        content: "Organisation details, currency, retention defaults, approval thresholds and notifications.",
      },
      { property: "og:title", content: "Settings — EZY PM" },
      { property: "og:description", content: "Configure the construction portal." },
    ],
  }),
  component: SettingsPage,
});

const toggles = [
  { label: "Email me when an approval is assigned", on: true },
  { label: "Daily site progress digest", on: true },
  { label: "Alert when an IPC exceeds 14 days pending", on: false },
  { label: "Notify on HSE incident of high severity", on: true },
];

function SettingsPage() {
  return (
    <ModuleScaffold title="Settings" description="Organisation, commercial defaults and notifications" action="Save changes">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Organisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="org">Company name</Label>
              <Input id="org" defaultValue="EZY Contracting Co." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cr">Commercial registration</Label>
              <Input id="cr" defaultValue="1010 442 189" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cur">Reporting currency</Label>
              <Input id="cur" defaultValue="SAR" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commercial defaults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="ret">Retention percentage</Label>
              <Input id="ret" defaultValue="5" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="adv">Advance payment percentage</Label>
              <Input id="adv" defaultValue="8" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="thr">Approval threshold (single approver)</Label>
              <Input id="thr" defaultValue="500,000" />
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {toggles.map((t, i) => (
              <div key={t.label}>
                {i > 0 && <Separator />}
                <div className="flex items-center justify-between py-3">
                  <span className="text-sm">{t.label}</span>
                  <Switch defaultChecked={t.on} />
                </div>
              </div>
            ))}
            <Button size="sm" className="mt-2">
              Save preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </ModuleScaffold>
  );
}
