"use client";

import { useMemo, useState } from "react";
import { Check, Copy, MessageCircle, Swords, X } from "lucide-react";
import { DESTINATIONS } from "@/lib/data/destinations";
import { encodeChallenge } from "@/lib/friend-challenge";
import { formatBRL } from "@/utils/cn";

export function CreateChallengeModal({ onClose }: { onClose: () => void }) {
  const [destinationId, setDestinationId] = useState(DESTINATIONS[0].id);
  const [budget, setBudget] = useState(8000);
  const [copied, setCopied] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === destinationId)!;

  const shareUrl = useMemo(() => {
    const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
    const encoded = encodeChallenge({ destinationId, destinationCity: destination.city, budget });
    return `${siteUrl}/desafio?d=${encoded}`;
  }, [destinationId, budget, destination.city]);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    const text = `Te desafio a montar a melhor viagem fictícia pra ${destination.city} com apenas ${formatBRL(budget)}! Aceita? ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-background border border-border rounded-2xl max-w-sm w-full">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-display font-bold text-lg flex items-center gap-2">
            <Swords className="size-4 text-secondary" />
            Desafiar um amigo
          </h3>
          <button onClick={onClose} className="flex items-center justify-center size-8 rounded-full hover:bg-card">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Destino do desafio</span>
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.city}, {d.country}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Orçamento do desafio</span>
            <input
              type="number"
              min={1000}
              step={500}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="rounded-lg border border-border bg-card px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </label>

          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-black font-semibold py-3 text-sm hover:brightness-105 transition"
          >
            <MessageCircle className="size-4" />
            Desafiar no WhatsApp
          </button>
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 rounded-xl border border-border font-semibold py-3 text-sm hover:bg-card-hover transition"
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            {copied ? "Link copiado!" : "Copiar link do desafio"}
          </button>
        </div>
      </div>
    </div>
  );
}
