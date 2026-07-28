import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Gavel,
  FileSignature,
  FolderKanban,
  DraftingCompass,
  ClipboardList,
  CalendarRange,
  ListTree,
  Package,
  SearchCheck,
  HardHat,
  ReceiptText,
  Files,
  Inbox,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { approvals } from "@/lib/erp-data";

const groups = [
  {
    label: "Dashboard",
    items: [{ title: "Dashboard", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Pre-Construction",
    items: [
      { title: "Bids", url: "/bids", icon: Gavel },
      { title: "Bid Proposals", url: "/bid-proposals", icon: FileSignature },
      { title: "Projects", url: "/projects", icon: FolderKanban },
      { title: "Drawings", url: "/drawings", icon: DraftingCompass },
    ],
  },
  {
    label: "Execution",
    items: [
      { title: "Work Orders", url: "/work-orders", icon: ClipboardList },
      { title: "Planning & Schedule", url: "/planning", icon: CalendarRange },
      { title: "Items & BOQ", url: "/items", icon: ListTree },
      { title: "Materials", url: "/materials", icon: Package },
    ],
  },
  {
    label: "Quality & Safety",
    items: [
      { title: "Inspection Requests", url: "/inspection-requests", icon: SearchCheck },
      { title: "HSE / Environment", url: "/hse", icon: HardHat },
    ],
  },
  {
    label: "Commercial",
    items: [
      { title: "IPCs", url: "/ipcs", icon: ReceiptText },
      { title: "Documents", url: "/documents", icon: Files },
    ],
  },
  {
    label: "Admin",
    items: [
      { title: "Approvals Inbox", url: "/approvals", icon: Inbox, badge: approvals.length },
      { title: "Reports", url: "/reports", icon: BarChart3 },
      { title: "Settings", url: "/settings", icon: Settings },
    ],
  },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-1 py-1.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            <Building2 className="size-4" />
          </span>
          <div className="grid leading-tight group-data-[collapsible=icon]:hidden">
            <span className="font-display text-sm font-bold tracking-tight">EZY PM</span>
            <span className="text-[11px] text-sidebar-foreground/60">Construction Portal</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[11px] tracking-wider uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {"badge" in item && item.badge ? (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
