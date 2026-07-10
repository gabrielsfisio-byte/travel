"use client";

import Image from "next/image";
import { Award, Moon } from "lucide-react";
import type { CompletedTrip } from "@/types";
import { formatBRL } from "@/utils/cn";

export function TripHistoryCard({ trip }: { trip: CompletedTrip }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-card p-3">
      <div className="relative size-16 rounded-lg overflow-hidden shrink-0">
        <Image src={trip.destination.image} alt={trip.destination.city} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sm truncate">
            {trip.destination.city}, {trip.destination.country}
          </p>
          <span className="flex items-center gap-1 text-[11px] font-bold text-accent shrink-0">
            <Award className="size-3" />
            {trip.score}
          </span>
        </div>
        <p className="text-xs text-muted flex items-center gap-1 mt-0.5">
          <Moon className="size-3" /> {trip.nights} noites · {trip.hotel.name}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-muted">{trip.level}</span>
          <span className="text-xs font-bold text-primary">{formatBRL(trip.totalCost)}</span>
        </div>
      </div>
    </div>
  );
}
