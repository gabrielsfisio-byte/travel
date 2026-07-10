"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Check, Copy, Download, MessageCircle, X } from "lucide-react";
import { ShareTripCard } from "./share-trip-card";
import type { CompletedTrip } from "@/types";
import { buildShareUrl } from "@/lib/share";

export function ShareModal({ trip, onClose }: { trip: CompletedTrip; onClose: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = buildShareUrl(trip, siteUrl);

  async function handleDownload() {
    if (!cardRef.current) return;
    setGenerating(true);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `travel-quest-${trip.destination.city.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // If image export fails (e.g. cross-origin image), the link/WhatsApp options still work.
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyLink() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleWhatsApp() {
    const text = `Acabei de montar minha viagem dos sonhos pra ${trip.destination.city} no Travel Quest! ✈️ Confere: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative bg-background border border-border rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-display font-bold text-lg">Compartilhar viagem</h3>
          <button onClick={onClose} className="flex items-center justify-center size-8 rounded-full hover:bg-card">
            <X className="size-4" />
          </button>
        </div>

        <div className="p-5">
          <ShareTripCard
            forwardedRef={cardRef}
            trip={{
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
            }}
          />
        </div>

        <div className="p-5 pt-0 flex flex-col gap-2.5">
          <button
            onClick={handleDownload}
            disabled={generating}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3 text-sm hover:brightness-110 transition disabled:opacity-60"
          >
            <Download className="size-4" />
            {generating ? "Gerando imagem..." : "Baixar imagem (Instagram/Stories)"}
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-black font-semibold py-3 text-sm hover:brightness-105 transition"
          >
            <MessageCircle className="size-4" />
            Compartilhar no WhatsApp
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 rounded-xl border border-border font-semibold py-3 text-sm hover:bg-card-hover transition"
          >
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            {copied ? "Link copiado!" : "Copiar link"}
          </button>
        </div>
      </div>
    </div>
  );
}
