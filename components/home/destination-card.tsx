"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MapPin, Sparkles, Star, TrendingUp, X } from "lucide-react";
import type { Destination } from "@/types";
import { useTravelStore } from "@/store/travel-store";
import { formatBRL, cn } from "@/utils/cn";
import { CATEGORY_LABELS } from "@/lib/data/destinations";

export function DestinationCard({ destination, index = 0 }: { destination: Destination; index?: number }) {
  const isFavorite = useTravelStore((s) => s.favorites.destinations.includes(destination.id));
  const toggleFavorite = useTravelStore((s) => s.toggleFavoriteDestination);
  const [flipped, setFlipped] = useState(false);

  const discountedCost = destination.promo
    ? Math.round(destination.avgCostPerDay * (1 - destination.promo.discountPct / 100))
    : destination.avgCostPerDay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{ perspective: 1200 }}
      className="group relative rounded-2xl overflow-hidden"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full"
      >
        {/* Front face */}
        <div style={{ backfaceVisibility: "hidden" }} className="border border-border bg-card rounded-2xl overflow-hidden">
          <div className="relative h-44 w-full overflow-hidden">
            <Image
              src={destination.image}
              alt={`${destination.city}, ${destination.country}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <button
              onClick={() => toggleFavorite(destination.id)}
              className="absolute top-3 right-3 flex items-center justify-center size-8 rounded-full glass"
            >
              <Heart className={cn("size-4", isFavorite ? "fill-danger text-danger" : "text-white")} />
            </button>

            <button
              onClick={() => setFlipped(true)}
              title="Descobrir curiosidade"
              style={{ right: "48px" }}
              className="absolute top-3 flex items-center justify-center size-8 rounded-full glass text-accent animate-pulse"
            >
              <Sparkles className="size-4" />
            </button>

            {destination.trending && (
              <span className="absolute top-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-white bg-secondary/90 rounded-full px-2.5 py-1">
                <TrendingUp className="size-3" />
                Em alta
              </span>
            )}
            {destination.promo && (
              <span className="absolute bottom-3 left-3 text-[11px] font-bold text-background bg-accent rounded-full px-2.5 py-1">
                -{destination.promo.discountPct}% {destination.promo.label}
              </span>
            )}
          </div>

          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display font-bold text-base leading-tight">{destination.city}</h3>
                <p className="text-xs text-muted flex items-center gap-1">
                  <MapPin className="size-3" /> {destination.country}
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-accent shrink-0">
                <Star className="size-3.5 fill-accent" />
                {destination.rating}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {destination.categories.slice(0, 2).map((cat) => (
                <span key={cat} className="text-[10px] font-medium text-muted border border-border rounded-full px-2 py-0.5">
                  {CATEGORY_LABELS[cat]}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-muted">a partir de</span>
              <span className="font-display font-bold text-primary">
                {formatBRL(discountedCost)}
                <span className="text-muted font-normal text-xs">/dia</span>
              </span>
            </div>
          </div>
        </div>

        {/* Back face — curiosity reveal */}
        <div
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          className="absolute inset-0 border border-accent/40 bg-gradient-to-br from-card via-card to-accent/10 rounded-2xl p-5 flex flex-col"
        >
          <button
            onClick={() => setFlipped(false)}
            className="absolute top-3 right-3 flex items-center justify-center size-7 rounded-full bg-border/60 hover:bg-border"
          >
            <X className="size-3.5" />
          </button>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-accent mb-3">
            <Sparkles className="size-3.5" />
            CURIOSIDADE
          </span>
          <p className="font-display text-base font-semibold leading-snug flex-1">{destination.funFact}</p>
          <p className="text-xs text-muted mt-3">{destination.city}, {destination.country}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
