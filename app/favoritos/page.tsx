"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { DESTINATIONS } from "@/lib/data/destinations";
import { DestinationCard } from "@/components/home/destination-card";

export default function FavoritosPage() {
  const favoriteIds = useTravelStore((s) => s.favorites.destinations);
  const favoriteDestinations = DESTINATIONS.filter((d) => favoriteIds.includes(d.id));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold mb-2 flex items-center gap-2">
          <Heart className="size-7 text-danger fill-danger" />
          Favoritos
        </h1>
        <p className="text-sm text-muted">Destinos que você salvou para planejar depois.</p>
      </div>

      {favoriteDestinations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center flex flex-col items-center gap-4">
          <Heart className="size-8 text-muted" />
          <div>
            <p className="text-sm font-medium mb-1">Você ainda não salvou nenhum destino.</p>
            <p className="text-xs text-muted">Clique no ❤️ em qualquer card de destino para salvá-lo aqui.</p>
          </div>
          <Link href="/explorar" className="rounded-lg bg-primary text-white text-sm font-semibold px-4 py-2 hover:brightness-110 transition">
            Explorar destinos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteDestinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
