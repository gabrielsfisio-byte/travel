"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Flag, Heart, MapPin, Sparkles, TrendingUp, Trophy, User, Wand2 } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { computeAchievements, computeLevel, computeWrappedStats, countriesVisited } from "@/lib/achievements";
import { AchievementBadge } from "@/components/profile/achievement-badge";
import { CountryCollection } from "@/components/profile/country-collection";
import { TripHistoryCard } from "@/components/profile/trip-history-card";
import { WrappedModal } from "@/components/profile/wrapped-modal";
import { PremiumGate } from "@/components/premium-gate";
import { useAuth } from "@/hooks/use-auth";
import { formatBRL } from "@/utils/cn";

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
      <span className="flex items-center justify-center size-9 rounded-lg bg-secondary/15 text-secondary shrink-0">
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-lg font-display font-bold leading-none">{value}</p>
        <p className="text-xs text-muted mt-1">{label}</p>
      </div>
    </div>
  );
}

export default function PerfilPage() {
  const completedTrips = useTravelStore((s) => s.completedTrips);
  const favorites = useTravelStore((s) => s.favorites);
  const { isPremium } = useAuth();

  const achievements = computeAchievements(completedTrips);
  const level = computeLevel(completedTrips);
  const countries = countriesVisited(completedTrips);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const totalFavorites =
    favorites.destinations.length + favorites.hotels.length + favorites.restaurants.length + favorites.attractions.length;

  const totalSpent = completedTrips.reduce((a, t) => a + t.totalCost, 0);
  const avgScore = completedTrips.length
    ? Math.round(completedTrips.reduce((a, t) => a + t.score, 0) / completedTrips.length)
    : 0;
  const totalSaved = completedTrips.reduce((a, t) => a + t.savings, 0);
  const wrappedStats = computeWrappedStats(completedTrips);
  const [showWrapped, setShowWrapped] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 flex flex-col gap-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5"
      >
        <span className="flex items-center justify-center size-16 rounded-2xl bg-primary/15 text-primary shrink-0">
          <User className="size-8" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted mb-1">Perfil fictício</p>
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
        {completedTrips.length > 0 && (
          <button
            onClick={() => setShowWrapped(true)}
            className="shrink-0 flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-primary to-secondary text-white font-bold px-4 py-2.5 text-sm hover:brightness-110 transition"
          >
            <Wand2 className="size-4" />
            Ver meu Wrapped
          </button>
        )}
      </motion.div>

      {/* Stats */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="size-5 text-primary" />
          Estatísticas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard icon={Compass} label="Viagens criadas" value={completedTrips.length} />
          <StatCard icon={Flag} label="Países visitados" value={countries.length} />
          <StatCard icon={Trophy} label="Conquistas" value={`${unlockedCount}/${achievements.length}`} />
          <StatCard icon={Heart} label="Favoritos salvos" value={totalFavorites} />
        </div>
      </div>

      {/* Country Collection */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Compass className="size-5 text-primary" />
          Coleção de países
        </h2>
        <CountryCollection visitedCountries={countries} />
      </div>

      {/* Advanced stats (Premium) */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="size-5 text-accent" />
          Estatísticas avançadas
        </h2>
        <PremiumGate isPremium={isPremium} title="Estatísticas avançadas são exclusivas para assinantes Premium">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted mb-1">Total gasto (fictício)</p>
              <p className="font-display font-bold text-lg">{formatBRL(totalSpent)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted mb-1">Total economizado</p>
              <p className="font-display font-bold text-lg text-primary">{formatBRL(totalSaved)}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted mb-1">Pontuação média</p>
              <p className="font-display font-bold text-lg text-accent">{avgScore}/100</p>
            </div>
          </div>
        </PremiumGate>
      </div>

      {/* Achievements */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="size-5 text-accent" />
          Conquistas
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map((a, i) => (
            <AchievementBadge key={a.id} achievement={a} index={i} />
          ))}
        </div>
      </div>

      {/* Trip history */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <MapPin className="size-5 text-secondary" />
          Viagens criadas
        </h2>
        {completedTrips.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-8 text-center flex flex-col items-center gap-3">
            <p className="text-sm text-muted">Você ainda não finalizou nenhuma viagem.</p>
            <Link href="/planejador" className="rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2 hover:brightness-110 transition">
              Montar minha primeira viagem
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {completedTrips.map((trip) => (
              <TripHistoryCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </div>

      {showWrapped && <WrappedModal stats={wrappedStats} onClose={() => setShowWrapped(false)} />}
    </div>
  );
}
