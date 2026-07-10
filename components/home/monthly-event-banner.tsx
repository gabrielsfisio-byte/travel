"use client";

import { motion } from "framer-motion";
import { getCurrentMonthlyEvent } from "@/lib/monthly-event";

export function MonthlyEventBanner() {
  const event = getCurrentMonthlyEvent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-secondary/30 bg-gradient-to-r from-secondary/15 via-secondary/5 to-transparent p-4 sm:p-5 flex items-center gap-4"
    >
      <span className="text-3xl shrink-0">{event.badge}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-secondary uppercase tracking-wide mb-0.5">Evento do mês</p>
        <h3 className="font-display font-bold text-base leading-tight">{event.title}</h3>
        <p className="text-xs text-muted mt-0.5">{event.description}</p>
      </div>
    </motion.div>
  );
}
