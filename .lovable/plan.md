# EZY PM — Construction Project Management Portal

## What the reference screenshot is

A construction/contracting ERP dashboard (BOQ, Work Orders, IPCs, Inspection Requests, HSE, Materials).

**Sidebar today (16 items, flat, no grouping):** Documents, Projects, Items, Drawing Management Section, Bids, Bid Proposal, Bid Proposal Approvals, Work Order, Approved Work Order, Planning, Inspection Requests, IR Approvals, IPCs, IPC Approvals, HSE/Environment, Materials Section.

**Problems found**

1. Flat 16-item list, no grouping — you must scan everything to find one item.
2. Four duplicated "X" / "X Approvals" pairs (Bid Proposal, Work Order, IR, IPC) waste 8 of 16 slots. Approvals belong as tabs inside the parent module plus one unified inbox.
3. Order is not lifecycle-based. Real flow: Bid → Award → Plan → Execute → Inspect → Certify → Get Paid.
4. Five KPI tiles in five saturated colours with white text — no hierarchy, poor contrast on yellow, grey tile reads as disabled.
5. Numbers have no currency symbol, no period, no % change, no target.
6. Charts cramped: 2 bars in a wide frame, duplicated legend, heavy gridlines.
7. Table has no status column, no row actions, no totals row.
8. Right rail mixes 6 stat cards + activity feed in a narrow column; icons purely decorative.
9. No top bar — no search, notifications, or user menu.
10. Site/Project filters float in the header, disconnected from what they filter.

## Regrouped sidebar (lifecycle order)

```text
DASHBOARD        Dashboard
PRE-CONSTRUCTION Bids · Bid Proposals · Projects · Drawings
EXECUTION        Work Orders · Planning & Schedule · Items & BOQ · Materials
QUALITY & SAFETY Inspection Requests · HSE / Environment
COMMERCIAL       IPCs · Documents
ADMIN            Approvals Inbox · Reports · Settings
```

16 flat items become 15 items in 6 collapsible groups. The 4 "Approvals" duplicates collapse into module tabs (Draft / Submitted / Approved etc.) plus one Approvals Inbox with a live count badge. Active group stays open; sidebar collapses to an icon rail on narrow screens.

## Dashboard layout

```text
TOPBAR    breadcrumb · search · notifications · user menu
FILTERBAR Site ▾  Project ▾  Date range ▾  [Export]   (sticky)
KPI ROW   Contract · Work Done · Remaining BOQ · IPC Certified · Adv. Payment
          each: label, big value, delta vs last month, sparkline
LEFT  (2/3)                        RIGHT (1/3)
  Financial Progress (stacked)       Portfolio Stats (2x3)
  Monthly Work Done (actual/plan)    Approvals Pending (actionable)
  Project Table (+status, %, totals) Recent Activity (grouped by day)
BOTTOM    Material Consumption donut + Inventory summary
```

Fixes: neutral KPI cards with a coloured accent bar instead of 5 saturated tiles; currency symbols and thousands separators everywhere; stacked bars (Done / Certified / Remaining); planned-vs-actual area line; status chips, inline progress bars and a totals row in the table; approvals become clickable; filter bar sticky and clearly owns the page.

## Theme — "Navy Trust"

Deep navy `#0f1b3d`, mid navy `#1e3a5f`, steel `#3b6fa0`, page tint `#e8edf3`. Near-white cards on grey-blue background, 1px borders, low-lift shadow. Semantic accents: success `#0d7a5f`, warning `#c9821a`, danger `#b3261e`, info `#3b6fa0`. Status chips: Draft grey, Pending amber, Approved green, Rejected red, In Progress blue. Typography Urbanist headings + Epilogue body via `<link>` in the root route. Radius 0.5rem, tabular-nums on all numbers, full light + dark mode. All colours as oklch tokens in `src/styles.css`; no hardcoded colour utilities.

## Dummy data

3 sites (Riyadh North, Jeddah Port, Dammam Industrial), 12 projects with 8 active, BOQ items with qty/rate/amount, 17 work orders, 6 inspection requests, 4 IPCs, 9 material requests, 6 months of actual-vs-planned work done, inventory 234,500 total / 41,850 consumed / 192,650 balance, 12 activity entries, 9 pending approvals across 4 types, team members for avatars. Typed seed module behind a React context so swapping to a real backend is a one-file change.

## First portal

The **Dashboard** at `/`, replacing the placeholder, rebuilt with every improvement above. All 15 nav items render in their groups and are clickable; non-dashboard routes get a consistent module scaffold (title, filter bar, tabs, table with dummy rows) so nothing 404s, and each gets built out fully on request.

## Technical

- `src/styles.css` — Navy Trust oklch tokens, status + chart tokens, font tokens under `@theme inline`.
- `src/routes/__root.tsx` — Google Fonts `<link>`, `SidebarProvider`, `AppSidebar` + `Topbar` around `<Outlet />`, real app metadata.
- `src/components/layout/` — `app-sidebar.tsx` (grouped collapsible nav, active highlight via `useRouterState`, icon rail, approvals badge), `topbar.tsx`, `module-scaffold.tsx`.
- `src/components/dashboard/` — filter bar, KPI cards, financial + monthly charts, project table, portfolio stats, approvals panel, activity feed, material consumption.
- `src/components/ui/status-chip.tsx` — cva status pill.
- `src/lib/erp-data.ts` (types + seed), `src/lib/erp-context.tsx` (filters + selectors), `src/lib/format.ts` (currency / number / relative time).
- `src/routes/index.tsx` dashboard plus one route per nav item, each with unique `head()` metadata.
- recharts + lucide-react (already installed); sidebar widths use the v4 `w-(--sidebar-width)` syntax already present.
- Verify with a build and a headless browser pass at desktop and mobile widths.

## Out of scope this phase

Backend, auth, persistence, file uploads, per-module CRUD forms.
