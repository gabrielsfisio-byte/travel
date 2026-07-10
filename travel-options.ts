"use client";

import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import type { Destination } from "@/types";

export function PromoStrip({ destinations }: { destinations: Destination[] }) {
  const promos = destinations.filter((d) => d.promo);
  if (promos.length === 0) return null;

  return (
    <div className="rounded-2xl glass p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-center overflow-x-auto">
      <div className="flex items-center gap-2 shrink-0 text-accent font-semibold text-sm">
        <Tag className="size-4" />
        Promoções fictícias da semana
      </div>
      <div className="flex gap-3 overflow-x-auto">
        {promos.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2 rounded-xl bg-card border border-border px-3 py-2 shrink-0"
          >
            <span className="text-sm font-semibold whitespace-nowrap">{d.city}</span>
            <span className="text-xs font-bold text-background bg-accent rounded-full px-2 py-0.5 whitespace-nowrap">
              -{d.promo!.discountPct}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
