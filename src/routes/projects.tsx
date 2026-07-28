import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip } from "@/components/ui/status-chip";
import { useErp } from "@/lib/erp-context";
import { formatCurrency, formatDate, formatPercent } from "@/lib/format";
import type { Project } from "@/lib/erp-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — EZY PM" },
      {
        name: "description",
        content: "Every construction project with contract value, executed value, progress and status.",
      },
      { property: "og:title", content: "Projects — EZY PM" },
      { property: "og:description", content: "Portfolio of construction projects and their progress." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { projects, sites } = useErp();
  const siteName = (id: string) => sites.find((s) => s.id === id)?.name ?? "—";

  const columns: Column<Project>[] = [
    { key: "code", header: "Code", cell: (r) => <span className="font-medium">{r.code}</span> },
    { key: "name", header: "Project", cell: (r) => r.name },
    { key: "site", header: "Site", cell: (r) => siteName(r.siteId) },
    { key: "manager", header: "Manager", cell: (r) => r.manager },
    { key: "value", header: "Contract", align: "right", cell: (r) => formatCurrency(r.contractValue) },
    { key: "done", header: "Work done", align: "right", cell: (r) => formatCurrency(r.workDone) },
    { key: "progress", header: "Progress", align: "right", cell: (r) => formatPercent(r.progress) },
    { key: "end", header: "Completion", cell: (r) => formatDate(r.end) },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];

  const view = (filter: (p: Project) => boolean) => (
    <DataTable columns={columns} rows={projects.filter(filter)} />
  );

  return (
    <ModuleScaffold
      title="Projects"
      description="Awarded and pipeline projects across all sites"
      action="New project"
      tabs={[
        { value: "all", label: `All (${projects.length})`, content: view(() => true) },
        { value: "active", label: "In Progress", content: view((p) => p.status === "active") },
        { value: "pending", label: "Pending", content: view((p) => p.status === "pending") },
        { value: "onhold", label: "On Hold", content: view((p) => p.status === "onhold") },
        { value: "completed", label: "Completed", content: view((p) => p.status === "completed") },
      ]}
    />
  );
}
