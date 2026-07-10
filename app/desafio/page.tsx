"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Swords, Wallet, MapPin } from "lucide-react";
import { decodeChallenge, type FriendChallengePayload } from "@/lib/friend-challenge";
import { formatBRL } from "@/utils/cn";

export default function DesafioPage() {
  const [challenge, setChallenge] = useState<FriendChallengePayload | null | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("d");
    setChallenge(encoded ? decodeChallenge(encoded) : null);
  }, []);

  if (challenge === undefined) return null;

  if (!challenge) {
    return (
      <div className="mx-auto max-w-sm px-4 py-24 text-center">
        <p className="text-sm text-muted">Esse link de desafio parece estar incompleto.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16 text-center">
      <span className="inline-flex items-center justify-center size-14 rounded-2xl bg-secondary/15 text-secondary mb-5">
        <Swords className="size-7" />
      </span>
      <h1 className="font-display text-2xl font-extrabold mb-2">Você foi desafiado! ⚔️</h1>
      <p className="text-sm text-muted mb-6">
        Alguém te desafiou a montar a melhor viagem fictícia com essas condições:
      </p>

      <div className="rounded-2xl border border-border bg-card p-5 flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2 justify-center">
          <MapPin className="size-4 text-primary" />
          <span className="font-display font-bold">{challenge.destinationCity}</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Wallet className="size-4 text-accent" />
          <span className="font-display font-bold">{formatBRL(challenge.budget)}</span>
        </div>
      </div>

      <Link
        href={`/planejador?desafioDestino=${challenge.destinationId}&desafioOrcamento=${challenge.budget}`}
        className="flex items-center justify-center gap-2 rounded-xl bg-primary text-white font-bold py-3 text-sm hover:brightness-110 transition"
      >
        Aceitar desafio
      </Link>
    </div>
  );
}
