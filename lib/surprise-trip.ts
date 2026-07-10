import { DESTINATIONS } from "@/lib/data/destinations";
import { getAirlines, getAttractions, getHotels, getRestaurants, getTransportOptions } from "@/lib/data/travel-options";
import type { TripSelection } from "@/types";

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickRandomSubset<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/** Builds a full random trip, biased toward staying within budget when possible. */
export function generateSurpriseTrip(budget: number): TripSelection {
  // Try a few times to land within budget; fall back to the last attempt if unlucky.
  for (let attempt = 0; attempt < 5; attempt++) {
    const destination = pickRandom(DESTINATIONS);
    const airline = pickRandom(getAirlines(destination));
    const hotels = getHotels(destination);
    const hotel = pickRandom(hotels);
    const nights = Math.floor(Math.random() * 6) + 3; // 3-8 nights
    const transport = pickRandom(getTransportOptions(destination));
    const attractions = pickRandomSubset(getAttractions(destination), 1, 3);
    const restaurants = pickRandomSubset(getRestaurants(destination), 1, 2);

    const cost =
      airline.price +
      hotel.pricePerNight * nights +
      transport.price +
      attractions.reduce((a, b) => a + b.price, 0) +
      restaurants.reduce((a, b) => a + b.pricePerMeal, 0);

    if (cost <= budget || attempt === 4) {
      return { destination, airline, hotel, nights, transport, attractions, restaurants };
    }
  }

  // Unreachable, but keeps TypeScript happy.
  const destination = pickRandom(DESTINATIONS);
  return { destination, nights: 5, attractions: [], restaurants: [] };
}
