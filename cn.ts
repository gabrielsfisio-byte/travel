import type { Airline, Attraction, Destination, Hotel, Restaurant, TransportOption } from "@/types";

/** Airlines scale roughly with destination cost, so a trip to Aspen costs more to fly to than Rio. */
export function getAirlines(destination: Destination): Airline[] {
  const base = destination.avgCostPerDay * 2.2;
  return [
    {
      id: "econ",
      name: "SkyBrasil Econômica",
      cabin: "econômica",
      price: Math.round(base * 0.6),
      durationHours: 9,
      comfort: 45,
      sustainability: 55,
    },
    {
      id: "premium",
      name: "Atlas Premium Economy",
      cabin: "premium",
      price: Math.round(base * 1.0),
      durationHours: 8,
      comfort: 68,
      sustainability: 60,
    },
    {
      id: "exec",
      name: "Voar Executiva",
      cabin: "executiva",
      price: Math.round(base * 2.1),
      durationHours: 7.5,
      comfort: 95,
      sustainability: 40,
    },
  ];
}

export function getHotels(destination: Destination): Hotel[] {
  const base = destination.avgCostPerDay;
  return [
    {
      id: "hostel",
      name: "Hostel Vista Local",
      stars: 2,
      pricePerNight: Math.round(base * 0.5),
      comfort: 40,
      amenities: ["Wi-Fi", "Café da manhã"],
    },
    {
      id: "boutique",
      name: `Pousada Boutique ${destination.city}`,
      stars: 3,
      pricePerNight: Math.round(base * 0.9),
      comfort: 65,
      amenities: ["Wi-Fi", "Piscina", "Café da manhã"],
    },
    {
      id: "resort",
      name: `${destination.city} Grand Resort`,
      stars: 4,
      pricePerNight: Math.round(base * 1.6),
      comfort: 85,
      amenities: ["Wi-Fi", "Piscina", "Spa", "Vista panorâmica"],
    },
    {
      id: "luxury",
      name: `${destination.city} Palace & Suites`,
      stars: 5,
      pricePerNight: Math.round(base * 2.8),
      comfort: 98,
      amenities: ["Wi-Fi", "Piscina infinita", "Spa", "Mordomo 24h"],
    },
  ];
}

export function getTransportOptions(destination: Destination): TransportOption[] {
  const base = destination.avgCostPerDay * 0.3;
  return [
    { id: "public", name: "Transporte público", price: Math.round(base * 0.4), comfort: 35, sustainability: 90 },
    { id: "rentacar", name: "Carro alugado", price: Math.round(base * 1.1), comfort: 65, sustainability: 40 },
    { id: "private", name: "Motorista particular", price: Math.round(base * 2.2), comfort: 90, sustainability: 30 },
  ];
}

export function getAttractions(destination: Destination): Attraction[] {
  const base = destination.avgCostPerDay * 0.25;
  return [
    { id: "museum", name: "Tour cultural e museus", price: Math.round(base * 0.6), fun: 55, category: "cultura" },
    { id: "nature", name: "Trilha e paisagens naturais", price: Math.round(base * 0.4), fun: 70, category: "natureza" },
    { id: "nightlife", name: "Vida noturna local", price: Math.round(base * 0.9), fun: 80, category: "vida noturna" },
    { id: "adventure", name: "Esporte de aventura", price: Math.round(base * 1.3), fun: 95, category: "aventura" },
    { id: "family", name: "Parque temático / família", price: Math.round(base * 1.1), fun: 85, category: "família" },
  ];
}

export function getRestaurants(destination: Destination): Restaurant[] {
  const base = destination.avgCostPerDay * 0.2;
  return [
    { id: "street", name: "Comida de rua típica", pricePerMeal: Math.round(base * 0.4), cuisine: "Local", fun: 60 },
    { id: "bistro", name: "Bistrô local", pricePerMeal: Math.round(base * 0.9), cuisine: "Contemporânea", fun: 70 },
    { id: "fine", name: "Alta gastronomia", pricePerMeal: Math.round(base * 2.2), cuisine: "Fine dining", fun: 90 },
  ];
}
