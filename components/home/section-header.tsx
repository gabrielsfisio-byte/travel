import { LucideIcon } from "lucide-react";
import Link from "next/link";

export function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  href,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Icon className="size-5 text-primary" />
          <h2 className="font-display text-xl sm:text-2xl font-bold">{title}</h2>
        </div>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-primary hover:underline shrink-0">
          Ver tudo
        </Link>
      )}
    </div>
  );
}
