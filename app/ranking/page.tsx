"use client";

import { useMemo, useState } from "react";
import { Crown, Gem, PiggyBank, Trophy } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { computeLevel, countriesVisited } from "@/lib/achievements";
import {
  LEADERBOARD_ECONOMIA,
  LEADERBOARD_LUXO,
  LEADERBOARD_PAISES,
  LEADERBOARD_PONTUACAO,
} from "@/lib/data/gamification";
import type { LeaderboardEntry } from "@/types";
import { cn, formatBRL } from "@/utils/cn";

type CategoryKey = "economia" | "luxo" | "paises" | "pontuacao";

const CATEGORIES: { key: CategoryKey; label: string; icon: React.ElementType; formatValue: (v: number) => string }[] = [
  { key: "pontuacao", label: "Maior pontuação", icon: Trophy, formatValue: (v) => `${v} pts` },
  { key: "economia", label: "Maior economia", icon: PiggyBank, formatValue: (v) => formatBRL(v) },
  { key: "luxo", label: "Maior luxo", icon: Gem, formatValue: (v) => `${v}/100` },
  { key: "paises", label: "Mais países visitados", icon: Crown, formatValue: (v) => `${v} países` },
];

function medalColor(position: number) {
  if (position === 0) return "text-accent";
  if (position === 1) return "text-muted";
  if (position === 2) return "text-[#b5651d]";
  return "text-muted";
}

export default function RankingPage() {
  const [active, setActive] = useState<CategoryKey>("pontuacao");
  const completedTrips = useTravelStore((s) => s.completedTrips);

  const level = computeLevel(completedTrips);
  const countries = countriesVisited(completedTrips);
  const bestLuxuryScore = completedTrips.reduce((max, t) => Math.max(max, t.score), 0);
  const bestSavings = completedTrips.reduce((max, t) => Math.max(max, t.savings), 0);

  const you: LeaderboardEntry = {
    id: "you",
    name: "Você",
    avatarColor: "#2563EB",
    countriesVisited: countries.length,
    metric:
      active === "pontuacao"
        ? level.points
        : active === "economia"
          ? bestSavings
          : active === "luxo"
            ? bestLuxuryScore
            : countries.length,
  };

  const baseList = useMemo(() => {
    switch (active) {
      case "economia":
        return LEADERBOARD_ECONOMIA;
      case "luxo":
        return LEADERBOARD_LUXO;
      case "paises":
        return LEADERBOARD_PAISES;
      default:
        return LEADERBOARD_PONTUACAO;
    }
  }, [active]);

  const list = useMemo(() => {
    const withYou = completedTrips.length > 0 ? [...baseList, you] : baseList;
    return [...withYou].sort((a, b) => b.metric - a.metric);
  }, [baseList, completedTrips.length, you.metric]); // eslint-disable-line react-hooks/exhaustive-deps

  const activeCategory = CATEGORIES.find((c) => c.key === active)!;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold mb-2">Ranking</h1>
        <p className="text-sm text-muted">Veja como você se compara com outros viajantes fictícios.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={cn(
              "flex items-center gap-1.5 text-xs font-semibold rounded-full px-3.5 py-2 border transition-colors",
              active === cat.key ? "bg-primary text-white border-primary" : "border-border text-muted hover:text-foreground hover:bg-card"
            )}
          >
            <cat.icon className="size-3.5" />
            {cat.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {list.map((entry, i) => {
          const isYou = entry.id === "you";
          return (
            <div
              key={entry.id}
              className={cn(
                "flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-border last:border-b-0",
                isYou && "bg-primary/10"
              )}
            >
              <span className={cn("font-display font-extrabold text-lg w-7 text-center shrink-0", medalColor(i))}>
                {i + 1}
              </span>
              <span
                className="flex items-center justify-center size-9 rounded-full text-xs font-bold text-background shrink-0"
                style={{ backgroundColor: entry.avatarColor }}
              >
                {entry.name.slice(0, 2).toUpperCase()}
              </span>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-semibold truncate", isYou && "text-primary")}>
                  {entry.name}
                  {isYou && <span className="text-[10px] font-medium text-muted ml-1.5">(seu perfil)</span>}
                </p>
                <p className="text-[11px] text-muted">{entry.countriesVisited} países visitados</p>
              </div>
              <span className="font-display font-bold text-sm shrink-0">{activeCategory.formatValue(entry.metric)}</span>
            </div>
          );
        })}
      </div>

      {completedTrips.length === 0 && (
        <p className="text-xs text-muted text-center mt-4">
          Finalize uma viagem no Planejador para aparecer no ranking com seu próprio nome.
        </p>
      )}
    </div>
  );
}
