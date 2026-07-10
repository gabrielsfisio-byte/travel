"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn, formatBRL } from "@/utils/cn";

export function OptionCard({
  title,
  subtitle,
  price,
  priceSuffix,
  selected,
  onClick,
  meta,
}: {
  title: string;
  subtitle?: string;
  price: number;
  priceSuffix?: string;
  selected: boolean;
  onClick: () => void;
  meta?: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left rounded-xl border p-4 transition-colors flex flex-col gap-2",
        selected ? "border-primary bg-primary/10" : "border-border bg-card hover:bg-card-hover"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-sm">{title}</p>
          {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-display font-bold text-sm">
            {formatBRL(price)}
            {priceSuffix && <span className="text-muted font-normal text-xs">{priceSuffix}</span>}
          </span>
          {selected && (
            <span className="flex items-center justify-center size-5 rounded-full bg-primary text-white">
              <Check className="size-3" />
            </span>
          )}
        </div>
      </div>
      {meta}
    </motion.button>
  );
}
