import type { CompletedTrip } from "@/types";

export interface ShareTripPayload {
  city: string;
  country: string;
  image: string;
  nights: number;
  totalCost: number;
  savings: number;
  score: number;
  level: string;
  hotelName: string;
  hotelStars: number;
  attractionsCount: number;
  restaurantsCount: number;
}

function toShareTripPayload(trip: CompletedTrip): ShareTripPayload {
  return {
    city: trip.destination.city,
    country: trip.destination.country,
    image: trip.destination.image,
    nights: trip.nights,
    totalCost: trip.totalCost,
    savings: trip.savings,
    score: trip.score,
    level: trip.level,
    hotelName: trip.hotel.name,
    hotelStars: trip.hotel.stars,
    attractionsCount: trip.attractionsCount,
    restaurantsCount: trip.restaurantsCount,
  };
}

export function encodeTripShare(trip: CompletedTrip): string {
  const payload = toShareTripPayload(trip);
  const json = JSON.stringify(payload);
  // btoa doesn't support unicode directly; encodeURIComponent + unescape bridges that.
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeTripShare(encoded: string): ShareTripPayload | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json) as ShareTripPayload;
  } catch {
    return null;
  }
}

export function buildShareUrl(trip: CompletedTrip, siteUrl: string): string {
  return `${siteUrl}/viagem?d=${encodeTripShare(trip)}`;
}
