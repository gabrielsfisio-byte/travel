"use client";

import Link from "next/link";
import { Crown, Lock } from "lucide-react";

export function PremiumGate({
  isPremium,
  title,
  children,
}: {
  isPremium: boolean;
  title: string;
  children: React.ReactNode;
}) {
  if (isPremium) return <>{children}</>;

  return (
    <div className="relative rounded-xl border border-border bg-card overflow-hidden">
      <div className="pointer-events-none blur-sm select-none opacity-50 p-5">{children}</div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/60 p-5 text-center">
        <span className="flex items-center justify-center size-9 rounded-full bg-accent/15 text-accent">
          <Lock className="size-4" />
        </span>
        <p className="text-sm font-semibold">{title}</p>
        <Link
          href="/premium"
          className="flex items-center gap-1.5 text-xs font-bold text-background bg-accent rounded-full px-3 py-1.5 hover:brightness-110 transition"
        >
          <Crown className="size-3.5" />
          Desbloquear com Premium
        </Link>
      </div>
    </div>
  );
}
