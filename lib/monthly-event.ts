import type { DestinationCategory } from "@/types";

export interface MonthlyEvent {
  title: string;
  description: string;
  matchCategory: DestinationCategory;
  badge: string;
}

// Index 0 = January … 11 = December
const EVENTS: MonthlyEvent[] = [
  { title: "Semana do Verão", description: "Destinos de praia com energia extra este mês.", matchCategory: "praia", badge: "🏖️" },
  { title: "Festival Romântico", description: "Destinos românticos em destaque em fevereiro.", matchCategory: "romantico", badge: "💘" },
  { title: "Temporada de Aventura", description: "Hora de destinos radicais e cheios de adrenalina.", matchCategory: "aventura", badge: "🧗" },
  { title: "Mês da Natureza", description: "Destinos naturais ganham destaque este mês.", matchCategory: "natureza", badge: "🌿" },
  { title: "Festival Asiático", description: "Explore os destinos da Ásia com atenção especial.", matchCategory: "asia", badge: "🏯" },
  { title: "Temporada Europeia", description: "Destinos europeus em alta neste mês.", matchCategory: "europa", badge: "🏰" },
  { title: "Mês em Família", description: "Destinos perfeitos para viajar com a família.", matchCategory: "familia", badge: "👨‍👩‍👧" },
  { title: "Festival de Luxo", description: "Destinos de luxo ganham brilho extra este mês.", matchCategory: "luxo", badge: "💎" },
  { title: "Rota Americana", description: "Destinos das Américas em destaque.", matchCategory: "america", badge: "🗽" },
  { title: "Temporada de Neve", description: "Destinos gelados chamam a atenção este mês.", matchCategory: "neve", badge: "❄️" },
  { title: "Semana Selvagem", description: "Destinos de aventura e natureza em dobro.", matchCategory: "aventura", badge: "🐾" },
  { title: "Festival de Inverno", description: "Encerre o ano nos destinos de neve e montanha.", matchCategory: "neve", badge: "🎄" },
];

export function getCurrentMonthlyEvent(): MonthlyEvent {
  return EVENTS[new Date().getMonth()];
}
