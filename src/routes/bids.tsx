import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { formatCurrency, formatDate } from "@/lib/format";

type Bid = {
  id: string;
  ref: string;
  client: string;
  scope: string;
  value: number;
  due: string;
  status: StatusKey;
};

const bids: Bid[] = [
  { id: "b1", ref: "BID-2026-011", client: "Ministry of Transport", scope: "Metro Depot Civil Works", value: 41800000, due: "2026-08-14", status: "active" },
  { id: "b2", ref: "BID-2026-012", client: "Sea Ports Authority", scope: "Berth 9 Rehabilitation", value: 28400000, due: "2026-08-21", status: "active" },
  { id: "b3", ref: "BID-2026-013", client: "Water Authority", scope: "Trunk Water Network Ph.3", value: 17600000, due: "2026-09-02", status: "draft" },
  { id: "b4", ref: "BID-2026-009", client: "Aramco Facilities", scope: "Utility Building Fit-out", value: 9400000, due: "2026-07-10", status: "approved" },
  { id: "b5", ref: "BID-2026-008", client: "Royal Commission", scope: "Industrial Road Package", value: 33900000, due: "2026-06-28", status: "rejected" },
  { id: "b6", ref: "BID-2026-014", client: "Municipality of Riyadh", scope: "Stormwater Culverts", value: 12200000, due: "2026-09-15", status: "pending" },
];

export const Route = createFileRoute("/bids")({
  head: () => ({
    meta: [
      { title: "Bids — EZY PM" },
      {
        name: "description",
        content: "Track live tender opportunities, submission deadlines and estimated contract values.",
      },
      { property: "og:title", content: "Bids — EZY PM" },
      { property: "og:description", content: "Tender pipeline and submission deadlines." },
    ],
  }),
  component: BidsPage,
});

function BidsPage() {
  const columns: Column<Bid>[] = [
    { key: "ref", header: "Reference", cell: (r) => <span className="font-medium">{r.ref}</span> },
    { key: "client", header: "Client", cell: (r) => r.client },
    { key: "scope", header: "Scope", cell: (r) => r.scope },
    { key: "value", header: "Est. value", align: "right", cell: (r) => formatCurrency(r.value) },
    { key: "due", header: "Submission due", cell: (r) => formatDate(r.due) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (b: Bid) => boolean) => <DataTable columns={columns} rows={bids.filter(filter)} />;

  return (
    <ModuleScaffold
      title="Bids"
      description="Tender opportunities being pursued"
      action="New bid"
      tabs={[
        { value: "all", label: `All (${bids.length})`, content: view(() => true) },
        { value: "open", label: "Open", content: view((b) => b.status === "active") },
        { value: "won", label: "Won", content: view((b) => b.status === "approved") },
        { value: "lost", label: "Lost", content: view((b) => b.status === "rejected") },
      ]}
    />
  );
}
