import type { CompletedTrip } from "@/types";

const ASIA_COUNTRIES = ["Japão", "Indonésia"];

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  icon: string;
  check: (trip: CompletedTrip) => boolean;
}

const CHALLENGES: DailyChallenge[] = [
  {
    id: "budget-8k",
    title: "Desafio Econômico",
    description: "Monte uma viagem completa gastando menos de R$ 8.000.",
    icon: "PiggyBank",
    check: (t) => t.totalCost < 8000,
  },
  {
    id: "luxury-5star",
    title: "Desafio de Luxo",
    description: "Finalize uma viagem em um hotel 5 estrelas.",
    icon: "Gem",
    check: (t) => t.hotel.stars === 5,
  },
  {
    id: "three-attractions",
    title: "Desafio Explorador",
    description: "Escolha pelo menos 3 atrações na mesma viagem.",
    icon: "Compass",
    check: (t) => t.attractionsCount >= 3,
  },
  {
    id: "big-savings",
    title: "Desafio Econômico II",
    description: "Economize mais de 30% do seu orçamento em uma viagem.",
    icon: "TrendingDown",
    check: (t) => t.savings > 0 && t.savings / (t.totalCost + t.savings) > 0.3,
  },
  {
    id: "asia-trip",
    title: "Desafio Asiático",
    description: "Monte uma viagem para um destino na Ásia.",
    icon: "Globe2",
    check: (t) => ASIA_COUNTRIES.includes(t.destination.country),
  },
  {
    id: "foodie-trip",
    title: "Desafio Gourmet",
    description: "Escolha pelo menos 2 restaurantes na mesma viagem.",
    icon: "UtensilsCrossed",
    check: (t) => t.restaurantsCount >= 2,
  },
  {
    id: "backpacker-trip",
    title: "Desafio Mochileiro",
    description: "Monte uma viagem gastando menos de R$ 5.000, sem hotel de luxo.",
    icon: "Backpack",
    check: (t) => t.totalCost < 5000 && t.hotel.stars <= 3,
  },
  {
    id: "long-trip",
    title: "Desafio Maratona",
    description: "Planeje uma viagem de 7 noites ou mais.",
    icon: "CalendarDays",
    check: (t) => t.nights >= 7,
  },
];

function dayOfYear(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function getTodayChallenge(): DailyChallenge {
  const index = dayOfYear(new Date()) % CHALLENGES.length;
  return CHALLENGES[index];
}

function isToday(isoDate: string) {
  const d = new Date(isoDate);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

export function isChallengeCompletedToday(challenge: DailyChallenge, trips: CompletedTrip[]): boolean {
  return trips.some((t) => isToday(t.createdAt) && challenge.check(t));
}
