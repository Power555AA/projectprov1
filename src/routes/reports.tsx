import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart } from "lucide-react";
import { ModuleScaffold } from "@/components/layout/module-scaffold";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const reports = [
  { name: "Monthly Progress Report", detail: "Physical and financial progress per project, with S-curve." },
  { name: "Cost Value Reconciliation", detail: "Contract value versus cost to date and forecast at completion." },
  { name: "IPC Certification Summary", detail: "Gross, retention and net certified per period." },
  { name: "BOQ Execution Report", detail: "Executed quantities against priced bill of quantities." },
  { name: "Inspection Quality Log", detail: "Raised, approved and rejected inspections by discipline." },
  { name: "Material Consumption", detail: "Issued versus consumed stock with balance by site." },
  { name: "HSE Performance", detail: "Man-hours, LTI-free days, observations and incidents." },
  { name: "Approvals Ageing", detail: "Pending approvals by type and waiting time." },
];

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EZY PM" },
      {
        name: "description",
        content: "Generate progress, cost, certification, quality and HSE reports across the portfolio.",
      },
      { property: "og:title", content: "Reports — EZY PM" },
      { property: "og:description", content: "Standard construction reporting pack." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <ModuleScaffold title="Reports" description="Standard reporting pack for the current filter scope" action="Custom report">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.name}>
            <CardContent className="flex items-start gap-3 p-4">
              <span className="rounded-md bg-secondary p-2 text-secondary-foreground">
                <FileBarChart className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{r.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.detail}</p>
                <Button size="sm" variant="outline" className="mt-3 gap-1.5">
                  <Download className="size-3.5" /> Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModuleScaffold>
  );
}
