import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatCurrency } from "@/lib/format";
import type { Ipc } from "@/lib/erp-data";

export const Route = createFileRoute("/ipcs")({
  head: () => ({
    meta: [
      { title: "IPCs — Interim Payment Certificates — EZY PM" },
      {
        name: "description",
        content: "Interim payment certificates with gross value, retention and net payable per project.",
      },
      { property: "og:title", content: "IPCs — EZY PM" },
      { property: "og:description", content: "Certify executed work and track net payable." },
    ],
  }),
  component: IpcPage,
});

function IpcPage() {
  const { ipcs, allProjects } = useErp();
  const code = (id: string) => allProjects.find((p) => p.id === id)?.code ?? "—";

  const columns: Column<Ipc>[] = [
    { key: "no", header: "IPC No.", cell: (r) => <span className="font-medium">IPC-{String(r.no).padStart(2, "0")}</span> },
    { key: "project", header: "Project", cell: (r) => code(r.projectId) },
    { key: "period", header: "Period", cell: (r) => r.period },
    { key: "gross", header: "Gross", align: "right", cell: (r) => formatCurrency(r.gross) },
    { key: "ret", header: "Retention", align: "right", cell: (r) => formatCurrency(r.retention) },
    { key: "net", header: "Net payable", align: "right", cell: (r) => formatCurrency(r.net) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (r: Ipc) => boolean) => (
    <DataTable columns={columns} rows={ipcs.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Interim Payment Certificates"
      description="Certified value of executed work, net of retention"
      action="New IPC"
      tabs={[
        { value: "all", label: `All (${ipcs.length})`, content: view(() => true) },
        { value: "pending", label: "Submitted", content: view((r) => r.status === "pending") },
        { value: "approved", label: "Certified", content: view((r) => r.status === "approved") },
      ]}
    />
  );
}
