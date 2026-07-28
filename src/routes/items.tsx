import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatCurrency, formatNumber } from "@/lib/format";
import type { BoqItem } from "@/lib/erp-data";

export const Route = createFileRoute("/items")({
  head: () => ({
    meta: [
      { title: "Items & BOQ — EZY PM" },
      {
        name: "description",
        content: "Bill of quantities per project with unit rates, executed quantities and amounts.",
      },
      { property: "og:title", content: "Items & BOQ — EZY PM" },
      { property: "og:description", content: "BOQ lines, rates and executed quantities." },
    ],
  }),
  component: ItemsPage,
});

function ItemsPage() {
  const { boqItems, allProjects } = useErp();
  const code = (id: string) => allProjects.find((p) => p.id === id)?.code ?? "—";

  const columns: Column<BoqItem>[] = [
    { key: "code", header: "Item", cell: (r) => <span className="font-medium">{r.code}</span> },
    { key: "project", header: "Project", cell: (r) => code(r.projectId) },
    { key: "desc", header: "Description", cell: (r) => r.description },
    { key: "unit", header: "Unit", cell: (r) => r.unit },
    { key: "qty", header: "Qty", align: "right", cell: (r) => formatNumber(r.qty) },
    { key: "rate", header: "Rate", align: "right", cell: (r) => formatCurrency(r.rate) },
    { key: "amount", header: "Amount", align: "right", cell: (r) => formatCurrency(r.qty * r.rate) },
    {
      key: "exec",
      header: "Executed",
      align: "right",
      cell: (r) => `${Math.round((r.executedQty / r.qty) * 100)}%`,
    },
    {
      key: "status",
      header: "Status",
      cell: (r) => (
        <StatusChip status={r.executedQty >= r.qty ? "completed" : r.executedQty ? "active" : "draft"} />
      ),
    },
  ];

  return (
    <ModuleScaffold
      title="Items & BOQ"
      description="Priced bill of quantities and execution against each line"
      action="New BOQ item"
      tabs={[
        { value: "all", label: `All (${boqItems.length})`, content: <DataTable columns={columns} rows={boqItems} /> },
        {
          value: "open",
          label: "In Progress",
          content: <DataTable columns={columns} rows={boqItems.filter((b) => b.executedQty < b.qty)} />,
        },
        {
          value: "done",
          label: "Completed",
          content: <DataTable columns={columns} rows={boqItems.filter((b) => b.executedQty >= b.qty)} />,
        },
      ]}
    />
  );
}
