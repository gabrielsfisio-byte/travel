"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, Flag, Heart, MapPin, Sparkles, TrendingUp, Trophy, User } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { computeAchievements, computeLevel, countriesVisited } from "@/lib/achievements";
import { AchievementBadge } from "@/components/profile/achievement-badge";
import { TripHistoryCard } from "@/components/profile/trip-history-card";
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

  const achievements = computeAchievements(completedTrips);
  const level = computeLevel(completedTrips);
  const countries = countriesVisited(completedTrips);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  const totalFavorites =
    favorites.destinations.length + favorites.hotels.length + favorites.restaurants.length + favorites.attractions.length;

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
    </div>
  );
}
