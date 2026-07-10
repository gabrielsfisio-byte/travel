"use client";

import Image from "next/image";
import { Award, MapPin, Plane, Sparkles, Star, UtensilsCrossed } from "lucide-react";
import { formatBRL } from "@/utils/cn";
import type { ShareTripPayload } from "@/lib/share";

export function ShareTripCard({ trip, forwardedRef }: { trip: ShareTripPayload; forwardedRef?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={forwardedRef}
      className="relative w-full max-w-sm mx-auto aspect-[9/16] rounded-3xl overflow-hidden border border-border"
      style={{ background: "linear-gradient(160deg, #09090B 0%, #101418 55%, #16A34A22 100%)" }}
    >
      <div className="absolute inset-0">
        <Image src={trip.image} alt={trip.city} fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-7">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-white font-display font-extrabold text-lg">
            <Plane className="size-4 text-primary" />
            Travel<span className="text-primary">Quest</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-accent bg-accent/15 rounded-full px-2.5 py-1">
            <Award className="size-3" />
            {trip.level}
          </span>
        </div>

        <div>
          <p className="text-xs text-white/60 mb-1 flex items-center gap-1">
            <Sparkles className="size-3.5 text-accent" />
            Minha viagem dos sonhos
          </p>
          <h2 className="font-display text-4xl font-extrabold text-white leading-tight mb-1">{trip.city}</h2>
          <p className="text-sm text-white/70 flex items-center gap-1 mb-6">
            <MapPin className="size-3.5" /> {trip.country} · {trip.nights} noites
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] text-white/50 mb-0.5">Custo total</p>
              <p className="text-white font-display font-bold text-lg">{formatBRL(trip.totalCost)}</p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] text-white/50 mb-0.5">Pontuação</p>
              <p className="text-accent font-display font-bold text-lg">{trip.score}/100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/70 text-xs">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-accent text-accent" /> {trip.hotelStars}★ {trip.hotelName}
            </span>
          </div>
          <div className="flex items-center gap-4 text-white/70 text-xs mt-1.5">
            <span className="flex items-center gap-1">
              <Sparkles className="size-3.5" /> {trip.attractionsCount} atrações
            </span>
            <span className="flex items-center gap-1">
              <UtensilsCrossed className="size-3.5" /> {trip.restaurantsCount} restaurantes
            </span>
          </div>
        </div>

        <p className="text-[10px] text-white/40 text-center">
          Simulação fictícia de viagem · travel-quest.app
        </p>
      </div>
    </div>
  );
}
