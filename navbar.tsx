import { cn } from "@/utils/cn";

export function MetaChip({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-muted">
      <span className={cn("size-1.5 rounded-full", colorClass)} />
      {label} {value}%
    </span>
  );
}
