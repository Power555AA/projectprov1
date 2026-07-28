import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatCurrency, formatDate } from "@/lib/format";
import type { WorkOrder } from "@/lib/erp-data";

export const Route = createFileRoute("/work-orders")({
  head: () => ({
    meta: [
      { title: "Work Orders — EZY PM" },
      {
        name: "description",
        content: "Issue, track and approve contractor work orders with values, status and history.",
      },
      { property: "og:title", content: "Work Orders — EZY PM" },
      { property: "og:description", content: "Contractor work orders from draft to approval." },
    ],
  }),
  component: WorkOrdersPage,
});

function WorkOrdersPage() {
  const { workOrders, allProjects } = useErp();
  const code = (id: string) => allProjects.find((p) => p.id === id)?.code ?? "—";

  const columns: Column<WorkOrder>[] = [
    { key: "id", header: "WO No.", cell: (r) => <span className="font-medium uppercase">{r.id}</span> },
    { key: "project", header: "Project", cell: (r) => code(r.projectId) },
    { key: "title", header: "Scope", cell: (r) => r.title },
    { key: "contractor", header: "Contractor", cell: (r) => r.contractor },
    { key: "value", header: "Value", align: "right", cell: (r) => formatCurrency(r.value) },
    { key: "issued", header: "Issued", cell: (r) => formatDate(r.issued) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (w: WorkOrder) => boolean) => (
    <DataTable columns={columns} rows={workOrders.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Work Orders"
      description="Awarded scopes of work, their contractors and approval state"
      action="New work order"
      tabs={[
        { value: "all", label: `All (${workOrders.length})`, content: view(() => true) },
        { value: "draft", label: "Draft", content: view((w) => w.status === "draft") },
        { value: "pending", label: "Submitted", content: view((w) => w.status === "pending") },
        { value: "approved", label: "Approved", content: view((w) => w.status === "approved") },
        { value: "active", label: "In Progress", content: view((w) => w.status === "active") },
      ]}
    />
  );
}
