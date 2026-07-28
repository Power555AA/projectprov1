import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useErp } from "@/lib/erp-context";
import { monthlyWork } from "@/lib/erp-data";
import { formatCurrency } from "@/lib/format";

const axisStyle = { fontSize: 11, fill: "var(--muted-foreground)" };

function tooltipStyle() {
  return {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: "0.5rem",
      fontSize: "12px",
      color: "var(--popover-foreground)",
    },
    labelStyle: { color: "var(--popover-foreground)", fontWeight: 600 },
  };
}

export function FinancialProgressChart() {
  const { projects } = useErp();
  const data = projects.slice(0, 7).map((p) => ({
    name: p.code,
    Certified: p.certified,
    "Done, uncertified": Math.max(p.workDone - p.certified, 0),
    Remaining: Math.max(p.contractValue - p.workDone, 0),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Financial Progress by Project</CardTitle>
        <CardDescription>Certified vs executed vs remaining contract value</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 4, right: 8 }} barCategoryGap="28%">
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={54}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <Tooltip {...tooltipStyle()} formatter={(v: number) => formatCurrency(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="Certified" stackId="a" fill="var(--chart-1)" radius={[0, 0, 3, 3]} />
            <Bar dataKey="Done, uncertified" stackId="a" fill="var(--chart-2)" />
            <Bar dataKey="Remaining" stackId="a" fill="var(--chart-5)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function MonthlyWorkChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Monthly Work Done — Planned vs Actual</CardTitle>
        <CardDescription>Last 6 months across all active projects</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyWork} margin={{ left: 4, right: 8 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={axisStyle} tickLine={false} axisLine={false} />
            <YAxis
              tick={axisStyle}
              tickLine={false}
              axisLine={false}
              width={54}
              tickFormatter={(v: number) => formatCurrency(v, true)}
            />
            <Tooltip {...tooltipStyle()} formatter={(v: number) => formatCurrency(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area
              type="monotone"
              dataKey="planned"
              name="Planned"
              stroke="var(--chart-5)"
              strokeDasharray="5 4"
              fill="none"
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fill="url(#actualFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
