"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plane, Sparkles } from "lucide-react";
import { ShareTripCard } from "@/components/share/share-trip-card";
import { decodeTripShare } from "@/lib/share";

function ViagemContent() {
  const params = useSearchParams();
  const encoded = params.get("d");
  const trip = encoded ? decodeTripShare(encoded) : null;

  if (!trip) {
    return (
      <div className="text-center py-24">
        <p className="text-sm text-muted">Não conseguimos carregar essa viagem — o link pode estar incompleto.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <ShareTripCard trip={trip} />
      <div className="mt-6 text-center flex flex-col gap-3">
        <p className="text-sm text-muted">
          Essa é uma viagem fictícia montada no <span className="font-semibold text-foreground">Travel Quest</span>.
        </p>
        <Link
          href="/planejador"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-semibold py-3 text-sm hover:brightness-110 transition"
        >
          <Sparkles className="size-4" />
          Montar minha própria viagem
        </Link>
        <Link href="/" className="flex items-center justify-center gap-1.5 text-xs text-muted hover:underline">
          <Plane className="size-3.5" /> Conhecer o Travel Quest
        </Link>
      </div>
    </div>
  );
}

export default function ViagemPage() {
  return (
    <Suspense fallback={null}>
      <ViagemContent />
    </Suspense>
  );
}
