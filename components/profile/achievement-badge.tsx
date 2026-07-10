"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { Achievement } from "@/types";

export function AchievementBadge({ achievement, index = 0 }: { achievement: Achievement; index?: number }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[achievement.icon] ?? Icons.Award;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={cn(
        "rounded-xl border p-4 flex flex-col items-center text-center gap-2",
        achievement.unlocked ? "border-primary/40 bg-primary/10" : "border-border bg-card opacity-50"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center size-11 rounded-full",
          achievement.unlocked ? "bg-primary/20 text-primary" : "bg-border text-muted"
        )}
      >
        <Icon className="size-5" />
      </span>
      <p className="text-xs font-semibold leading-tight">{achievement.title}</p>
      <p className="text-[11px] text-muted leading-tight">{achievement.description}</p>
    </motion.div>
  );
}
