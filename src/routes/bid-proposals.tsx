import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { formatCurrency, formatDate } from "@/lib/format";

type Proposal = {
  id: string;
  ref: string;
  bid: string;
  preparedBy: string;
  amount: number;
  margin: number;
  submitted: string;
  status: StatusKey;
};

const proposals: Proposal[] = [
  { id: "pr1", ref: "PRP-014", bid: "BID-2026-011 Metro Depot", preparedBy: "L. Habib", amount: 41800000, margin: 11.4, submitted: "2026-07-23", status: "pending" },
  { id: "pr2", ref: "PRP-016", bid: "BID-2026-013 Water Network", preparedBy: "R. Salim", amount: 17600000, margin: 9.2, submitted: "2026-07-26", status: "pending" },
  { id: "pr3", ref: "PRP-012", bid: "BID-2026-012 Berth 9", preparedBy: "H. Nasser", amount: 28400000, margin: 12.8, submitted: "2026-07-12", status: "draft" },
  { id: "pr4", ref: "PRP-009", bid: "BID-2026-009 Fit-out", preparedBy: "M. Idris", amount: 9400000, margin: 14.1, submitted: "2026-06-30", status: "approved" },
  { id: "pr5", ref: "PRP-008", bid: "BID-2026-008 Industrial Road", preparedBy: "K. Osman", amount: 33900000, margin: 7.6, submitted: "2026-06-18", status: "rejected" },
];

export const Route = createFileRoute("/bid-proposals")({
  head: () => ({
    meta: [
      { title: "Bid Proposals — EZY PM" },
      {
        name: "description",
        content: "Priced bid proposals with margin, preparer and approval state before submission.",
      },
      { property: "og:title", content: "Bid Proposals — EZY PM" },
      { property: "og:description", content: "Priced proposals awaiting internal approval." },
    ],
  }),
  component: ProposalsPage,
});

function ProposalsPage() {
  const columns: Column<Proposal>[] = [
    { key: "ref", header: "Proposal", cell: (r) => <span className="font-medium">{r.ref}</span> },
    { key: "bid", header: "Against bid", cell: (r) => r.bid },
    { key: "by", header: "Prepared by", cell: (r) => r.preparedBy },
    { key: "amount", header: "Amount", align: "right", cell: (r) => formatCurrency(r.amount) },
    { key: "margin", header: "Margin", align: "right", cell: (r) => `${r.margin.toFixed(1)}%` },
    { key: "sub", header: "Submitted", cell: (r) => formatDate(r.submitted) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (f: (p: Proposal) => boolean) => <DataTable columns={columns} rows={proposals.filter(f)} />;

  return (
    <ModuleScaffold
      title="Bid Proposals"
      description="Commercial proposals prepared against live tenders"
      action="New proposal"
      tabs={[
        { value: "all", label: `All (${proposals.length})`, content: view(() => true) },
        { value: "draft", label: "Draft", content: view((p) => p.status === "draft") },
        { value: "pending", label: "Awaiting Approval", content: view((p) => p.status === "pending") },
        { value: "approved", label: "Approved", content: view((p) => p.status === "approved") },
      ]}
    />
  );
}
