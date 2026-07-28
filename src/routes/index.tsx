import { createFileRoute } from "@tanstack/react-router";
import { FilterBar } from "@/components/layout/filter-bar";
import { KpiRow } from "@/components/dashboard/kpi-row";
import { FinancialProgressChart, MonthlyWorkChart } from "@/components/dashboard/charts";
import { ProjectTable } from "@/components/dashboard/project-table";
import { ActivityFeed, ApprovalsPanel, PortfolioStats } from "@/components/dashboard/side-panels";
import { MaterialConsumption } from "@/components/dashboard/material-consumption";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — EZY PM Construction Portal" },
      {
        name: "description",
        content:
          "Live view of contract value, work done, certified IPCs, approvals and material consumption across all construction sites.",
      },
      { property: "og:title", content: "Dashboard — EZY PM Construction Portal" },
      {
        property: "og:description",
        content: "Contract, execution and certification KPIs for every project in one screen.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <>
      <FilterBar />
      <div className="space-y-4 p-4">
        <div>
          <h1 className="font-display text-2xl font-bold">Portfolio Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Bid → Award → Plan → Execute → Inspect → Certify → Get paid
          </p>
        </div>

        <KpiRow />

        <div className="grid gap-4 xl:grid-cols-3">
          <div className="space-y-4 xl:col-span-2">
            <FinancialProgressChart />
            <MonthlyWorkChart />
            <ProjectTable />
          </div>
          <div className="space-y-4">
            <PortfolioStats />
            <ApprovalsPanel />
            <ActivityFeed />
          </div>
        </div>

        <MaterialConsumption />
      </div>
    </>
  );
}
