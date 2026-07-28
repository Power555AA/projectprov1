import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import {
  approvals,
  boqItems,
  inspectionRequests,
  ipcs,
  materialRequests,
  projects,
  sites,
  workOrders,
  type Project,
} from "./erp-data";

type Filters = { siteId: string; projectId: string; range: string };

type ErpValue = {
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  sites: typeof sites;
  allProjects: Project[];
  projects: Project[];
  projectOptions: Project[];
  boqItems: typeof boqItems;
  workOrders: typeof workOrders;
  inspectionRequests: typeof inspectionRequests;
  ipcs: typeof ipcs;
  materialRequests: typeof materialRequests;
  approvals: typeof approvals;
  totals: {
    contract: number;
    workDone: number;
    certified: number;
    remaining: number;
    advance: number;
  };
};

const ErpContext = createContext<ErpValue | null>(null);

export function ErpProvider({ children }: { children: ReactNode }) {
  const [filters, setFiltersState] = useState<Filters>({
    siteId: "all",
    projectId: "all",
    range: "ytd",
  });

  const value = useMemo<ErpValue>(() => {
    const bySite =
      filters.siteId === "all" ? projects : projects.filter((p) => p.siteId === filters.siteId);
    const visible =
      filters.projectId === "all" ? bySite : bySite.filter((p) => p.id === filters.projectId);
    const ids = new Set(visible.map((p) => p.id));
    const scope = <T extends { projectId: string }>(rows: T[]) =>
      rows.filter((r) => ids.has(r.projectId));

    const contract = visible.reduce((s, p) => s + p.contractValue, 0);
    const workDone = visible.reduce((s, p) => s + p.workDone, 0);
    const certified = visible.reduce((s, p) => s + p.certified, 0);

    return {
      filters,
      setFilters: (f) => setFiltersState((prev) => ({ ...prev, ...f })),
      sites,
      allProjects: projects,
      projects: visible,
      projectOptions: bySite,
      boqItems: scope(boqItems),
      workOrders: scope(workOrders),
      inspectionRequests: scope(inspectionRequests),
      ipcs: scope(ipcs),
      materialRequests: scope(materialRequests),
      approvals,
      totals: {
        contract,
        workDone,
        certified,
        remaining: contract - workDone,
        advance: Math.round(contract * 0.08),
      },
    };
  }, [filters]);

  return <ErpContext.Provider value={value}>{children}</ErpContext.Provider>;
}

export function useErp() {
  const ctx = useContext(ErpContext);
  if (!ctx) throw new Error("useErp must be used inside ErpProvider");
  return ctx;
}
