import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { Card, CardContent } from "@/components/ui/card";
import { hseStats } from "@/lib/erp-data";
import { formatDate, formatNumber } from "@/lib/format";

type Incident = {
  id: string;
  ref: string;
  description: string;
  site: string;
  severity: "Low" | "Medium" | "High";
  reported: string;
  status: StatusKey;
};

const incidents: Incident[] = [
  { id: "h1", ref: "HSE-0121", description: "Near miss — unsecured scaffold plank", site: "Riyadh North", severity: "Medium", reported: "2026-07-26", status: "active" },
  { id: "h2", ref: "HSE-0122", description: "First aid — minor hand laceration", site: "Jeddah Port", severity: "Low", reported: "2026-07-24", status: "completed" },
  { id: "h3", ref: "HSE-0123", description: "Housekeeping violation — material storage", site: "Dammam Industrial", severity: "Low", reported: "2026-07-22", status: "active" },
  { id: "h4", ref: "HSE-0118", description: "Excavation edge protection missing", site: "Riyadh North", severity: "High", reported: "2026-07-15", status: "completed" },
  { id: "h5", ref: "HSE-0124", description: "Environmental — dust suppression lapse", site: "Dammam Industrial", severity: "Medium", reported: "2026-07-27", status: "pending" },
];

const tiles = [
  { label: "Safe man-hours", value: formatNumber(hseStats.loggedHours) },
  { label: "LTI-free days", value: formatNumber(hseStats.ltiFreeDays) },
  { label: "Observations", value: formatNumber(hseStats.observations) },
  { label: "Open incidents", value: formatNumber(hseStats.openIncidents) },
  { label: "Inductions", value: formatNumber(hseStats.inductions) },
  { label: "Audits", value: formatNumber(hseStats.audits) },
];

export const Route = createFileRoute("/hse")({
  head: () => ({
    meta: [
      { title: "HSE & Environment — EZY PM" },
      {
        name: "description",
        content: "Safe man-hours, LTI-free days, observations and open incidents across all sites.",
      },
      { property: "og:title", content: "HSE & Environment — EZY PM" },
      { property: "og:description", content: "Site safety and environmental performance." },
    ],
  }),
  component: HsePage,
});

function HsePage() {
  const columns: Column<Incident>[] = [
    { key: "ref", header: "Reference", cell: (r) => <span className="font-medium">{r.ref}</span> },
    { key: "desc", header: "Description", cell: (r) => r.description },
    { key: "site", header: "Site", cell: (r) => r.site },
    { key: "sev", header: "Severity", cell: (r) => r.severity },
    { key: "rep", header: "Reported", cell: (r) => formatDate(r.reported) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];
  const view = (f: (i: Incident) => boolean) => <DataTable columns={columns} rows={incidents.filter(f)} />;

  return (
    <ModuleScaffold
      title="HSE & Environment"
      description="Safety performance and open incident register"
      action="Report incident"
      tabs={[
        { value: "all", label: `All (${incidents.length})`, content: view(() => true) },
        { value: "open", label: "Open", content: view((i) => i.status !== "completed") },
        { value: "closed", label: "Closed", content: view((i) => i.status === "completed") },
        { value: "high", label: "High Severity", content: view((i) => i.severity === "High") },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <Card key={t.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">{t.label}</p>
              <p className="tabular mt-1 text-xl font-semibold">{t.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ModuleScaffold>
  );
}
