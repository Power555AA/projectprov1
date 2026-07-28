import { Download } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { exportVisibleTables } from "@/lib/export-csv";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useErp } from "@/lib/erp-context";

export function FilterBar() {
  const { filters, setFilters, sites, projectOptions } = useErp();

  return (
    <div className="sticky top-14 z-20 flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
      <Select
        value={filters.siteId}
        onValueChange={(v) => setFilters({ siteId: v, projectId: "all" })}
      >
        <SelectTrigger className="h-9 w-[170px]">
          <SelectValue placeholder="Site" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All sites</SelectItem>
          {sites.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.projectId} onValueChange={(v) => setFilters({ projectId: v })}>
        <SelectTrigger className="h-9 w-[220px]">
          <SelectValue placeholder="Project" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          {projectOptions.map((p) => (
            <SelectItem key={p.id} value={p.id}>
              {p.code} — {p.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.range} onValueChange={(v) => setFilters({ range: v })}>
        <SelectTrigger className="h-9 w-[150px]">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mtd">This month</SelectItem>
          <SelectItem value="qtd">This quarter</SelectItem>
          <SelectItem value="ytd">Year to date</SelectItem>
          <SelectItem value="all">Project to date</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" size="sm" className="ml-auto h-9 gap-2">
        <Download className="size-4" />
        Export
      </Button>
    </div>
  );
}
