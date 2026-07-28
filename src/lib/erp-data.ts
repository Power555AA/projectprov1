import type { StatusKey } from "@/components/ui/status-chip";

export type Site = { id: string; name: string };

export type Project = {
  id: string;
  code: string;
  name: string;
  siteId: string;
  manager: string;
  contractValue: number;
  workDone: number;
  certified: number;
  progress: number;
  status: StatusKey;
  start: string;
  end: string;
};

export type BoqItem = {
  id: string;
  projectId: string;
  code: string;
  description: string;
  unit: string;
  qty: number;
  rate: number;
  executedQty: number;
};

export type WorkOrder = {
  id: string;
  projectId: string;
  title: string;
  contractor: string;
  value: number;
  status: StatusKey;
  issued: string;
};

export type InspectionRequest = {
  id: string;
  projectId: string;
  title: string;
  discipline: string;
  inspector: string;
  status: StatusKey;
  raised: string;
};

export type Ipc = {
  id: string;
  projectId: string;
  no: number;
  period: string;
  gross: number;
  retention: number;
  net: number;
  status: StatusKey;
};

export type MaterialRequest = {
  id: string;
  projectId: string;
  material: string;
  qty: number;
  unit: string;
  status: StatusKey;
  needBy: string;
};

export type Approval = {
  id: string;
  type: "Bid Proposal" | "Work Order" | "Inspection Request" | "IPC";
  reference: string;
  requestedBy: string;
  amount?: number;
  age: string;
  href: string;
};

export type Activity = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
};

export const sites: Site[] = [
  { id: "s1", name: "Riyadh North" },
  { id: "s2", name: "Jeddah Port" },
  { id: "s3", name: "Dammam Industrial" },
];

export const projects: Project[] = [
  { id: "p1", code: "RYD-101", name: "North Ring Interchange", siteId: "s1", manager: "A. Farouk", contractValue: 48500000, workDone: 31200000, certified: 27400000, progress: 64, status: "active", start: "2025-02-10", end: "2026-11-30" },
  { id: "p2", code: "RYD-102", name: "Al Nakheel Residential Towers", siteId: "s1", manager: "S. Kareem", contractValue: 36200000, workDone: 14800000, certified: 12100000, progress: 41, status: "active", start: "2025-06-01", end: "2027-03-15" },
  { id: "p3", code: "RYD-103", name: "King Fahd Utility Corridor", siteId: "s1", manager: "M. Idris", contractValue: 12750000, workDone: 12750000, certified: 12100000, progress: 100, status: "completed", start: "2024-04-01", end: "2025-12-20" },
  { id: "p4", code: "JED-201", name: "Port Terminal 4 Expansion", siteId: "s2", manager: "H. Nasser", contractValue: 72400000, workDone: 39600000, certified: 35800000, progress: 55, status: "active", start: "2025-01-15", end: "2027-08-30" },
  { id: "p5", code: "JED-202", name: "Container Yard Paving", siteId: "s2", manager: "R. Salim", contractValue: 18900000, workDone: 15300000, certified: 14200000, progress: 81, status: "active", start: "2025-03-20", end: "2026-09-10" },
  { id: "p6", code: "JED-203", name: "Cold Storage Facility", siteId: "s2", manager: "L. Habib", contractValue: 25600000, workDone: 5100000, certified: 3900000, progress: 20, status: "onhold", start: "2025-09-01", end: "2027-05-01" },
  { id: "p7", code: "JED-204", name: "Marine Bund Reinforcement", siteId: "s2", manager: "H. Nasser", contractValue: 9800000, workDone: 6200000, certified: 5400000, progress: 63, status: "active", start: "2025-05-05", end: "2026-08-20" },
  { id: "p8", code: "DMM-301", name: "Petrochem Pipe Rack Phase 2", siteId: "s3", manager: "K. Osman", contractValue: 54300000, workDone: 28900000, certified: 25100000, progress: 53, status: "active", start: "2025-02-25", end: "2027-01-31" },
  { id: "p9", code: "DMM-302", name: "Industrial Substation 7", siteId: "s3", manager: "N. Rahim", contractValue: 16400000, workDone: 11800000, certified: 10600000, progress: 72, status: "active", start: "2025-04-12", end: "2026-10-05" },
  { id: "p10", code: "DMM-303", name: "Effluent Treatment Plant", siteId: "s3", manager: "K. Osman", contractValue: 21700000, workDone: 4300000, certified: 2900000, progress: 20, status: "active", start: "2025-10-01", end: "2027-06-30" },
  { id: "p11", code: "DMM-304", name: "Warehouse Block C", siteId: "s3", manager: "N. Rahim", contractValue: 8600000, workDone: 0, certified: 0, progress: 0, status: "draft", start: "2026-01-15", end: "2027-02-28" },
  { id: "p12", code: "RYD-104", name: "Airport Access Road", siteId: "s1", manager: "A. Farouk", contractValue: 31200000, workDone: 2400000, certified: 0, progress: 8, status: "pending", start: "2026-02-01", end: "2027-10-30" },
];

export const boqItems: BoqItem[] = [
  { id: "b1", projectId: "p1", code: "02-100", description: "Site clearance & grubbing", unit: "m²", qty: 84000, rate: 12.5, executedQty: 84000 },
  { id: "b2", projectId: "p1", code: "03-210", description: "Reinforced concrete C40 — piers", unit: "m³", qty: 6200, rate: 1450, executedQty: 4100 },
  { id: "b3", projectId: "p1", code: "03-315", description: "High yield steel reinforcement", unit: "ton", qty: 1850, rate: 4200, executedQty: 1120 },
  { id: "b4", projectId: "p4", code: "02-450", description: "Dredging & marine fill", unit: "m³", qty: 240000, rate: 68, executedQty: 141000 },
  { id: "b5", projectId: "p4", code: "05-120", description: "Structural steel fabrication", unit: "ton", qty: 3400, rate: 8900, executedQty: 1780 },
  { id: "b6", projectId: "p5", code: "32-120", description: "Heavy duty concrete block paving", unit: "m²", qty: 118000, rate: 145, executedQty: 96000 },
  { id: "b7", projectId: "p8", code: "05-330", description: "Pipe rack modules erection", unit: "ton", qty: 2600, rate: 11200, executedQty: 1390 },
  { id: "b8", projectId: "p9", code: "26-210", description: "13.8kV switchgear supply & install", unit: "no", qty: 14, rate: 385000, executedQty: 10 },
];

export const workOrders: WorkOrder[] = [
  { id: "wo1", projectId: "p1", title: "Pier P7–P12 concreting", contractor: "Al Bina Contracting", value: 4850000, status: "approved", issued: "2026-05-12" },
  { id: "wo2", projectId: "p1", title: "Deck formwork supply", contractor: "Gulf Formwork Co.", value: 1240000, status: "active", issued: "2026-06-02" },
  { id: "wo3", projectId: "p2", title: "Tower B raft foundation", contractor: "Nahda Builders", value: 6320000, status: "pending", issued: "2026-07-08" },
  { id: "wo4", projectId: "p4", title: "Quay wall sheet piling", contractor: "Marine Works Ltd", value: 12400000, status: "approved", issued: "2026-03-19" },
  { id: "wo5", projectId: "p4", title: "Terminal lighting package", contractor: "Volt Systems", value: 2180000, status: "draft", issued: "2026-07-20" },
  { id: "wo6", projectId: "p5", title: "Yard paving zone 3", contractor: "Pave Pro", value: 3760000, status: "active", issued: "2026-04-27" },
  { id: "wo7", projectId: "p7", title: "Rock armour placement", contractor: "Marine Works Ltd", value: 2950000, status: "approved", issued: "2026-02-14" },
  { id: "wo8", projectId: "p8", title: "Rack module transport", contractor: "Heavy Haul KSA", value: 1680000, status: "rejected", issued: "2026-06-30" },
  { id: "wo9", projectId: "p8", title: "Fireproofing application", contractor: "SafeCoat", value: 2240000, status: "pending", issued: "2026-07-16" },
  { id: "wo10", projectId: "p9", title: "Substation civil works", contractor: "Al Bina Contracting", value: 1980000, status: "active", issued: "2026-05-05" },
  { id: "wo11", projectId: "p9", title: "Cable trenching 4.2km", contractor: "Volt Systems", value: 1140000, status: "approved", issued: "2026-06-11" },
  { id: "wo12", projectId: "p10", title: "ETP tank shell erection", contractor: "Steel Craft", value: 4420000, status: "pending", issued: "2026-07-22" },
  { id: "wo13", projectId: "p2", title: "Tower A curtain wall", contractor: "Facade Gulf", value: 8900000, status: "draft", issued: "2026-07-25" },
  { id: "wo14", projectId: "p6", title: "Insulated panel supply", contractor: "ThermoPanel", value: 3310000, status: "onhold", issued: "2026-01-30" },
  { id: "wo15", projectId: "p1", title: "Asphalt wearing course", contractor: "Pave Pro", value: 2670000, status: "approved", issued: "2026-06-24" },
  { id: "wo16", projectId: "p4", title: "RTG crane rail beams", contractor: "Steel Craft", value: 5150000, status: "active", issued: "2026-05-18" },
  { id: "wo17", projectId: "p12", title: "Access road earthworks", contractor: "Al Bina Contracting", value: 3480000, status: "pending", issued: "2026-07-26" },
];

export const inspectionRequests: InspectionRequest[] = [
  { id: "ir1", projectId: "p1", title: "Pier P9 rebar inspection", discipline: "Civil", inspector: "Y. Mahmoud", status: "approved", raised: "2026-07-21" },
  { id: "ir2", projectId: "p1", title: "Deck concrete pour approval", discipline: "Civil", inspector: "Y. Mahmoud", status: "pending", raised: "2026-07-26" },
  { id: "ir3", projectId: "p4", title: "Sheet pile driving record", discipline: "Marine", inspector: "F. Zaid", status: "pending", raised: "2026-07-25" },
  { id: "ir4", projectId: "p5", title: "Paving level survey zone 3", discipline: "Survey", inspector: "T. Bakr", status: "approved", raised: "2026-07-18" },
  { id: "ir5", projectId: "p8", title: "Weld NDT batch 14", discipline: "Mechanical", inspector: "O. Haddad", status: "rejected", raised: "2026-07-14" },
  { id: "ir6", projectId: "p9", title: "Earthing continuity test", discipline: "Electrical", inspector: "D. Amin", status: "pending", raised: "2026-07-27" },
];

export const ipcs: Ipc[] = [
  { id: "ipc1", projectId: "p1", no: 9, period: "Jun 2026", gross: 4120000, retention: 412000, net: 3708000, status: "approved" },
  { id: "ipc2", projectId: "p4", no: 6, period: "Jun 2026", gross: 6840000, retention: 684000, net: 6156000, status: "pending" },
  { id: "ipc3", projectId: "p5", no: 11, period: "Jun 2026", gross: 2310000, retention: 231000, net: 2079000, status: "approved" },
  { id: "ipc4", projectId: "p8", no: 5, period: "Jun 2026", gross: 5270000, retention: 527000, net: 4743000, status: "pending" },
];

export const materialRequests: MaterialRequest[] = [
  { id: "m1", projectId: "p1", material: "Ready mix concrete C40", qty: 1800, unit: "m³", status: "approved", needBy: "2026-08-04" },
  { id: "m2", projectId: "p1", material: "Rebar B500B 25mm", qty: 240, unit: "ton", status: "pending", needBy: "2026-08-09" },
  { id: "m3", projectId: "p2", material: "Formwork panels", qty: 3200, unit: "m²", status: "draft", needBy: "2026-08-18" },
  { id: "m4", projectId: "p4", material: "Steel sheet piles AZ26", qty: 620, unit: "ton", status: "approved", needBy: "2026-08-02" },
  { id: "m5", projectId: "p5", material: "Interlock paving blocks", qty: 54000, unit: "m²", status: "active", needBy: "2026-08-12" },
  { id: "m6", projectId: "p8", material: "Structural bolts HSFG", qty: 46000, unit: "no", status: "pending", needBy: "2026-08-06" },
  { id: "m7", projectId: "p9", material: "XLPE cable 240mm²", qty: 8400, unit: "m", status: "approved", needBy: "2026-08-15" },
  { id: "m8", projectId: "p10", material: "HDPE liner 2mm", qty: 12500, unit: "m²", status: "rejected", needBy: "2026-08-22" },
  { id: "m9", projectId: "p7", material: "Rock armour 3–6 ton", qty: 9800, unit: "ton", status: "pending", needBy: "2026-08-08" },
];

export const monthlyWork = [
  { month: "Feb", planned: 18200000, actual: 16400000 },
  { month: "Mar", planned: 19600000, actual: 20100000 },
  { month: "Apr", planned: 21400000, actual: 19800000 },
  { month: "May", planned: 22800000, actual: 23600000 },
  { month: "Jun", planned: 24100000, actual: 25400000 },
  { month: "Jul", planned: 25600000, actual: 22900000 },
];

export const materialConsumption = [
  { name: "Concrete", value: 15200 },
  { name: "Steel", value: 11400 },
  { name: "Aggregate", value: 8100 },
  { name: "Electrical", value: 4350 },
  { name: "Other", value: 2800 },
];

export const inventory = { total: 234500, consumed: 41850, balance: 192650 };

export const approvals: Approval[] = [
  { id: "a1", type: "IPC", reference: "IPC-06 · Port Terminal 4", requestedBy: "H. Nasser", amount: 6840000, age: "2d", href: "/ipcs" },
  { id: "a2", type: "IPC", reference: "IPC-05 · Pipe Rack Ph.2", requestedBy: "K. Osman", amount: 5270000, age: "3d", href: "/ipcs" },
  { id: "a3", type: "Work Order", reference: "WO-0003 · Tower B raft", requestedBy: "S. Kareem", amount: 6320000, age: "1d", href: "/work-orders" },
  { id: "a4", type: "Work Order", reference: "WO-0009 · Fireproofing", requestedBy: "K. Osman", amount: 2240000, age: "4d", href: "/work-orders" },
  { id: "a5", type: "Work Order", reference: "WO-0012 · ETP tank shell", requestedBy: "N. Rahim", amount: 4420000, age: "1d", href: "/work-orders" },
  { id: "a6", type: "Inspection Request", reference: "IR-002 · Deck pour", requestedBy: "A. Farouk", age: "6h", href: "/inspection-requests" },
  { id: "a7", type: "Inspection Request", reference: "IR-006 · Earthing test", requestedBy: "N. Rahim", age: "3h", href: "/inspection-requests" },
  { id: "a8", type: "Bid Proposal", reference: "BID-2026-014 · Metro Depot", requestedBy: "L. Habib", amount: 41800000, age: "5d", href: "/bid-proposals" },
  { id: "a9", type: "Bid Proposal", reference: "BID-2026-016 · Water Network", requestedBy: "R. Salim", amount: 17600000, age: "2d", href: "/bid-proposals" },
];

export const activities: Activity[] = [
  { id: "ac1", actor: "Y. Mahmoud", action: "approved inspection", target: "IR-001 Pier P9 rebar", at: "2026-07-28T07:40:00Z" },
  { id: "ac2", actor: "S. Kareem", action: "submitted work order", target: "WO-0003 Tower B raft", at: "2026-07-28T06:10:00Z" },
  { id: "ac3", actor: "H. Nasser", action: "raised IPC", target: "IPC-06 Port Terminal 4", at: "2026-07-27T14:25:00Z" },
  { id: "ac4", actor: "N. Rahim", action: "raised inspection", target: "IR-006 Earthing test", at: "2026-07-27T11:05:00Z" },
  { id: "ac5", actor: "K. Osman", action: "rejected work order", target: "WO-0008 Rack transport", at: "2026-07-26T15:50:00Z" },
  { id: "ac6", actor: "T. Bakr", action: "closed inspection", target: "IR-004 Paving survey", at: "2026-07-26T09:15:00Z" },
  { id: "ac7", actor: "R. Salim", action: "uploaded drawing", target: "DWG-4412 Rev C", at: "2026-07-25T16:30:00Z" },
  { id: "ac8", actor: "A. Farouk", action: "updated BOQ", target: "RYD-101 item 03-315", at: "2026-07-25T10:20:00Z" },
  { id: "ac9", actor: "L. Habib", action: "submitted bid proposal", target: "BID-2026-014 Metro Depot", at: "2026-07-24T13:45:00Z" },
  { id: "ac10", actor: "D. Amin", action: "logged HSE observation", target: "Site s3 · near miss", at: "2026-07-24T08:00:00Z" },
  { id: "ac11", actor: "O. Haddad", action: "flagged NDT failure", target: "Weld batch 14", at: "2026-07-23T12:35:00Z" },
  { id: "ac12", actor: "M. Idris", action: "completed project", target: "RYD-103 Utility Corridor", at: "2026-07-22T17:10:00Z" },
];

export const hseStats = {
  loggedHours: 1284000,
  ltiFreeDays: 412,
  observations: 96,
  openIncidents: 3,
  inductions: 1470,
  audits: 22,
};
