import { createFileRoute } from "@tanstack/react-router";
import { DataTable, ModuleScaffold, type Column } from "@/components/layout/module-scaffold";
import { StatusChip, type StatusKey } from "@/components/ui/status-chip";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/format";

type Task = {
  id: string;
  wbs: string;
  activity: string;
  start: string;
  finish: string;
  planned: number;
  actual: number;
  status: StatusKey;
};

const tasks: Task[] = [
  { id: "t1", wbs: "1.1", activity: "Site mobilisation & enabling works", start: "2026-03-02", finish: "2026-04-10", planned: 100, actual: 100, status: "completed" },
  { id: "t2", wbs: "1.2", activity: "Excavation & shoring", start: "2026-04-13", finish: "2026-06-05", planned: 100, actual: 96, status: "active" },
  { id: "t3", wbs: "2.1", activity: "Raft foundation concrete", start: "2026-06-08", finish: "2026-08-14", planned: 72, actual: 64, status: "active" },
  { id: "t4", wbs: "2.2", activity: "Superstructure — Block B", start: "2026-07-06", finish: "2026-11-20", planned: 28, actual: 21, status: "active" },
  { id: "t5", wbs: "3.1", activity: "MEP first fix", start: "2026-09-01", finish: "2027-01-15", planned: 0, actual: 0, status: "pending" },
  { id: "t6", wbs: "3.2", activity: "Facade installation", start: "2026-10-12", finish: "2027-03-28", planned: 0, actual: 0, status: "draft" },
];

export const Route = createFileRoute("/planning")({
  head: () => ({
    meta: [
      { title: "Planning & Schedule — EZY PM" },
      {
        name: "description",
        content: "WBS activities with baseline dates and planned-versus-actual progress on every package.",
      },
      { property: "og:title", content: "Planning & Schedule — EZY PM" },
      { property: "og:description", content: "Baseline schedule and progress against plan." },
    ],
  }),
  component: PlanningPage,
});

function PlanningPage() {
  const columns: Column<Task>[] = [
    { key: "wbs", header: "WBS", cell: (r) => <span className="font-medium">{r.wbs}</span> },
    { key: "act", header: "Activity", cell: (r) => r.activity },
    { key: "start", header: "Start", cell: (r) => formatDate(r.start) },
    { key: "finish", header: "Finish", cell: (r) => formatDate(r.finish) },
    { key: "planned", header: "Planned", align: "right", cell: (r) => `${r.planned}%` },
    {
      key: "actual",
      header: "Actual",
      cell: (r) => (
        <div className="flex items-center gap-2">
          <Progress value={r.actual} className="h-1.5 w-24" />
          <span className="tabular text-xs text-muted-foreground">{r.actual}%</span>
        </div>
      ),
    },
    { key: "status", header: "Status", cell: (r) => <StatusChip status={r.status} /> },
  ];
  const view = (f: (t: Task) => boolean) => <DataTable columns={columns} rows={tasks.filter(f)} />;

  return (
    <ModuleScaffold
      title="Planning & Schedule"
      description="Baseline programme and progress against plan"
      action="New activity"
      tabs={[
        { value: "all", label: `All (${tasks.length})`, content: view(() => true) },
        { value: "active", label: "In Progress", content: view((t) => t.status === "active") },
        { value: "behind", label: "Behind Plan", content: view((t) => t.actual < t.planned) },
        { value: "done", label: "Completed", content: view((t) => t.status === "completed") },
      ]}
    />
  );
}
