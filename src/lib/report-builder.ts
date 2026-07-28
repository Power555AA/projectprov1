import {
  activities,
  hseStats,
  inventory,
  materialConsumption,
  monthlyWork,
  sites,
} from "./erp-data";
import { formatCurrency, formatDate, formatNumber, formatPercent } from "./format";

export type ReportId =
  | "monthly-progress"
  | "cost-value"
  | "ipc-summary"
  | "boq-execution"
  | "inspection-log"
  | "material-consumption"
  | "hse-performance"
  | "approvals-ageing";

export type ReportDef = {
  id: ReportId;
  name: string;
  detail: string;
};

export const reportDefs: ReportDef[] = [
  { id: "monthly-progress", name: "Monthly Progress Report", detail: "Physical and financial progress per project, plus planned vs actual by month." },
  { id: "cost-value", name: "Cost Value Reconciliation", detail: "Contract value versus work done, certified and remaining exposure." },
  { id: "ipc-summary", name: "IPC Certification Summary", detail: "Gross, retention and net certified per period." },
  { id: "boq-execution", name: "BOQ Execution Report", detail: "Executed quantities against priced bill of quantities." },
  { id: "inspection-log", name: "Inspection Quality Log", detail: "Raised, approved and rejected inspections by discipline." },
  { id: "material-consumption", name: "Material Consumption", detail: "Requisitions plus issued versus consumed stock." },
  { id: "hse-performance", name: "HSE Performance", detail: "Man-hours, LTI-free days, observations and incidents." },
  { id: "approvals-ageing", name: "Approvals Ageing", detail: "Pending approvals by type and waiting time." },
];

export type ReportResult = {
  id: ReportId;
  name: string;
  generatedAt: string;
  scope: string;
  columns: string[];
  aligns: ("left" | "right")[];
  rows: string[][];
  summary: { label: string; value: string }[];
};

type Scope = {
  filters: { siteId: string; projectId: string; range: string };
  projects: {
    id: string;
    code: string;
    name: string;
    siteId: string;
    manager: string;
    contractValue: number;
    workDone: number;
    certified: number;
    progress: number;
    status: string;
    start: string;
    end: string;
  }[];
  boqItems: { id: string; projectId: string; code: string; description: string; unit: string; qty: number; rate: number; executedQty: number }[];
  inspectionRequests: { id: string; projectId: string; title: string; discipline: string; inspector: string; status: string; raised: string }[];
  ipcs: { id: string; projectId: string; no: number; period: string; gross: number; retention: number; net: number; status: string }[];
  materialRequests: { id: string; projectId: string; material: string; qty: number; unit: string; status: string; needBy: string }[];
  approvals: { id: string; type: string; reference: string; requestedBy: string; amount?: number; age: string }[];
};

const rangeLabels: Record<string, string> = {
  ytd: "Year to date",
  q: "Current quarter",
  m: "Current month",
  all: "All time",
};

export function scopeLabel(s: Scope) {
  const site = s.filters.siteId === "all" ? "All sites" : sites.find((x) => x.id === s.filters.siteId)?.name ?? "All sites";
  const project =
    s.filters.projectId === "all"
      ? "All projects"
      : s.projects.find((p) => p.id === s.filters.projectId)?.name ?? "All projects";
  const range = rangeLabels[s.filters.range] ?? s.filters.range;
  return `${site} · ${project} · ${range}`;
}

export function buildReport(id: ReportId, s: Scope): ReportResult {
  const def = reportDefs.find((d) => d.id === id)!;
  const projectName = (pid: string) => s.projects.find((p) => p.id === pid)?.code ?? pid;
  const base = {
    id,
    name: def.name,
    generatedAt: new Date().toISOString(),
    scope: scopeLabel(s),
  };

  switch (id) {
    case "monthly-progress": {
      const rows = s.projects.map((p) => [
        p.code,
        p.name,
        p.manager,
        formatPercent(p.progress),
        formatCurrency(p.contractValue),
        formatCurrency(p.workDone),
        formatDate(p.end),
      ]);
      const monthRows = monthlyWork.map((m) => [
        "—",
        `Portfolio · ${m.month}`,
        "Planned vs actual",
        formatPercent(Math.round((m.actual / m.planned) * 100)),
        formatCurrency(m.planned),
        formatCurrency(m.actual),
        "—",
      ]);
      const contract = s.projects.reduce((a, p) => a + p.contractValue, 0);
      const done = s.projects.reduce((a, p) => a + p.workDone, 0);
      return {
        ...base,
        columns: ["Code", "Project / Period", "Manager", "Progress", "Contract / Planned", "Work done / Actual", "End date"],
        aligns: ["left", "left", "left", "right", "right", "right", "left"],
        rows: [...rows, ...monthRows],
        summary: [
          { label: "Projects", value: String(s.projects.length) },
          { label: "Contract value", value: formatCurrency(contract) },
          { label: "Work done", value: formatCurrency(done) },
          { label: "Overall progress", value: formatPercent(contract ? Math.round((done / contract) * 100) : 0) },
        ],
      };
    }
    case "cost-value": {
      const rows = s.projects.map((p) => {
        const cost = Math.round(p.workDone * 0.86);
        return [
          p.code,
          p.name,
          formatCurrency(p.contractValue),
          formatCurrency(p.workDone),
          formatCurrency(cost),
          formatCurrency(p.workDone - cost),
          formatCurrency(p.contractValue - p.workDone),
        ];
      });
      const contract = s.projects.reduce((a, p) => a + p.contractValue, 0);
      const done = s.projects.reduce((a, p) => a + p.workDone, 0);
      return {
        ...base,
        columns: ["Code", "Project", "Contract", "Value earned", "Cost to date", "Margin", "Remaining"],
        aligns: ["left", "left", "right", "right", "right", "right", "right"],
        rows,
        summary: [
          { label: "Contract", value: formatCurrency(contract) },
          { label: "Earned", value: formatCurrency(done) },
          { label: "Cost to date", value: formatCurrency(Math.round(done * 0.86)) },
          { label: "Margin", value: formatCurrency(Math.round(done * 0.14)) },
        ],
      };
    }
    case "ipc-summary": {
      const rows = s.ipcs.map((i) => [
        `IPC-${String(i.no).padStart(2, "0")}`,
        projectName(i.projectId),
        i.period,
        formatCurrency(i.gross),
        formatCurrency(i.retention),
        formatCurrency(i.net),
        i.status,
      ]);
      return {
        ...base,
        columns: ["IPC", "Project", "Period", "Gross", "Retention", "Net payable", "Status"],
        aligns: ["left", "left", "left", "right", "right", "right", "left"],
        rows,
        summary: [
          { label: "Certificates", value: String(s.ipcs.length) },
          { label: "Gross", value: formatCurrency(s.ipcs.reduce((a, i) => a + i.gross, 0)) },
          { label: "Retention", value: formatCurrency(s.ipcs.reduce((a, i) => a + i.retention, 0)) },
          { label: "Net payable", value: formatCurrency(s.ipcs.reduce((a, i) => a + i.net, 0)) },
        ],
      };
    }
    case "boq-execution": {
      const rows = s.boqItems.map((b) => [
        b.code,
        b.description,
        projectName(b.projectId),
        `${formatNumber(b.qty)} ${b.unit}`,
        `${formatNumber(b.executedQty)} ${b.unit}`,
        formatPercent(Math.round((b.executedQty / b.qty) * 100)),
        formatCurrency(b.executedQty * b.rate),
      ]);
      return {
        ...base,
        columns: ["Item", "Description", "Project", "BOQ qty", "Executed", "% complete", "Executed value"],
        aligns: ["left", "left", "left", "right", "right", "right", "right"],
        rows,
        summary: [
          { label: "Items", value: String(s.boqItems.length) },
          { label: "BOQ value", value: formatCurrency(s.boqItems.reduce((a, b) => a + b.qty * b.rate, 0)) },
          { label: "Executed value", value: formatCurrency(s.boqItems.reduce((a, b) => a + b.executedQty * b.rate, 0)) },
        ],
      };
    }
    case "inspection-log": {
      const rows = s.inspectionRequests.map((r) => [
        r.id.toUpperCase(),
        r.title,
        projectName(r.projectId),
        r.discipline,
        r.inspector,
        formatDate(r.raised),
        r.status,
      ]);
      const count = (st: string) => s.inspectionRequests.filter((r) => r.status === st).length;
      return {
        ...base,
        columns: ["Ref", "Title", "Project", "Discipline", "Inspector", "Raised", "Status"],
        aligns: ["left", "left", "left", "left", "left", "left", "left"],
        rows,
        summary: [
          { label: "Raised", value: String(s.inspectionRequests.length) },
          { label: "Approved", value: String(count("approved")) },
          { label: "Pending", value: String(count("pending")) },
          { label: "Rejected", value: String(count("rejected")) },
        ],
      };
    }
    case "material-consumption": {
      const reqRows = s.materialRequests.map((m) => [
        m.material,
        projectName(m.projectId),
        `${formatNumber(m.qty)} ${m.unit}`,
        formatDate(m.needBy),
        m.status,
      ]);
      const catRows = materialConsumption.map((c) => [
        `${c.name} (consumed)`,
        "Portfolio",
        formatNumber(c.value),
        "—",
        "issued",
      ]);
      return {
        ...base,
        columns: ["Material", "Project", "Quantity", "Need by", "Status"],
        aligns: ["left", "left", "right", "left", "left"],
        rows: [...reqRows, ...catRows],
        summary: [
          { label: "Requisitions", value: String(s.materialRequests.length) },
          { label: "Stock value", value: formatCurrency(inventory.total) },
          { label: "Consumed", value: formatCurrency(inventory.consumed) },
          { label: "Balance", value: formatCurrency(inventory.balance) },
        ],
      };
    }
    case "hse-performance": {
      const rows = [
        ["Safe man-hours logged", formatNumber(hseStats.loggedHours)],
        ["LTI-free days", formatNumber(hseStats.ltiFreeDays)],
        ["Safety observations", formatNumber(hseStats.observations)],
        ["Open incidents", formatNumber(hseStats.openIncidents)],
        ["Inductions completed", formatNumber(hseStats.inductions)],
        ["Audits performed", formatNumber(hseStats.audits)],
        ...activities
          .filter((a) => a.action.toLowerCase().includes("hse"))
          .map((a) => [`${a.actor} — ${a.target}`, formatDate(a.at)]),
      ];
      return {
        ...base,
        columns: ["Metric", "Value"],
        aligns: ["left", "right"],
        rows,
        summary: [
          { label: "Man-hours", value: formatNumber(hseStats.loggedHours) },
          { label: "LTI-free days", value: formatNumber(hseStats.ltiFreeDays) },
          { label: "Open incidents", value: String(hseStats.openIncidents) },
        ],
      };
    }
    case "approvals-ageing": {
      const rows = s.approvals.map((a) => [
        a.type,
        a.reference,
        a.requestedBy,
        a.amount ? formatCurrency(a.amount) : "—",
        a.age,
      ]);
      const value = s.approvals.reduce((acc, a) => acc + (a.amount ?? 0), 0);
      return {
        ...base,
        columns: ["Type", "Reference", "Requested by", "Amount", "Waiting"],
        aligns: ["left", "left", "left", "right", "left"],
        rows,
        summary: [
          { label: "Pending items", value: String(s.approvals.length) },
          { label: "Value at risk", value: formatCurrency(value) },
        ],
      };
    }
  }
}

export function toCsv(r: ReportResult) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [
    [r.name],
    [`Scope: ${r.scope}`],
    [`Generated: ${new Date(r.generatedAt).toLocaleString()}`],
    [],
    r.columns,
    ...r.rows,
    [],
    ["Summary"],
    ...r.summary.map((s) => [s.label, s.value]),
  ];
  return lines.map((row) => row.map((c) => esc(String(c ?? ""))).join(",")).join("\n");
}

export function downloadCsv(r: ReportResult) {
  const blob = new Blob([toCsv(r)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${r.id}-${new Date(r.generatedAt).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
