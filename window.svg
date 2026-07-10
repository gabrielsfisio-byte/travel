"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-24 -left-20 size-96 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -top-10 right-0 size-96 rounded-full bg-secondary/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 rounded-full px-3 py-1 mb-5">
            <Sparkles className="size-3.5" />
            Orçamento fictício de R$ 20.000 pra começar
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight mb-5">
            Monte a viagem
            <br />
            <span className="text-primary">dos seus sonhos.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted mb-8 max-w-lg">
            Escolha destino, voo, hotel e experiências. Acompanhe seu orçamento, conforto e
            nível de aventura em tempo real — 100% simulado, para inspiração e diversão.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/planejador"
              className="rounded-xl bg-primary text-white font-semibold px-6 py-3 text-sm hover:brightness-110 transition glow-primary"
            >
              Começar a planejar
            </Link>
            <Link
              href="/explorar"
              className="rounded-xl glass px-6 py-3 text-sm font-semibold hover:bg-card-hover transition"
            >
              Explorar destinos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
