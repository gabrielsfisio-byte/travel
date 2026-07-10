"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, Flag, Heart, MapPin, Sparkles, Swords, TrendingUp, Trophy } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { computeAchievements, computeLevel, computeWrappedStats, countriesVisited } from "@/lib/achievements";
import { getCronica } from "@/lib/cronicas";
import { AchievementBadge } from "@/components/profile/achievement-badge";
import { CountryCollection } from "@/components/profile/country-collection";
import { TripHistoryCard } from "@/components/profile/trip-history-card";
import { WrappedModal } from "@/components/profile/wrapped-modal";
import { PassportHeader } from "@/components/profile/passport-header";
import { SecretDestinationsGallery } from "@/components/profile/secret-destinations-gallery";
import { AgencyGallery } from "@/components/profile/agency-gallery";
import { CreateChallengeModal } from "@/components/challenge/create-challenge-modal";
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
  const profileTheme = useTravelStore((s) => s.profileTheme);
  const setProfileTheme = useTravelStore((s) => s.setProfileTheme);
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
  const [showChallenge, setShowChallenge] = useState(false);

  // Cronicas: countries visited 3+ times unlock a flavor text.
  const countryCounts = new Map<string, number>();
  completedTrips.forEach((t) => countryCounts.set(t.destination.country, (countryCounts.get(t.destination.country) ?? 0) + 1));
  const cronicas = Array.from(countryCounts.entries())
    .map(([country, count]) => ({ country, text: getCronica(country, count) }))
    .filter((c) => c.text);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 flex flex-col gap-10">
      <PassportHeader
        level={level}
        countriesCount={countries.length}
        theme={profileTheme}
        onThemeChange={setProfileTheme}
        onOpenWrapped={() => setShowWrapped(true)}
        hasTrips={completedTrips.length > 0}
      />

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

      {/* Desafiar amigo */}
      <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center size-11 rounded-xl bg-secondary/15 text-secondary shrink-0">
            <Swords className="size-5" />
          </span>
          <div>
            <p className="font-display font-bold text-sm">Desafie um amigo</p>
            <p className="text-xs text-muted">Envie um destino e orçamento fixo — quem monta a melhor viagem?</p>
          </div>
        </div>
        <button
          onClick={() => setShowChallenge(true)}
          className="rounded-xl bg-secondary text-white font-semibold px-4 py-2.5 text-sm hover:brightness-110 transition shrink-0"
        >
          Criar desafio
        </button>
      </div>

      {/* Country Collection */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Compass className="size-5 text-primary" />
          Coleção de países
        </h2>
        <CountryCollection visitedCountries={countries} />
      </div>

      {/* Secret destinations */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="size-5 text-accent" />
          Destinos secretos
        </h2>
        <SecretDestinationsGallery trips={completedTrips} />
      </div>

      {/* Cronicas */}
      {cronicas.length > 0 && (
        <div>
          <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
            <Sparkles className="size-5 text-accent" />
            Crônicas de viagem
          </h2>
          <div className="flex flex-col gap-3">
            {cronicas.map((c) => (
              <div key={c.country} className="rounded-xl border border-accent/30 bg-accent/5 p-4">
                <p className="text-xs font-bold text-accent mb-1">{c.country}</p>
                <p className="text-sm">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Agencies */}
      <div>
        <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
          <Trophy className="size-5 text-primary" />
          Agências desbloqueadas
        </h2>
        <AgencyGallery achievements={achievements} />
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
      {showChallenge && <CreateChallengeModal onClose={() => setShowChallenge(false)} />}
    </div>
  );
}
