import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileBarChart, Loader2, Printer } from "lucide-react";
import { ModuleScaffold } from "@/components/layout/module-scaffold";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useErp } from "@/lib/erp-context";
import {
  buildReport,
  downloadCsv,
  reportDefs,
  type ReportId,
  type ReportResult,
} from "@/lib/report-builder";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports — EZY PM" },
      {
        name: "description",
        content: "Generate progress, cost, certification, quality and HSE reports across the portfolio.",
      },
      { property: "og:title", content: "Reports — EZY PM" },
      { property: "og:description", content: "Standard construction reporting pack." },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const erp = useErp();
  const [busy, setBusy] = useState<ReportId | null>(null);
  const [report, setReport] = useState<ReportResult | null>(null);

  const generate = (id: ReportId) => {
    setBusy(id);
    window.setTimeout(() => {
      setReport(buildReport(id, erp));
      setBusy(null);
    }, 350);
  };

  return (
    <ModuleScaffold
      title="Reports"
      description="Standard reporting pack for the current filter scope"
      action="Custom report"
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {reportDefs.map((r) => (
          <Card key={r.id}>
            <CardContent className="flex items-start gap-3 p-4">
              <span className="rounded-md bg-secondary p-2 text-secondary-foreground">
                <FileBarChart className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{r.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.detail}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 gap-1.5"
                  disabled={busy !== null}
                  onClick={() => generate(r.id)}
                >
                  {busy === r.id ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Download className="size-3.5" />
                  )}
                  {busy === r.id ? "Generating…" : "Generate"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={report !== null} onOpenChange={(o) => !o && setReport(null)}>
        <DialogContent className="max-h-[85vh] max-w-5xl overflow-hidden">
          {report && (
            <>
              <DialogHeader>
                <DialogTitle>{report.name}</DialogTitle>
                <DialogDescription>
                  {report.scope} · generated {new Date(report.generatedAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-2 sm:grid-cols-4">
                {report.summary.map((s) => (
                  <div key={s.label} className="rounded-lg border bg-muted/40 p-3">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="mt-0.5 font-display text-lg font-semibold tabular">{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="max-h-[45vh] overflow-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {report.columns.map((c, i) => (
                        <TableHead key={c} className={report.aligns[i] === "right" ? "text-right" : undefined}>
                          {c}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={report.columns.length} className="py-10 text-center text-muted-foreground">
                          No records match the current filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      report.rows.map((row, ri) => (
                        <TableRow key={ri}>
                          {row.map((cell, ci) => (
                            <TableCell
                              key={ci}
                              className={report.aligns[ci] === "right" ? "text-right tabular" : undefined}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" className="gap-1.5" onClick={() => window.print()}>
                  <Printer className="size-4" /> Print
                </Button>
                <Button className="gap-1.5" onClick={() => downloadCsv(report)}>
                  <Download className="size-4" /> Download CSV
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ModuleScaffold>
  );
}
