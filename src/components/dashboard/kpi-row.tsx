import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDelta } from "@/lib/format";
import { useErp } from "@/lib/erp-context";

const ACCENTS = [
  "bg-primary",
  "bg-info",
  "bg-warning",
  "bg-success",
  "bg-chart-5",
] as const;

function Sparkline({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * 100;
      const y = 24 - ((p - min) / (max - min || 1)) * 22;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 24" preserveAspectRatio="none" className="h-6 w-20 text-muted-foreground">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function KpiRow() {
  const { totals } = useErp();

  const cards = [
    { label: "Contract Value", value: totals.contract, delta: 3.2, spark: [40, 42, 45, 47, 52, 55] },
    { label: "Work Done", value: totals.workDone, delta: 6.8, spark: [18, 22, 25, 29, 33, 36] },
    { label: "Remaining BOQ", value: totals.remaining, delta: -4.1, spark: [40, 37, 34, 31, 28, 26] },
    { label: "IPC Certified", value: totals.certified, delta: 5.4, spark: [12, 15, 19, 22, 26, 30] },
    { label: "Advance Payment", value: totals.advance, delta: 0, spark: [8, 8, 9, 9, 9, 9] },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((c, i) => {
        const up = c.delta >= 0;
        return (
          <Card key={c.label} className="relative gap-0 overflow-hidden p-4">
            <span className={cn("absolute inset-x-0 top-0 h-1", ACCENTS[i])} />
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {c.label}
            </p>
            <p className="mt-1.5 font-display text-2xl font-bold tabular">
              {formatCurrency(c.value, true)}
            </p>
            <div className="mt-2 flex items-end justify-between">
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs font-medium",
                  c.delta === 0
                    ? "text-muted-foreground"
                    : up
                      ? "text-success"
                      : "text-destructive",
                )}
              >
                {c.delta !== 0 &&
                  (up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />)}
                {formatDelta(c.delta)} <span className="text-muted-foreground">vs last month</span>
              </span>
              <Sparkline points={c.spark} />
            </div>
          </Card>
        );
      })}
    </div>
  );
}
