"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Award, Check, Crown, FileDown, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import type { CompletedTrip, TripSelection } from "@/types";
import { formatBRL } from "@/utils/cn";
import { computeTripScore } from "@/store/travel-store";
import { useAuth } from "@/hooks/use-auth";
import { ShareModal } from "@/components/share/share-modal";

function levelFromScore(score: number) {
  if (score >= 85) return "Lendária";
  if (score >= 65) return "Incrível";
  if (score >= 45) return "Muito boa";
  return "Iniciante";
}

export function TripSummaryCard({
  trip,
  budget,
  onFinish,
}: {
  trip: TripSelection;
  budget: number;
  onFinish: () => void;
}) {
  const { isPremium } = useAuth();
  const score = computeTripScore(trip, budget);
  const level = levelFromScore(score.overallScore);
  const [finished, setFinished] = useState(false);
  const [showShare, setShowShare] = useState(false);

  function handleFinish() {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#16A34A", "#2563EB", "#F59E0B"],
    });
    setFinished(true);
    onFinish();
  }

  function handleExportPdf() {
    window.print();
  }

  if (!trip.destination || !trip.hotel) return null;

  const shareableTrip: CompletedTrip = {
    id: "preview",
    destination: trip.destination,
    nights: trip.nights,
    hotel: trip.hotel,
    totalCost: score.totalCost,
    savings: score.savings,
    score: score.overallScore,
    level,
    attractionsCount: trip.attractions.length,
    restaurantsCount: trip.restaurants.length,
    hadPromo: !!trip.destination.promo,
    createdAt: new Date().toISOString(),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      id="trip-summary-print"
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div className="relative h-40 w-full bg-gradient-to-br from-primary/25 via-secondary/20 to-accent/20 flex items-end p-5">
        <div>
          <p className="text-xs text-muted mb-1">Sua viagem para</p>
          <h3 className="font-display text-2xl font-extrabold">
            {trip.destination.city}, {trip.destination.country}
          </h3>
        </div>
        <span className="absolute top-4 right-4 flex items-center gap-1 text-xs font-bold text-white bg-primary rounded-full px-3 py-1">
          <Award className="size-3.5" />
          Nível {level}
        </span>
      </div>

      <div className="p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 border-b border-border">
        <div>
          <p className="text-xs text-muted">Duração</p>
          <p className="font-bold text-sm">{score.durationDays} dias</p>
        </div>
        <div>
          <p className="text-xs text-muted">Custo total</p>
          <p className="font-bold text-sm">{formatBRL(score.totalCost)}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Economia</p>
          <p className="font-bold text-sm text-primary">{formatBRL(score.savings)}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Pontuação geral</p>
          <p className="font-bold text-sm text-accent">{score.overallScore}/100</p>
        </div>
      </div>

      <div className="p-5 flex flex-col sm:flex-row gap-3 print:hidden">
        {!finished ? (
          <button
            onClick={handleFinish}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3 text-sm hover:brightness-110 transition"
          >
            <Sparkles className="size-4" />
            Finalizar viagem
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary/15 text-primary font-semibold py-3 text-sm">
            <Check className="size-4" />
            Viagem salva no seu perfil!
          </div>
        )}

        <button
          disabled={!finished}
          onClick={() => setShowShare(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-accent/40 text-accent font-semibold py-3 px-5 text-sm hover:bg-accent/10 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Share2 className="size-4" />
          Compartilhar
        </button>

        {isPremium ? (
          <button
            disabled={!finished}
            onClick={handleExportPdf}
            className="flex items-center justify-center gap-2 rounded-xl border border-border font-semibold py-3 px-5 text-sm hover:bg-card-hover transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FileDown className="size-4" />
            Exportar PDF
          </button>
        ) : (
          <Link
            href="/premium"
            className="flex items-center justify-center gap-2 rounded-xl border border-border text-muted font-semibold py-3 px-5 text-sm hover:bg-card-hover transition"
          >
            <Crown className="size-4 text-accent" />
            PDF é Premium
          </Link>
        )}
      </div>

      {showShare && <ShareModal trip={shareableTrip} onClose={() => setShowShare(false)} />}
    </motion.div>
  );
}
