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

export const LEADERBOARD_ECONOMIA: LeaderboardEntry[] = [
  { id: "e1", name: "PoupaMundo", avatarColor: "#16A34A", metric: 9200, countriesVisited: 6 },
  { id: "e2", name: "Camila_Off", avatarColor: "#2563EB", metric: 8100, countriesVisited: 5 },
  { id: "e3", name: "ThiagoEsperto", avatarColor: "#F59E0B", metric: 7450, countriesVisited: 4 },
  { id: "e4", name: "MochilaLeve", avatarColor: "#DC2626", metric: 6300, countriesVisited: 5 },
  { id: "e5", name: "EconomicoTop", avatarColor: "#16A34A", metric: 5100, countriesVisited: 3 },
];

export const LEADERBOARD_LUXO: LeaderboardEntry[] = [
  { id: "x1", name: "LuxoNoMundo", avatarColor: "#F59E0B", metric: 92, countriesVisited: 9 },
  { id: "x2", name: "SuiteReal", avatarColor: "#2563EB", metric: 88, countriesVisited: 7 },
  { id: "x3", name: "PrimeiraClasse", avatarColor: "#16A34A", metric: 85, countriesVisited: 6 },
  { id: "x4", name: "GlamTrip", avatarColor: "#DC2626", metric: 79, countriesVisited: 5 },
  { id: "x5", name: "VidaDeResort", avatarColor: "#F59E0B", metric: 74, countriesVisited: 4 },
];

export const LEADERBOARD_PAISES: LeaderboardEntry[] = [
  { id: "p1", name: "Ju_Viajante", avatarColor: "#16A34A", metric: 12, countriesVisited: 12 },
  { id: "p2", name: "MarcoMundo", avatarColor: "#2563EB", metric: 9, countriesVisited: 9 },
  { id: "p3", name: "BiaExplora", avatarColor: "#F59E0B", metric: 8, countriesVisited: 8 },
  { id: "p4", name: "RafaAventura", avatarColor: "#DC2626", metric: 7, countriesVisited: 7 },
  { id: "p5", name: "GlobalGabi", avatarColor: "#16A34A", metric: 6, countriesVisited: 6 },
];

export const LEADERBOARD_PONTUACAO: LeaderboardEntry[] = [
  { id: "s1", name: "PontosMil", avatarColor: "#2563EB", metric: 540, countriesVisited: 8 },
  { id: "s2", name: "Ju_Viajante", avatarColor: "#16A34A", metric: 480, countriesVisited: 12 },
  { id: "s3", name: "AventuraTotal", avatarColor: "#F59E0B", metric: 410, countriesVisited: 5 },
  { id: "s4", name: "MarcoMundo", avatarColor: "#DC2626", metric: 355, countriesVisited: 9 },
  { id: "s5", name: "ExploraBia", avatarColor: "#16A34A", metric: 290, countriesVisited: 8 },
];

export const STARTING_BUDGET = 20000;
