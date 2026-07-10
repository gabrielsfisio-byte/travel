"use client";

import * as Icons from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Flame } from "lucide-react";
import { cn } from "@/utils/cn";
import type { DailyChallenge } from "@/lib/daily-challenge";

export function DailyChallengeCard({ challenge, completed }: { challenge: DailyChallenge; completed: boolean }) {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[challenge.icon] ?? Icons.Flame;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border p-5 flex items-center gap-4",
        completed ? "border-primary/40 bg-primary/10" : "border-accent/30 bg-gradient-to-br from-card via-card to-accent/10"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center size-12 rounded-xl shrink-0",
          completed ? "bg-primary/20 text-primary" : "bg-accent/15 text-accent"
        )}
      >
        {completed ? <CheckCircle2 className="size-6" /> : <Icon className="size-6" />}
      </span>

      <div className="flex-1 min-w-0">
        <span className="flex items-center gap-1 text-[10px] font-bold text-accent uppercase tracking-wide mb-0.5">
          <Flame className="size-3" />
          Desafio de hoje
        </span>
        <h3 className="font-display font-bold text-base leading-tight">{challenge.title}</h3>
        <p className="text-xs text-muted mt-0.5">{challenge.description}</p>
      </div>

      {completed ? (
        <span className="text-xs font-bold text-primary shrink-0">Concluído! ✓</span>
      ) : (
        <Link
          href="/planejador"
          className="shrink-0 text-xs font-bold text-background bg-accent rounded-full px-3.5 py-2 hover:brightness-110 transition"
        >
          Encarar
        </Link>
      )}
    </motion.div>
  );
}
