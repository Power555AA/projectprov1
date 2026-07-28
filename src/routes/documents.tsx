import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { formatDate } from "@/lib/format";

type Doc = {
  id: string;
  ref: string;
  title: string;
  type: string;
  owner: string;
  updated: string;
  status: StatusKey;
};

const docs: Doc[] = [
  { id: "dc1", ref: "CON-0031", title: "Main Contract Agreement — Riyadh North", type: "Contract", owner: "Legal", updated: "2026-07-02", status: "approved" },
  { id: "dc2", ref: "VO-0114", title: "Variation Order 14 — Additional Piling", type: "Variation", owner: "Commercial", updated: "2026-07-22", status: "pending" },
  { id: "dc3", ref: "RFI-0287", title: "RFI — Slab Opening Coordination", type: "RFI", owner: "Engineering", updated: "2026-07-25", status: "pending" },
  { id: "dc4", ref: "MOM-0092", title: "Weekly Progress Meeting Minutes", type: "Minutes", owner: "PMO", updated: "2026-07-27", status: "draft" },
  { id: "dc5", ref: "INS-0007", title: "CAR Insurance Policy Renewal", type: "Insurance", owner: "Finance", updated: "2026-06-14", status: "approved" },
  { id: "dc6", ref: "CLM-0003", title: "Extension of Time Claim — Weather", type: "Claim", owner: "Commercial", updated: "2026-07-11", status: "rejected" },
];

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — EZY PM" },
      {
        name: "description",
        content: "Contracts, variations, RFIs, claims and minutes in one controlled document register.",
      },
      { property: "og:title", content: "Documents — EZY PM" },
      { property: "og:description", content: "Controlled project document register." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const columns: Column<Doc>[] = [
    { key: "ref", header: "Reference", cell: (r) => <span className="font-medium">{r.ref}</span> },
    { key: "title", header: "Title", cell: (r) => r.title },
    { key: "type", header: "Type", cell: (r) => r.type },
    { key: "owner", header: "Owner", cell: (r) => r.owner },
    { key: "upd", header: "Updated", cell: (r) => formatDate(r.updated) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];
  const view = (f: (d: Doc) => boolean) => <DataTable columns={columns} rows={docs.filter(f)} />;

  return (
    <ModuleScaffold
      title="Documents"
      description="Contractual and correspondence records"
      action="Upload document"
      tabs={[
        { value: "all", label: `All (${docs.length})`, content: view(() => true) },
        { value: "pending", label: "Awaiting Action", content: view((d) => d.status === "pending") },
        { value: "approved", label: "Approved", content: view((d) => d.status === "approved") },
        { value: "draft", label: "Draft", content: view((d) => d.status === "draft") },
      ]}
    />
  );
}
