import type { Achievement, LeaderboardEntry } from "@/types";

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-trip", title: "Primeira Viagem", description: "Complete seu primeiro roteiro.", icon: "Plane", unlocked: true },
  { id: "backpacker", title: "Mochileiro", description: "Finalize uma viagem gastando menos de R$ 5.000.", icon: "Backpack", unlocked: true },
  { id: "world-explorer", title: "Explorador Mundial", description: "Visite destinos em 3 continentes diferentes.", icon: "Globe2", unlocked: false },
  { id: "deal-hunter", title: "Caçador de Promoções", description: "Use 5 promoções fictícias.", icon: "Tag", unlocked: false },
  { id: "foodie", title: "Amante da Gastronomia", description: "Escolha 10 restaurantes diferentes.", icon: "UtensilsCrossed", unlocked: false },
  { id: "luxury", title: "Luxo Total", description: "Complete uma viagem 5 estrelas do início ao fim.", icon: "Gem", unlocked: false },
  { id: "budget-traveler", title: "Viajante Econômico", description: "Economize mais de 40% do orçamento.", icon: "PiggyBank", unlocked: false },
  { id: "country-collector", title: "Colecionador de Países", description: "Planeje viagens para 10 países diferentes.", icon: "Map", unlocked: false },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { id: "l1", name: "Ju_Viajante", avatarColor: "#16A34A", metric: 18400, countriesVisited: 12 },
  { id: "l2", name: "MarcoMundo", avatarColor: "#2563EB", metric: 15200, countriesVisited: 9 },
  { id: "l3", name: "BiaExplora", avatarColor: "#F59E0B", metric: 13850, countriesVisited: 8 },
  { id: "l4", name: "RafaAventura", avatarColor: "#DC2626", metric: 11200, countriesVisited: 7 },
  { id: "l5", name: "LuxoNoMundo", avatarColor: "#16A34A", metric: 9800, countriesVisited: 6 },
];

export const STARTING_BUDGET = 20000;
