"use client";

import { Flame } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { computeStreak } from "@/lib/streak";

export function StreakBadge() {
  const completedTrips = useTravelStore((s) => s.completedTrips);
  const streak = computeStreak(completedTrips);

  if (streak < 2) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs font-bold text-accent bg-accent/10 border border-accent/30 rounded-full px-3 py-1.5 w-fit">
      <Flame className="size-3.5" />
      {streak} dias seguidos planejando viagens 🔥
    </div>
  );
}
