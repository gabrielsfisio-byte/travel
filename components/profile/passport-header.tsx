"use client";

import { motion } from "framer-motion";
import { Palette, Stamp, User, Wand2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/utils/cn";
import { getAvailableThemes, PASSPORT_THEMES } from "@/lib/passport-theme";
import type { LevelInfo } from "@/lib/achievements";

export function PassportHeader({
  level,
  countriesCount,
  theme,
  onThemeChange,
  onOpenWrapped,
  hasTrips,
}: {
  level: LevelInfo;
  countriesCount: number;
  theme: string;
  onThemeChange: (id: string) => void;
  onOpenWrapped: () => void;
  hasTrips: boolean;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const activeTheme = PASSPORT_THEMES.find((t) => t.id === theme) ?? PASSPORT_THEMES[0];
  const availableThemes = getAvailableThemes(level.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-2xl border border-border bg-gradient-to-br p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 overflow-hidden",
        activeTheme.gradient
      )}
    >
      <span className="flex items-center justify-center size-16 rounded-2xl bg-primary/15 text-primary shrink-0">
        <User className="size-8" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted mb-1 flex items-center gap-1.5">
          Passaporte fictício
          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-muted/80">
            <Stamp className="size-3" /> {countriesCount} selos
          </span>
        </p>
        <h1 className="font-display text-2xl font-extrabold">Viajante Anônimo</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs font-bold text-white bg-primary rounded-full px-3 py-1">Nível {level.name}</span>
          <span className="text-xs text-muted">{level.points} pts</span>
        </div>
        {level.nextLevelPoints !== null && (
          <div className="mt-3 max-w-xs">
            <div className="h-1.5 rounded-full bg-border overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${level.progressPct}%` }} />
            </div>
            <p className="text-[11px] text-muted mt-1">
              Faltam {Math.max(0, level.nextLevelPoints - level.points)} pts para o próximo nível
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        {hasTrips && (
          <button
            onClick={onOpenWrapped}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-primary to-secondary text-white font-bold px-4 py-2.5 text-sm hover:brightness-110 transition"
          >
            <Wand2 className="size-4" />
            Ver meu Wrapped
          </button>
        )}
        <div className="relative">
          <button
            onClick={() => setPickerOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-xs font-semibold hover:bg-card-hover transition w-full justify-center"
          >
            <Palette className="size-3.5" />
            Capa do passaporte
          </button>
          {pickerOpen && (
            <div className="absolute right-0 mt-2 z-20 rounded-xl border border-border bg-background p-2 flex flex-col gap-1 w-48 shadow-xl">
              {availableThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    onThemeChange(t.id);
                    setPickerOpen(false);
                  }}
                  className={cn(
                    "text-left text-xs font-medium rounded-lg px-3 py-2 hover:bg-card transition",
                    theme === t.id && "bg-card text-primary"
                  )}
                >
                  {t.label}
                </button>
              ))}
              {availableThemes.length < PASSPORT_THEMES.length && (
                <p className="text-[10px] text-muted px-3 pt-1">Suba de nível pra desbloquear mais capas.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
