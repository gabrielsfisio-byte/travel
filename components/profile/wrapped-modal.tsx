"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Globe2, MapPin, Sparkles, Wallet, Trophy, Share2 } from "lucide-react";
import type { WrappedStats } from "@/lib/achievements";
import { formatBRL } from "@/utils/cn";

interface Slide {
  gradient: string;
  icon: React.ElementType;
  eyebrow: string;
  big: string;
  caption: string;
}

function buildSlides(stats: WrappedStats): Slide[] {
  return [
    {
      gradient: "from-primary/40 via-primary/10 to-background",
      icon: Sparkles,
      eyebrow: "Seu ano no Travel Quest",
      big: `${stats.totalTrips}`,
      caption: stats.totalTrips === 1 ? "viagem planejada" : "viagens planejadas",
    },
    {
      gradient: "from-secondary/40 via-secondary/10 to-background",
      icon: Globe2,
      eyebrow: "Você explorou",
      big: `${stats.countriesCount}`,
      caption: stats.countriesCount === 1 ? "país diferente" : "países diferentes",
    },
    {
      gradient: "from-accent/40 via-accent/10 to-background",
      icon: Wallet,
      eyebrow: "Orçamento fictício usado",
      big: formatBRL(stats.totalBudgetUsed),
      caption: "em experiências de viagem",
    },
    {
      gradient: "from-primary/40 via-secondary/10 to-background",
      icon: MapPin,
      eyebrow: "Cidade favorita",
      big: stats.mostChosenCity ?? "—",
      caption: "foi pra onde você mais voltou",
    },
    {
      gradient: "from-secondary/40 via-accent/10 to-background",
      icon: Globe2,
      eyebrow: "Continente favorito",
      big: stats.favoriteContinent ?? "—",
      caption: "concentrou suas viagens",
    },
    {
      gradient: "from-accent/40 via-primary/10 to-background",
      icon: Trophy,
      eyebrow: "Sua melhor pontuação",
      big: `${stats.bestScore}/100`,
      caption: "numa única viagem",
    },
  ];
}

export function WrappedModal({ stats, onClose }: { stats: WrappedStats; onClose: () => void }) {
  const slides = buildSlides(stats);
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function next() {
    if (index < slides.length - 1) setIndex((i) => i + 1);
    else onClose();
  }
  function prev() {
    if (index > 0) setIndex((i) => i - 1);
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center gap-1.5 p-4">
        {slides.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-border overflow-hidden">
            <div className="h-full bg-white transition-all" style={{ width: i <= index ? "100%" : "0%" }} />
          </div>
        ))}
        <button onClick={onClose} className="ml-2 flex items-center justify-center size-8 rounded-full hover:bg-card shrink-0">
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <button onClick={prev} className="absolute left-0 top-0 bottom-0 w-1/4 z-10" aria-label="Anterior" />
        <button onClick={next} className="absolute right-0 top-0 bottom-0 w-1/4 z-10" aria-label="Próximo" />

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} flex flex-col items-center justify-center text-center px-8`}
          >
            <slide.icon className="size-10 text-white/80 mb-6" />
            <p className="text-sm font-semibold text-white/70 mb-3 uppercase tracking-wide">{slide.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mb-3 leading-tight break-words">
              {slide.big}
            </h2>
            <p className="text-white/70">{slide.caption}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="p-5 flex items-center justify-between">
        <button onClick={prev} disabled={index === 0} className="flex items-center gap-1 text-xs text-muted disabled:opacity-0">
          <ChevronLeft className="size-4" /> Voltar
        </button>
        {index === slides.length - 1 ? (
          <button
            onClick={onClose}
            className="flex items-center gap-2 rounded-full bg-primary text-white font-semibold px-5 py-2.5 text-sm"
          >
            <Share2 className="size-4" />
            Concluir
          </button>
        ) : (
          <button onClick={next} className="flex items-center gap-1 text-xs text-muted">
            Próximo <ChevronRight className="size-4" />
          </button>
        )}
      </div>
    </div>
  );
}
