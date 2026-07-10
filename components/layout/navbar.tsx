"use client";

import Link from "next/link";
import { useState } from "react";
import { Compass, Crown, Heart, Map, Menu, Plane, Trophy, User, Wallet, X } from "lucide-react";
import { useTravelStore } from "@/store/travel-store";
import { useAuth } from "@/hooks/use-auth";
import { formatBRL } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Início", icon: Plane },
  { href: "/explorar", label: "Explorar", icon: Compass },
  { href: "/planejador", label: "Planejador", icon: Map },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/perfil", label: "Perfil", icon: User },
];

export function Navbar() {
  const budget = useTravelStore((s) => s.budget);
  const [open, setOpen] = useState(false);
  const { user, isPremium, loading } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center size-8 rounded-xl bg-primary/15 text-primary">
            <Plane className="size-4" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Travel<span className="text-primary">Quest</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-lg hover:bg-card"
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full glass px-3 py-1.5">
            <Wallet className="size-4 text-accent" />
            <span className="text-sm font-semibold tabular-nums">{formatBRL(budget)}</span>
          </div>

          {!loading && (
            <>
              {isPremium ? (
                <span className="hidden sm:flex items-center gap-1 text-xs font-bold text-accent bg-accent/15 rounded-full px-3 py-1.5">
                  <Crown className="size-3.5" /> Premium
                </span>
              ) : (
                <Link
                  href="/premium"
                  className="hidden sm:flex items-center gap-1 text-xs font-bold text-background bg-accent rounded-full px-3 py-1.5 hover:brightness-110 transition"
                >
                  <Crown className="size-3.5" /> Premium
                </Link>
              )}
              <Link
                href={user ? "/conta" : "/login"}
                className="hidden sm:flex items-center justify-center size-9 rounded-full border border-border hover:bg-card transition"
              >
                <User className="size-4" />
              </Link>
            </>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-border"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border px-4 py-3 flex flex-col gap-1 bg-background">
          <div className="sm:hidden flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 rounded-full glass px-3 py-1.5 w-fit">
              <Wallet className="size-4 text-accent" />
              <span className="text-sm font-semibold tabular-nums">{formatBRL(budget)}</span>
            </div>
            <Link
              href={user ? "/conta" : "/login"}
              onClick={() => setOpen(false)}
              className="flex items-center justify-center size-9 rounded-full border border-border"
            >
              <User className="size-4" />
            </Link>
          </div>
          <Link
            href="/premium"
            onClick={() => setOpen(false)}
            className="sm:hidden flex items-center gap-1.5 text-xs font-bold text-background bg-accent rounded-full px-3 py-2 w-fit mb-2"
          >
            <Crown className="size-3.5" /> {isPremium ? "Você é Premium" : "Assinar Premium"}
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-card"
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
