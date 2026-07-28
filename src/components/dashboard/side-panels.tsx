import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useErp } from "@/lib/erp-context";
import { activities } from "@/lib/erp-data";
import { formatCurrency, formatNumber, relativeTime } from "@/lib/format";

export function PortfolioStats() {
  const { projects, workOrders, inspectionRequests, ipcs, materialRequests, boqItems } = useErp();

  const stats = [
    { label: "Projects", value: projects.length },
    { label: "Active", value: projects.filter((p) => p.status === "active").length },
    { label: "Work orders", value: workOrders.length },
    { label: "BOQ items", value: boqItems.length },
    { label: "Inspections", value: inspectionRequests.length },
    { label: "IPCs raised", value: ipcs.length },
    { label: "Material reqs", value: materialRequests.length },
    { label: "Contractors", value: new Set(workOrders.map((w) => w.contractor)).size },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Portfolio Stats</CardTitle>
        <CardDescription>Current filter scope</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-border">
        {stats.map((s) => (
          <div key={s.label} className="bg-card p-3">
            <p className="font-display text-xl font-bold tabular">{formatNumber(s.value)}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ApprovalsPanel() {
  const { approvals } = useErp();

  return (
    <Card className="gap-0 pb-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Approvals Pending</CardTitle>
            <CardDescription>Waiting on your action</CardDescription>
          </div>
          <Badge variant="secondary" className="tabular">
            {approvals.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <ul className="divide-y divide-border">
          {approvals.slice(0, 6).map((a) => (
            <li key={a.id}>
              <Link
                to={a.href}
                className="flex items-center gap-2 rounded-md px-2 py-2.5 transition-colors hover:bg-accent"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.reference}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.type} · {a.requestedBy} · {a.age}
                  </p>
                </div>
                {a.amount ? (
                  <span className="text-xs font-medium tabular">{formatCurrency(a.amount, true)}</span>
                ) : null}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
        <Button asChild variant="ghost" size="sm" className="mt-1 w-full">
          <Link to="/approvals">Open approvals inbox</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recent Activity</CardTitle>
        <CardDescription>Latest portal events</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-4 border-l border-border pl-4">
          {activities.slice(0, 8).map((a) => (
            <li key={a.id} className="relative">
              <span className="absolute top-1.5 -left-[21px] size-2 rounded-full bg-primary" />
              <p className="text-sm">
                <span className="font-medium">{a.actor}</span>{" "}
                <span className="text-muted-foreground">{a.action}</span> {a.target}
              </p>
              <p className="text-xs text-muted-foreground">{relativeTime(a.at)}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
