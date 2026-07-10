"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { DESTINATIONS } from "@/lib/data/destinations";
import { cn } from "@/utils/cn";

export function CountryCollection({ visitedCountries }: { visitedCountries: string[] }) {
  const allCountries = Array.from(new Set(DESTINATIONS.map((d) => d.country))).sort();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs text-muted">
          {visitedCountries.length} de {allCountries.length} países colecionados
        </p>
        <div className="h-1.5 w-24 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(visitedCountries.length / allCountries.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {allCountries.map((country, i) => {
          const visited = visitedCountries.includes(country);
          return (
            <motion.div
              key={country}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "relative rounded-xl border p-3 flex flex-col items-center gap-1.5 text-center aspect-square justify-center",
                visited ? "border-primary/40 bg-primary/10" : "border-border bg-card opacity-40"
              )}
            >
              {visited && <CheckCircle2 className="absolute top-1.5 right-1.5 size-3.5 text-primary" />}
              <span className={cn("text-xs font-semibold leading-tight", !visited && "blur-[2px]")}>{country}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
