"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { DESTINATIONS } from "@/lib/data/destinations";
import {
  getAirlines,
  getAttractions,
  getHotels,
  getRestaurants,
  getTransportOptions,
} from "@/lib/data/travel-options";
import { useTravelStore, computeTripScore } from "@/store/travel-store";
import { LiveStatsBar } from "@/components/planner/live-stats-bar";
import { StepIndicator, PLANNER_STEPS } from "@/components/planner/step-indicator";
import { OptionCard } from "@/components/planner/option-card";
import { MetaChip } from "@/components/planner/meta-chip";
import { TripSummaryCard } from "@/components/planner/trip-summary-card";
import type { CompletedTrip } from "@/types";

export default function PlanejadorPage() {
  const budget = useTravelStore((s) => s.budget);
  const trip = useTravelStore((s) => s.trip);
  const setDestination = useTravelStore((s) => s.setDestination);
  const setAirline = useTravelStore((s) => s.setAirline);
  const setHotel = useTravelStore((s) => s.setHotel);
  const setNights = useTravelStore((s) => s.setNights);
  const setTransport = useTravelStore((s) => s.setTransport);
  const toggleAttraction = useTravelStore((s) => s.toggleAttraction);
  const toggleRestaurant = useTravelStore((s) => s.toggleRestaurant);
  const resetTrip = useTravelStore((s) => s.resetTrip);
  const addCompletedTrip = useTravelStore((s) => s.addCompletedTrip);

  const [step, setStep] = useState(0);

  const score = computeTripScore(trip, budget);

  const airlines = useMemo(() => (trip.destination ? getAirlines(trip.destination) : []), [trip.destination]);
  const hotels = useMemo(() => (trip.destination ? getHotels(trip.destination) : []), [trip.destination]);
  const transports = useMemo(() => (trip.destination ? getTransportOptions(trip.destination) : []), [trip.destination]);
  const attractions = useMemo(() => (trip.destination ? getAttractions(trip.destination) : []), [trip.destination]);
  const restaurants = useMemo(() => (trip.destination ? getRestaurants(trip.destination) : []), [trip.destination]);

  const canAdvance =
    (step === 0 && !!trip.destination) ||
    (step === 1 && !!trip.airline) ||
    (step === 2 && !!trip.hotel) ||
    (step === 3 && !!trip.transport) ||
    step === 4 ||
    step === 5;

  function goNext() {
    if (step < PLANNER_STEPS.length - 1) setStep((s) => s + 1);
  }
  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleFinish() {
    if (!trip.destination || !trip.hotel) return;
    const completed: CompletedTrip = {
      id: `trip-${Date.now()}`,
      destination: trip.destination,
      nights: trip.nights,
      hotel: trip.hotel,
      totalCost: score.totalCost,
      score: score.overallScore,
      level: score.overallScore >= 85 ? "Lendária" : score.overallScore >= 65 ? "Incrível" : score.overallScore >= 45 ? "Muito boa" : "Iniciante",
      createdAt: new Date().toISOString(),
    };
    addCompletedTrip(completed);
  }

  function handleRestart() {
    resetTrip();
    setStep(0);
  }

  return (
    <div>
      <LiveStatsBar
        budget={budget}
        remainingBudget={score.remainingBudget}
        comfort={score.comfort}
        adventure={score.adventure}
        sustainability={score.sustainability}
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <StepIndicator current={step} />
          <button
            onClick={handleRestart}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted hover:text-danger shrink-0"
          >
            <RotateCcw className="size-3.5" />
            Recomeçar
          </button>
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <StepSection title="Para onde vamos?" subtitle="Escolha o destino da sua viagem fictícia">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DESTINATIONS.map((d) => {
                  const selected = trip.destination?.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        setDestination(d);
                        setStep(1);
                      }}
                      className={`relative rounded-xl overflow-hidden border h-28 sm:h-32 group ${
                        selected ? "border-primary ring-2 ring-primary/40" : "border-border"
                      }`}
                    >
                      <Image src={d.image} alt={d.city} fill sizes="200px" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10" />
                      <div className="absolute bottom-1.5 left-2 right-2 text-left">
                        <p className="text-xs font-bold text-white leading-tight">{d.city}</p>
                        <p className="text-[10px] text-white/70 flex items-center gap-0.5">
                          <MapPin className="size-2.5" /> {d.country}
                        </p>
                      </div>
                      {selected && (
                        <span className="absolute top-1.5 right-1.5 flex items-center justify-center size-5 rounded-full bg-primary text-white">
                          <Check className="size-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </StepSection>
          )}

          {step === 1 && trip.destination && (
            <StepSection title="Escolha o voo" subtitle={`Voando para ${trip.destination.city}`}>
              <div className="flex flex-col gap-3">
                {airlines.map((a) => (
                  <OptionCard
                    key={a.id}
                    title={a.name}
                    subtitle={`${a.cabin} · ${a.durationHours}h de voo`}
                    price={a.price}
                    selected={trip.airline?.id === a.id}
                    onClick={() => setAirline(a)}
                    meta={
                      <div className="flex gap-3">
                        <MetaChip label="Conforto" value={a.comfort} colorClass="bg-secondary" />
                        <MetaChip label="Sustentável" value={a.sustainability} colorClass="bg-accent" />
                      </div>
                    }
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 2 && trip.destination && (
            <StepSection title="Escolha o hotel" subtitle="Quantas noites você vai ficar?">
              <div className="flex items-center gap-3 mb-5 rounded-xl border border-border bg-card p-3 w-fit">
                <button
                  onClick={() => setNights(Math.max(1, trip.nights - 1))}
                  className="flex items-center justify-center size-8 rounded-lg border border-border hover:bg-card-hover"
                >
                  <Minus className="size-4" />
                </button>
                <span className="font-display font-bold w-16 text-center">{trip.nights} noites</span>
                <button
                  onClick={() => setNights(Math.min(21, trip.nights + 1))}
                  className="flex items-center justify-center size-8 rounded-lg border border-border hover:bg-card-hover"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {hotels.map((h) => (
                  <OptionCard
                    key={h.id}
                    title={h.name}
                    subtitle={`${"★".repeat(h.stars)} · ${h.amenities.join(", ")}`}
                    price={h.pricePerNight}
                    priceSuffix="/noite"
                    selected={trip.hotel?.id === h.id}
                    onClick={() => setHotel(h, trip.nights)}
                    meta={<MetaChip label="Conforto" value={h.comfort} colorClass="bg-secondary" />}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 3 && trip.destination && (
            <StepSection title="Como você vai se locomover?" subtitle="Escolha o transporte local">
              <div className="flex flex-col gap-3">
                {transports.map((t) => (
                  <OptionCard
                    key={t.id}
                    title={t.name}
                    price={t.price}
                    priceSuffix=" total"
                    selected={trip.transport?.id === t.id}
                    onClick={() => setTransport(t)}
                    meta={
                      <div className="flex gap-3">
                        <MetaChip label="Conforto" value={t.comfort} colorClass="bg-secondary" />
                        <MetaChip label="Sustentável" value={t.sustainability} colorClass="bg-accent" />
                      </div>
                    }
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 4 && trip.destination && (
            <StepSection title="Escolha suas atrações" subtitle="Selecione quantas quiser">
              <div className="flex flex-col gap-3">
                {attractions.map((a) => (
                  <OptionCard
                    key={a.id}
                    title={a.name}
                    subtitle={a.category}
                    price={a.price}
                    selected={!!trip.attractions.find((x) => x.id === a.id)}
                    onClick={() => toggleAttraction(a)}
                    meta={<MetaChip label="Diversão" value={a.fun} colorClass="bg-primary" />}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 5 && trip.destination && (
            <StepSection title="Onde vamos comer?" subtitle="Selecione quantos restaurantes quiser">
              <div className="flex flex-col gap-3">
                {restaurants.map((r) => (
                  <OptionCard
                    key={r.id}
                    title={r.name}
                    subtitle={r.cuisine}
                    price={r.pricePerMeal}
                    priceSuffix="/refeição"
                    selected={!!trip.restaurants.find((x) => x.id === r.id)}
                    onClick={() => toggleRestaurant(r)}
                    meta={<MetaChip label="Diversão" value={r.fun} colorClass="bg-primary" />}
                  />
                ))}
              </div>
            </StepSection>
          )}

          {step === 6 && (
            <StepSection title="Resumo da sua viagem" subtitle="Confira tudo antes de finalizar">
              <TripSummaryCard trip={trip} budget={budget} onFinish={handleFinish} />
            </StepSection>
          )}
        </motion.div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-card-hover transition"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </button>
          {step < PLANNER_STEPS.length - 1 && (
            <button
              onClick={goNext}
              disabled={!canAdvance}
              className="flex items-center gap-1.5 rounded-xl bg-primary text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              Continuar
              <ArrowRight className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepSection({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-muted mb-5">{subtitle}</p>}
      {children}
    </div>
  );
}
