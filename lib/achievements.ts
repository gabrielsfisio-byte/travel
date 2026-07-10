import type { Achievement, CompletedTrip } from "@/types";

export const CONTINENT_BY_COUNTRY: Record<string, string> = {
  Brasil: "América",
  Argentina: "América",
  "Estados Unidos": "América",
  França: "Europa",
  Grécia: "Europa",
  Japão: "Ásia",
  Indonésia: "Ásia",
  Marrocos: "África",
};

export function continentsVisited(trips: CompletedTrip[]): string[] {
  const set = new Set<string>();
  trips.forEach((t) => {
    const continent = CONTINENT_BY_COUNTRY[t.destination.country];
    if (continent) set.add(continent);
  });
  return Array.from(set);
}

export function countriesVisited(trips: CompletedTrip[]): string[] {
  return Array.from(new Set(trips.map((t) => t.destination.country)));
}

interface AchievementDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (trips: CompletedTrip[]) => boolean;
}

const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: "first-trip",
    title: "Primeira Viagem",
    description: "Complete seu primeiro roteiro.",
    icon: "Plane",
    check: (trips) => trips.length >= 1,
  },
  {
    id: "backpacker",
    title: "Mochileiro",
    description: "Finalize uma viagem gastando menos de R$ 5.000.",
    icon: "Backpack",
    check: (trips) => trips.some((t) => t.totalCost < 5000),
  },
  {
    id: "world-explorer",
    title: "Explorador Mundial",
    description: "Visite destinos em 3 continentes diferentes.",
    icon: "Globe2",
    check: (trips) => continentsVisited(trips).length >= 3,
  },
  {
    id: "deal-hunter",
    title: "Caçador de Promoções",
    description: "Use 5 promoções fictícias.",
    icon: "Tag",
    check: (trips) => trips.filter((t) => t.hadPromo).length >= 5,
  },
  {
    id: "foodie",
    title: "Amante da Gastronomia",
    description: "Escolha 10 restaurantes no total entre suas viagens.",
    icon: "UtensilsCrossed",
    check: (trips) => trips.reduce((a, t) => a + t.restaurantsCount, 0) >= 10,
  },
  {
    id: "luxury",
    title: "Luxo Total",
    description: "Complete uma viagem em hotel 5 estrelas.",
    icon: "Gem",
    check: (trips) => trips.some((t) => t.hotel.stars === 5),
  },
  {
    id: "budget-traveler",
    title: "Viajante Econômico",
    description: "Economize mais de 40% do orçamento em uma viagem.",
    icon: "PiggyBank",
    check: (trips) => trips.some((t) => t.savings > 0 && t.savings / (t.totalCost + t.savings) > 0.4),
  },
  {
    id: "country-collector",
    title: "Colecionador de Países",
    description: "Planeje viagens para 5 países diferentes.",
    icon: "Map",
    check: (trips) => countriesVisited(trips).length >= 5,
  },
];

export function computeAchievements(trips: CompletedTrip[]): Achievement[] {
  return ACHIEVEMENT_DEFS.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    icon: def.icon,
    unlocked: def.check(trips),
  }));
}

export interface WrappedStats {
  totalTrips: number;
  countriesCount: number;
  totalAttractions: number;
  totalRestaurants: number;
  totalBudgetUsed: number;
  favoriteContinent: string | null;
  mostChosenCity: string | null;
  bestScore: number;
}

function mostFrequent<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  const counts = new Map<T, number>();
  items.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1));
  let best: T | null = null;
  let bestCount = 0;
  counts.forEach((count, item) => {
    if (count > bestCount) {
      best = item;
      bestCount = count;
    }
  });
  return best;
}

export function computeWrappedStats(trips: CompletedTrip[]): WrappedStats {
  const continents = trips.map((t) => CONTINENT_BY_COUNTRY[t.destination.country]).filter(Boolean) as string[];
  const cities = trips.map((t) => t.destination.city);

  return {
    totalTrips: trips.length,
    countriesCount: countriesVisited(trips).length,
    totalAttractions: trips.reduce((a, t) => a + t.attractionsCount, 0),
    totalRestaurants: trips.reduce((a, t) => a + t.restaurantsCount, 0),
    totalBudgetUsed: trips.reduce((a, t) => a + t.totalCost, 0),
    favoriteContinent: mostFrequent(continents),
    mostChosenCity: mostFrequent(cities),
    bestScore: trips.reduce((max, t) => Math.max(max, t.score), 0),
  };
}

export interface LevelInfo {
  name: string;
  points: number;
  nextLevelPoints: number | null;
  progressPct: number;
}

const LEVEL_TIERS = [
  { name: "Iniciante", min: 0 },
  { name: "Aventureiro", min: 100 },
  { name: "Explorador", min: 250 },
  { name: "Lenda Viajante", min: 500 },
];

export function computeLevel(trips: CompletedTrip[]): LevelInfo {
  const points = trips.reduce((a, t) => a + t.score, 0);
  let tierIndex = 0;
  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (points >= LEVEL_TIERS[i].min) tierIndex = i;
  }
  const current = LEVEL_TIERS[tierIndex];
  const next = LEVEL_TIERS[tierIndex + 1] ?? null;
  const progressPct = next ? ((points - current.min) / (next.min - current.min)) * 100 : 100;

  return {
    name: current.name,
    points,
    nextLevelPoints: next?.min ?? null,
    progressPct: Math.min(100, Math.max(0, progressPct)),
  };
}
