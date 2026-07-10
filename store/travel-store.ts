"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Attraction,
  Airline,
  Destination,
  Hotel,
  Restaurant,
  TransportOption,
  TripSelection,
} from "@/types";
import { STARTING_BUDGET } from "@/lib/data/gamification";

interface TravelState {
  budget: number;
  trip: TripSelection;
  favorites: { destinations: string[]; hotels: string[]; restaurants: string[]; attractions: string[] };

  setDestination: (d: Destination) => void;
  setAirline: (a: Airline) => void;
  setHotel: (h: Hotel, nights: number) => void;
  setNights: (n: number) => void;
  setTransport: (t: TransportOption) => void;
  toggleAttraction: (a: Attraction) => void;
  toggleRestaurant: (r: Restaurant) => void;
  resetTrip: () => void;

  toggleFavoriteDestination: (id: string) => void;
  toggleFavoriteHotel: (id: string) => void;
  toggleFavoriteRestaurant: (id: string) => void;
  toggleFavoriteAttraction: (id: string) => void;
}

const emptyTrip: TripSelection = {
  destination: undefined,
  airline: undefined,
  hotel: undefined,
  nights: 5,
  transport: undefined,
  attractions: [],
  restaurants: [],
};

export const useTravelStore = create<TravelState>()(
  persist(
    (set, get) => ({
      budget: STARTING_BUDGET,
      trip: emptyTrip,
      favorites: { destinations: [], hotels: [], restaurants: [], attractions: [] },

      setDestination: (d) => set((s) => ({ trip: { ...s.trip, destination: d } })),
      setAirline: (a) => set((s) => ({ trip: { ...s.trip, airline: a } })),
      setHotel: (h, nights) => set((s) => ({ trip: { ...s.trip, hotel: h, nights } })),
      setNights: (n) => set((s) => ({ trip: { ...s.trip, nights: n } })),
      setTransport: (t) => set((s) => ({ trip: { ...s.trip, transport: t } })),

      toggleAttraction: (a) =>
        set((s) => {
          const exists = s.trip.attractions.find((x) => x.id === a.id);
          return {
            trip: {
              ...s.trip,
              attractions: exists
                ? s.trip.attractions.filter((x) => x.id !== a.id)
                : [...s.trip.attractions, a],
            },
          };
        }),

      toggleRestaurant: (r) =>
        set((s) => {
          const exists = s.trip.restaurants.find((x) => x.id === r.id);
          return {
            trip: {
              ...s.trip,
              restaurants: exists
                ? s.trip.restaurants.filter((x) => x.id !== r.id)
                : [...s.trip.restaurants, r],
            },
          };
        }),

      resetTrip: () => set({ trip: emptyTrip }),

      toggleFavoriteDestination: (id) =>
        set((s) => ({
          favorites: {
            ...s.favorites,
            destinations: s.favorites.destinations.includes(id)
              ? s.favorites.destinations.filter((x) => x !== id)
              : [...s.favorites.destinations, id],
          },
        })),
      toggleFavoriteHotel: (id) =>
        set((s) => ({
          favorites: {
            ...s.favorites,
            hotels: s.favorites.hotels.includes(id)
              ? s.favorites.hotels.filter((x) => x !== id)
              : [...s.favorites.hotels, id],
          },
        })),
      toggleFavoriteRestaurant: (id) =>
        set((s) => ({
          favorites: {
            ...s.favorites,
            restaurants: s.favorites.restaurants.includes(id)
              ? s.favorites.restaurants.filter((x) => x !== id)
              : [...s.favorites.restaurants, id],
          },
        })),
      toggleFavoriteAttraction: (id) =>
        set((s) => ({
          favorites: {
            ...s.favorites,
            attractions: s.favorites.attractions.includes(id)
              ? s.favorites.attractions.filter((x) => x !== id)
              : [...s.favorites.attractions, id],
          },
        })),
    }),
    { name: "travel-quest-storage" }
  )
);

/** Derived score calculation used across planner + summary screens. */
export function computeTripScore(trip: TripSelection, budget: number) {
  const flightCost = trip.airline?.price ?? 0;
  const hotelCost = (trip.hotel?.pricePerNight ?? 0) * trip.nights;
  const transportCost = trip.transport?.price ?? 0;
  const attractionsCost = trip.attractions.reduce((a, b) => a + b.price, 0);
  const restaurantsCost = trip.restaurants.reduce((a, b) => a + b.pricePerMeal, 0);

  const totalCost = flightCost + hotelCost + transportCost + attractionsCost + restaurantsCost;
  const remainingBudget = budget - totalCost;
  const savings = Math.max(0, budget - totalCost);

  const comfortInputs = [trip.airline?.comfort, trip.hotel ? trip.hotel.stars * 20 : undefined, trip.transport?.comfort].filter(
    (v): v is number => typeof v === "number"
  );
  const comfort = comfortInputs.length ? Math.round(comfortInputs.reduce((a, b) => a + b, 0) / comfortInputs.length) : 0;

  const adventureInputs = trip.attractions.map((a) => a.fun);
  const adventure = adventureInputs.length
    ? Math.round(adventureInputs.reduce((a, b) => a + b, 0) / adventureInputs.length)
    : 0;

  const sustainabilityInputs = [trip.airline?.sustainability, trip.transport?.sustainability].filter(
    (v): v is number => typeof v === "number"
  );
  const sustainability = sustainabilityInputs.length
    ? Math.round(sustainabilityInputs.reduce((a, b) => a + b, 0) / sustainabilityInputs.length)
    : 0;

  const overallScore = Math.round(
    comfort * 0.3 + adventure * 0.3 + sustainability * 0.15 + Math.min(100, (savings / budget) * 100) * 0.25
  );

  return {
    totalCost,
    remainingBudget,
    savings,
    comfort,
    adventure,
    sustainability,
    durationDays: trip.nights + 1,
    overallScore,
  };
}
