import type { Destination } from "@/types";
import type { CompletedTrip } from "@/types";
import { countriesVisited } from "@/lib/achievements";

export interface SecretDestination extends Destination {
  unlockCondition: string;
  isUnlocked: (trips: CompletedTrip[]) => boolean;
}

export const SECRET_DESTINATIONS: SecretDestination[] = [
  {
    id: "secret-tokyo-2087",
    city: "Tóquio Neon 2087",
    country: "Japão (ficcional)",
    categories: ["luxo", "aventura", "asia"],
    image: "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800&q=80",
    climate: "Clima controlado, 22°C constantes",
    avgCostPerDay: 950,
    currency: "JPY",
    language: "Japonês",
    funFact: "Um Tóquio futurista fictício, com trens flutuantes e hologramas em cada esquina.",
    rating: 5.0,
    unlockCondition: "Visite o Japão em uma viagem real",
    isUnlocked: (trips) => countriesVisited(trips).includes("Japão"),
  },
  {
    id: "secret-orbital-aurora",
    city: "Estação Orbital Aurora",
    country: "Órbita Terrestre (ficcional)",
    categories: ["luxo", "aventura"],
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&q=80",
    climate: "Gravidade artificial, sem clima",
    avgCostPerDay: 2400,
    currency: "USD",
    language: "Universal",
    funFact: "Uma estação espacial fictícia com vista privilegiada da Terra, só para quem já colecionou passaporte cheio.",
    rating: 5.0,
    unlockCondition: "Visite 5 países diferentes",
    isUnlocked: (trips) => countriesVisited(trips).length >= 5,
  },
  {
    id: "secret-atlantis",
    city: "Atlântida Redescoberta",
    country: "Oceano Atlântico (ficcional)",
    categories: ["luxo", "natureza"],
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&q=80",
    climate: "Subaquático climatizado, 24°C",
    avgCostPerDay: 1800,
    currency: "USD",
    language: "Desconhecida",
    funFact: "Uma cidade submarina fictícia com cúpulas de vidro — recompensa para quem economiza como ninguém.",
    rating: 5.0,
    unlockCondition: "Economize mais de 40% do orçamento em uma viagem",
    isUnlocked: (trips) => trips.some((t) => t.savings > 0 && t.savings / (t.totalCost + t.savings) > 0.4),
  },
];

export function getUnlockedSecretDestinations(trips: CompletedTrip[]): SecretDestination[] {
  return SECRET_DESTINATIONS.filter((d) => d.isUnlocked(trips));
}
