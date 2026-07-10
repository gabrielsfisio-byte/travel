"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, Moon, Share2 } from "lucide-react";
import type { CompletedTrip } from "@/types";
import { formatBRL } from "@/utils/cn";
import { ShareModal } from "@/components/share/share-modal";

export function TripHistoryCard({ trip }: { trip: CompletedTrip }) {
  const [showShare, setShowShare] = useState(false);

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
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-primary">{formatBRL(trip.totalCost)}</span>
            <button onClick={() => setShowShare(true)} className="text-muted hover:text-accent">
              <Share2 className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showShare && <ShareModal trip={trip} onClose={() => setShowShare(false)} />}
    </div>
  );
}
