"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { DESTINATIONS, CATEGORY_LABELS } from "@/lib/data/destinations";
import { DestinationCard } from "@/components/home/destination-card";
import type { DestinationCategory } from "@/types";
import { cn } from "@/utils/cn";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as DestinationCategory[];

export default function ExplorarPage() {
  const [query, setQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<DestinationCategory[]>([]);

  function toggleCategory(cat: DestinationCategory) {
    setActiveCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESTINATIONS.filter((d) => {
      const matchesQuery =
        q.length === 0 ||
        d.city.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.categories.some((c) => CATEGORY_LABELS[c].toLowerCase().includes(q));

      const matchesCategory = activeCategories.length === 0 || d.categories.some((c) => activeCategories.includes(c));

      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategories]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold mb-2">Explorar destinos</h1>
        <p className="text-sm text-muted">Busque por cidade, país ou categoria, e filtre pelo seu estilo de viagem.</p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por cidade, país ou categoria..."
          className="w-full rounded-xl border border-border bg-card pl-11 pr-10 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center size-6 rounded-full hover:bg-card-hover text-muted"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex items-start gap-2 mb-8">
        <span className="flex items-center gap-1 text-xs font-semibold text-muted pt-2 shrink-0">
          <SlidersHorizontal className="size-3.5" />
          Filtros:
        </span>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const active = activeCategories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={cn(
                  "text-xs font-medium rounded-full px-3 py-1.5 border transition-colors",
                  active ? "bg-primary text-white border-primary" : "border-border text-muted hover:text-foreground hover:bg-card"
                )}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
          {activeCategories.length > 0 && (
            <button
              onClick={() => setActiveCategories([])}
              className="text-xs font-medium text-danger hover:underline px-2"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <p className="text-xs text-muted mb-4">
        {filtered.length} {filtered.length === 1 ? "destino encontrado" : "destinos encontrados"}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted">Nenhum destino encontrado com esses filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
