import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { Button } from "@/components/ui/button";
import { useErp } from "@/lib/erp-context";
import { formatCurrency } from "@/lib/format";
import type { Approval } from "@/lib/erp-data";

export const Route = createFileRoute("/approvals")({
  head: () => ({
    meta: [
      { title: "Approvals Inbox — EZY PM" },
      {
        name: "description",
        content: "One inbox for every pending approval: bid proposals, work orders, inspections and IPCs.",
      },
      { property: "og:title", content: "Approvals Inbox — EZY PM" },
      { property: "og:description", content: "Approve or reject every pending item from one queue." },
    ],
  }),
  component: ApprovalsPage,
});

function ApprovalsPage() {
  const { approvals } = useErp();

  const columns: Column<Approval>[] = [
    { key: "type", header: "Type", cell: (r) => r.type },
    { key: "ref", header: "Reference", cell: (r) => <span className="font-medium">{r.reference}</span> },
    { key: "by", header: "Requested by", cell: (r) => r.requestedBy },
    { key: "amount", header: "Amount", align: "right", cell: (r) => (r.amount ? formatCurrency(r.amount) : "—") },
    { key: "age", header: "Waiting", cell: (r) => r.age },
    {
      key: "actions",
      header: "Action",
      align: "right",
      cell: () => (
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" className="h-7 gap-1">
            <Check className="size-3.5" /> Approve
          </Button>
          <Button size="sm" variant="ghost" className="h-7 gap-1 text-destructive">
            <X className="size-3.5" /> Reject
          </Button>
        </div>
      ),
    },
  ];

  const view = (filter: (a: Approval) => boolean) => (
    <DataTable columns={columns} rows={approvals.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Approvals Inbox"
      description="Every pending approval across all modules in one queue"
      action="Bulk approve"
      tabs={[
        { value: "all", label: `All (${approvals.length})`, content: view(() => true) },
        { value: "ipc", label: "IPCs", content: view((a) => a.type === "IPC") },
        { value: "wo", label: "Work Orders", content: view((a) => a.type === "Work Order") },
        { value: "ir", label: "Inspections", content: view((a) => a.type === "Inspection Request") },
        { value: "bid", label: "Bid Proposals", content: view((a) => a.type === "Bid Proposal") },
      ]}
    />
  );
}
