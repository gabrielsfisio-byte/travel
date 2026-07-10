export type DestinationCategory =
  | "praia"
  | "neve"
  | "europa"
  | "asia"
  | "america"
  | "natureza"
  | "luxo"
  | "aventura"
  | "romantico"
  | "familia";

export interface Destination {
  id: string;
  city: string;
  country: string;
  categories: DestinationCategory[];
  image: string;
  climate: string;
  avgCostPerDay: number;
  currency: string;
  language: string;
  funFact: string;
  rating: number;
  trending?: boolean;
  promo?: { label: string; discountPct: number };
}

export interface Airline {
  id: string;
  name: string;
  cabin: "econômica" | "premium" | "executiva";
  price: number;
  durationHours: number;
  comfort: number; // 0-100
  sustainability: number; // 0-100
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  pricePerNight: number;
  comfort: number;
  amenities: string[];
}

export interface TransportOption {
  id: string;
  name: string;
  price: number;
  comfort: number;
  sustainability: number;
}

export interface Attraction {
  id: string;
  name: string;
  price: number;
  fun: number; // 0-100
  category: "cultura" | "natureza" | "vida noturna" | "aventura" | "família";
}

export interface Restaurant {
  id: string;
  name: string;
  pricePerMeal: number;
  cuisine: string;
  fun: number;
}

export interface TripSelection {
  destination?: Destination;
  airline?: Airline;
  hotel?: Hotel;
  nights: number;
  transport?: TransportOption;
  attractions: Attraction[];
  restaurants: Restaurant[];
}

export interface TripScore {
  totalCost: number;
  remainingBudget: number;
  savings: number;
  comfort: number;
  adventure: number;
  sustainability: number;
  durationDays: number;
  overallScore: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatarColor: string;
  metric: number;
  countriesVisited: number;
}

export interface CompletedTrip {
  id: string;
  destination: Destination;
  nights: number;
  hotel: Hotel;
  totalCost: number;
  score: number;
  level: string;
  createdAt: string;
}
