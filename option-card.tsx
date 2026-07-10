"use client";

import { motion } from "framer-motion";
import { Heart, Leaf, Mountain, Wallet } from "lucide-react";
import { cn, formatBRL } from "@/utils/cn";

interface StatBarProps {
  icon: React.ElementType;
  label: string;
  value: number; // 0-100
  colorClass: string;
}

function StatBar({ icon: Icon, label, value, colorClass }: StatBarProps) {
  return (
    <div className="flex-1 min-w-[120px]">
      <div className="flex items-center gap-1.5 mb-1.5">
        <Icon className="size-3.5 text-muted" />
        <span className="text-xs font-medium text-muted">{label}</span>
      </div>
      <div className="h-2 rounded-full bg-border overflow-hidden">
        <motion.div
          className={cn("h-full rounded-full", colorClass)}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function LiveStatsBar({
  budget,
  remainingBudget,
  comfort,
  adventure,
  sustainability,
}: {
  budget: number;
  remainingBudget: number;
  comfort: number;
  adventure: number;
  sustainability: number;
}) {
  const overBudget = remainingBudget < 0;

  return (
    <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="flex items-center gap-2 shrink-0">
          <Wallet className={cn("size-4", overBudget ? "text-danger" : "text-accent")} />
          <div>
            <p className={cn("text-sm font-bold tabular-nums", overBudget ? "text-danger" : "text-foreground")}>
              {formatBRL(remainingBudget)}
            </p>
            <p className="text-[11px] text-muted">restante de {formatBRL(budget)}</p>
          </div>
        </div>

        <div className="flex flex-1 gap-4 flex-wrap">
          <StatBar icon={Heart} label="Conforto" value={comfort} colorClass="bg-secondary" />
          <StatBar icon={Mountain} label="Aventura" value={adventure} colorClass="bg-primary" />
          <StatBar icon={Leaf} label="Sustentabilidade" value={sustainability} colorClass="bg-accent" />
        </div>
      </div>
    </div>
  );
}
