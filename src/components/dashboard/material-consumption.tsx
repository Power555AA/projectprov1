import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { inventory, materialConsumption } from "@/lib/erp-data";
import { formatNumber } from "@/lib/format";

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function MaterialConsumption() {
  const total = materialConsumption.reduce((s, m) => s + m.value, 0);
  const used = Math.round((inventory.consumed / inventory.total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Material Consumption & Inventory</CardTitle>
        <CardDescription>Units consumed this period vs stock balance</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-2">
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={materialConsumption}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="var(--card)"
              >
                {materialConsumption.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "12px",
                }}
                formatter={(v: number) => formatNumber(v)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <ul className="space-y-2">
            {materialConsumption.map((m, i) => (
              <li key={m.name} className="flex items-center gap-2 text-sm">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="flex-1">{m.name}</span>
                <span className="tabular text-muted-foreground">{formatNumber(m.value)}</span>
                <span className="w-10 text-right tabular text-xs text-muted-foreground">
                  {Math.round((m.value / total) * 100)}%
                </span>
              </li>
            ))}
          </ul>

          <div className="rounded-md border border-border p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Stock utilisation</span>
              <span className="font-medium tabular">{used}%</span>
            </div>
            <Progress value={used} className="mt-2 h-1.5" />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              {[
                ["Total", inventory.total],
                ["Consumed", inventory.consumed],
                ["Balance", inventory.balance],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="text-sm font-semibold tabular">{formatNumber(value as number)}</p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
