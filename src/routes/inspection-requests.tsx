import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatDate } from "@/lib/format";
import type { InspectionRequest } from "@/lib/erp-data";

export const Route = createFileRoute("/inspection-requests")({
  head: () => ({
    meta: [
      { title: "Inspection Requests — EZY PM" },
      {
        name: "description",
        content: "Raise, track and close quality inspection requests by discipline and inspector.",
      },
      { property: "og:title", content: "Inspection Requests — EZY PM" },
      { property: "og:description", content: "Quality inspections from raised to approved." },
    ],
  }),
  component: IrPage,
});

function IrPage() {
  const { inspectionRequests, allProjects } = useErp();
  const code = (id: string) => allProjects.find((p) => p.id === id)?.code ?? "—";

  const columns: Column<InspectionRequest>[] = [
    { key: "id", header: "IR No.", cell: (r) => <span className="font-medium uppercase">{r.id}</span> },
    { key: "project", header: "Project", cell: (r) => code(r.projectId) },
    { key: "title", header: "Description", cell: (r) => r.title },
    { key: "discipline", header: "Discipline", cell: (r) => r.discipline },
    { key: "inspector", header: "Inspector", cell: (r) => r.inspector },
    { key: "raised", header: "Raised", cell: (r) => formatDate(r.raised) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (r: InspectionRequest) => boolean) => (
    <DataTable columns={columns} rows={inspectionRequests.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Inspection Requests"
      description="Quality checks raised against executed work"
      action="Raise IR"
      tabs={[
        { value: "all", label: `All (${inspectionRequests.length})`, content: view(() => true) },
        { value: "pending", label: "Awaiting Inspection", content: view((r) => r.status === "pending") },
        { value: "approved", label: "Approved", content: view((r) => r.status === "approved") },
        { value: "rejected", label: "Rejected", content: view((r) => r.status === "rejected") },
      ]}
    />
  );
}
