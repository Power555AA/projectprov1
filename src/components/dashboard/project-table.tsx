import { MoreHorizontal } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusChip } from "@/components/ui/status-chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useErp } from "@/lib/erp-context";
import { formatCurrency, formatPercent } from "@/lib/format";

export function ProjectTable() {
  const { projects, sites, totals } = useErp();
  const siteName = (id: string) => sites.find((s) => s.id === id)?.name ?? "—";

  return (
    <Card className="gap-0 overflow-hidden pb-0">
      <CardHeader className="pb-4">
        <CardTitle className="text-base">Projects</CardTitle>
        <CardDescription>Contract, executed value and certification status</CardDescription>
      </CardHeader>
      <div className="overflow-x-auto border-t border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Project</TableHead>
              <TableHead className="hidden md:table-cell">Site</TableHead>
              <TableHead className="text-right">Contract</TableHead>
              <TableHead className="text-right">Work done</TableHead>
              <TableHead className="w-40">Progress</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium tabular">{p.code}</TableCell>
                <TableCell className="max-w-56 truncate">{p.name}</TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {siteName(p.siteId)}
                </TableCell>
                <TableCell className="text-right tabular">{formatCurrency(p.contractValue, true)}</TableCell>
                <TableCell className="text-right tabular">{formatCurrency(p.workDone, true)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} className="h-1.5" />
                    <span className="w-9 text-right text-xs tabular text-muted-foreground">
                      {formatPercent(p.progress)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusChip status={p.status} />
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Open project</DropdownMenuItem>
                      <DropdownMenuItem>View BOQ</DropdownMenuItem>
                      <DropdownMenuItem>Raise IPC</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-medium">
                Total · {projects.length} projects
              </TableCell>
              <TableCell className="text-right font-semibold tabular">
                {formatCurrency(totals.contract, true)}
              </TableCell>
              <TableCell className="text-right font-semibold tabular">
                {formatCurrency(totals.workDone, true)}
              </TableCell>
              <TableCell colSpan={3} />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Card>
  );
}
