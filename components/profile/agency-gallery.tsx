"use client";

import * as Icons from "lucide-react";
import { Lock } from "lucide-react";
import { AGENCIES } from "@/lib/agencies";
import type { Achievement } from "@/types";
import { cn } from "@/utils/cn";

export function AgencyGallery({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {AGENCIES.map((agency) => {
        const unlocked = achievements.find((a) => a.id === agency.achievementId)?.unlocked ?? false;
        const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[agency.icon] ?? Icons.Award;

        return (
          <div
            key={agency.achievementId}
            className={cn(
              "rounded-xl border p-4 flex items-center gap-3",
              unlocked ? "border-border bg-card" : "border-border bg-card opacity-45"
            )}
          >
            <span className={cn("flex items-center justify-center size-11 rounded-xl shrink-0", agency.colorClass)}>
              {unlocked ? <Icon className="size-5" /> : <Lock className="size-4" />}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-sm">{agency.name}</p>
              <p className="text-xs text-muted">{agency.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
