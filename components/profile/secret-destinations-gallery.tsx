"use client";

import Image from "next/image";
import { Lock, Sparkles } from "lucide-react";
import { SECRET_DESTINATIONS } from "@/lib/secret-destinations";
import type { CompletedTrip } from "@/types";
import { cn } from "@/utils/cn";

export function SecretDestinationsGallery({ trips }: { trips: CompletedTrip[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {SECRET_DESTINATIONS.map((d) => {
        const unlocked = d.isUnlocked(trips);
        return (
          <div key={d.id} className="relative rounded-xl overflow-hidden border border-border h-36">
            <Image src={d.image} alt={d.city} fill className={cn("object-cover", !unlocked && "grayscale blur-[2px] opacity-50")} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-3 flex flex-col justify-end">
              {unlocked ? (
                <>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-accent mb-1">
                    <Sparkles className="size-3" /> DESBLOQUEADO
                  </span>
                  <p className="text-sm font-bold text-white leading-tight">{d.city}</p>
                </>
              ) : (
                <>
                  <Lock className="size-4 text-white/70 mb-1" />
                  <p className="text-xs font-semibold text-white/80 leading-tight">???</p>
                  <p className="text-[10px] text-white/60 mt-0.5">{d.unlockCondition}</p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
