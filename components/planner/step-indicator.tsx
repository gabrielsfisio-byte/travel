"use client";

import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

export const PLANNER_STEPS = [
  "Destino",
  "Voo",
  "Hotel",
  "Transporte",
  "Atrações",
  "Restaurantes",
  "Resumo",
] as const;

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-1">
      {PLANNER_STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center shrink-0">
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors",
                active && "bg-primary text-white",
                done && !active && "bg-primary/15 text-primary",
                !active && !done && "bg-card text-muted"
              )}
            >
              {done ? <Check className="size-3" /> : <span>{i + 1}</span>}
              {label}
            </div>
            {i < PLANNER_STEPS.length - 1 && <div className="w-4 h-px bg-border shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}
