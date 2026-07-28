import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatDate, formatNumber } from "@/lib/format";
import type { MaterialRequest } from "@/lib/erp-data";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Materials — EZY PM" },
      {
        name: "description",
        content: "Material requests, required-by dates and approval status across every construction site.",
      },
      { property: "og:title", content: "Materials — EZY PM" },
      { property: "og:description", content: "Material requisitions and site stock movement." },
    ],
  }),
  component: MaterialsPage,
});

function MaterialsPage() {
  const { materialRequests, allProjects } = useErp();
  const code = (id: string) => allProjects.find((p) => p.id === id)?.code ?? "—";

  const columns: Column<MaterialRequest>[] = [
    { key: "id", header: "MR No.", cell: (r) => <span className="font-medium uppercase">{r.id}</span> },
    { key: "project", header: "Project", cell: (r) => code(r.projectId) },
    { key: "material", header: "Material", cell: (r) => r.material },
    { key: "qty", header: "Qty", align: "right", cell: (r) => `${formatNumber(r.qty)} ${r.unit}` },
    { key: "need", header: "Need by", cell: (r) => formatDate(r.needBy) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (r: MaterialRequest) => boolean) => (
    <DataTable columns={columns} rows={materialRequests.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Materials"
      description="Requisitions, deliveries and site stock"
      action="New material request"
      tabs={[
        { value: "all", label: `All (${materialRequests.length})`, content: view(() => true) },
        { value: "pending", label: "Pending", content: view((r) => r.status === "pending") },
        { value: "approved", label: "Approved", content: view((r) => r.status === "approved") },
        { value: "rejected", label: "Rejected", content: view((r) => r.status === "rejected") },
      ]}
    />
  );
}
