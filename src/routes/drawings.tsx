import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { formatDate } from "@/lib/format";

type Drawing = {
  id: string;
  no: string;
  title: string;
  discipline: string;
  rev: string;
  issued: string;
  status: StatusKey;
};

const drawings: Drawing[] = [
  { id: "d1", no: "RN-ARC-1204", title: "Ground Floor Layout — Block B", discipline: "Architectural", rev: "C", issued: "2026-07-18", status: "approved" },
  { id: "d2", no: "RN-STR-2210", title: "Raft Foundation Reinforcement", discipline: "Structural", rev: "B", issued: "2026-07-21", status: "pending" },
  { id: "d3", no: "JP-MEP-3105", title: "Chilled Water Riser Diagram", discipline: "MEP", rev: "A", issued: "2026-07-09", status: "approved" },
  { id: "d4", no: "DI-CIV-4402", title: "Site Grading & Levels", discipline: "Civil", rev: "D", issued: "2026-07-24", status: "draft" },
  { id: "d5", no: "JP-STR-2311", title: "Quay Wall Section Details", discipline: "Structural", rev: "B", issued: "2026-06-30", status: "rejected" },
  { id: "d6", no: "RN-ELE-5108", title: "LV Single Line Diagram", discipline: "Electrical", rev: "A", issued: "2026-07-26", status: "pending" },
];

export const Route = createFileRoute("/drawings")({
  head: () => ({
    meta: [
      { title: "Drawing Management — EZY PM" },
      {
        name: "description",
        content: "Controlled drawing register with revisions, disciplines and approval status.",
      },
      { property: "og:title", content: "Drawing Management — EZY PM" },
      { property: "og:description", content: "Revision-controlled drawing register." },
    ],
  }),
  component: DrawingsPage,
});

function DrawingsPage() {
  const columns: Column<Drawing>[] = [
    { key: "no", header: "Drawing no.", cell: (r) => <span className="font-medium">{r.no}</span> },
    { key: "title", header: "Title", cell: (r) => r.title },
    { key: "disc", header: "Discipline", cell: (r) => r.discipline },
    { key: "rev", header: "Rev", cell: (r) => r.rev },
    { key: "issued", header: "Issued", cell: (r) => formatDate(r.issued) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];
  const view = (f: (d: Drawing) => boolean) => <DataTable columns={columns} rows={drawings.filter(f)} />;

  return (
    <ModuleScaffold
      title="Drawing Management"
      description="Latest revisions issued for construction"
      action="Upload drawing"
      tabs={[
        { value: "all", label: `All (${drawings.length})`, content: view(() => true) },
        { value: "pending", label: "Under Review", content: view((d) => d.status === "pending") },
        { value: "approved", label: "Issued for Construction", content: view((d) => d.status === "approved") },
        { value: "draft", label: "Draft", content: view((d) => d.status === "draft") },
      ]}
    />
  );
}
