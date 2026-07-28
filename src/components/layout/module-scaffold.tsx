import type { ReactNode } from "react";
import { FilterBar } from "@/components/layout/filter-bar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export type Column<T> = {
  key: string;
  header: string;
  align?: "left" | "right";
  cell: (row: T) => ReactNode;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  footer,
}: {
  columns: Column<T>[];
  rows: T[];
  footer?: ReactNode;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((c) => (
              <TableHead key={c.key} className={c.align === "right" ? "text-right" : undefined}>
                {c.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-10 text-center text-muted-foreground">
                No records match the current filters.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((c) => (
                  <TableCell
                    key={c.key}
                    className={c.align === "right" ? "text-right tabular" : undefined}
                  >
                    {c.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {footer}
    </div>
  );
}

export function ModuleScaffold({
  title,
  description,
  action = "New record",
  tabs,
  children,
}: {
  title: string;
  description: string;
  action?: string;
  tabs?: { value: string; label: string; content: ReactNode }[];
  children?: ReactNode;
}) {
  return (
    <>
      <FilterBar />
      <div className="space-y-4 p-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button size="sm" className="gap-2">
            <Plus className="size-4" />
            {action}
          </Button>
        </div>

        {tabs ? (
          <Tabs defaultValue={tabs[0].value}>
            <TabsList>
              {tabs.map((t) => (
                <TabsTrigger key={t.value} value={t.value}>
                  {t.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map((t) => (
              <TabsContent key={t.value} value={t.value} className="mt-4">
                <Card className="overflow-hidden p-0">{t.content}</Card>
              </TabsContent>
            ))}
          </Tabs>
        ) : null}

        {children}
      </div>
    </>
  );
}
