import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const statusChipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      status: {
        draft: "border-border bg-muted text-muted-foreground",
        pending: "border-warning/30 bg-warning/15 text-warning",
        approved: "border-success/30 bg-success/15 text-success",
        rejected: "border-destructive/30 bg-destructive/15 text-destructive",
        active: "border-info/30 bg-info/15 text-info",
        onhold: "border-border bg-secondary text-secondary-foreground",
        completed: "border-success/30 bg-success/15 text-success",
      },
    },
    defaultVariants: { status: "draft" },
  },
);

export type StatusKey = NonNullable<VariantProps<typeof statusChipVariants>["status"]>;

const LABELS: Record<StatusKey, string> = {
  draft: "Draft",
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  active: "In Progress",
  onhold: "On Hold",
  completed: "Completed",
};

export function StatusChip({
  status,
  label,
  className,
}: {
  status: StatusKey;
  label?: string;
  className?: string;
}) {
  return (
    <span className={cn(statusChipVariants({ status }), className)}>
      <span className="size-1.5 rounded-full bg-current" />
      {label ?? LABELS[status]}
    </span>
  );
}
