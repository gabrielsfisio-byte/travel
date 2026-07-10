import { Compass, Flame, Sparkles } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { SectionHeader } from "@/components/home/section-header";
import { DestinationCard } from "@/components/home/destination-card";
import { PromoStrip } from "@/components/home/promo-strip";
import { DailyChallengeSection } from "@/components/home/daily-challenge-section";
import { DESTINATIONS } from "@/lib/data/destinations";

export default function Home() {
  const featured = DESTINATIONS.filter((d) => d.trending);
  const popular = [...DESTINATIONS].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const inspiration = DESTINATIONS.filter((d) => d.categories.includes("natureza") || d.categories.includes("aventura"));

  return (
    <div>
      <Hero />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-20 flex flex-col gap-14">
        <DailyChallengeSection />
        <PromoStrip destinations={DESTINATIONS} />

        <section>
          <SectionHeader icon={Flame} title="Destinos em destaque" subtitle="Os mais buscados por quem está planejando agora" href="/explorar" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={Sparkles} title="Viagens populares" subtitle="Melhor avaliadas pela comunidade fictícia" href="/explorar" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popular.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader icon={Compass} title="Inspiração para viajar" subtitle="Natureza e aventura para quem quer sair da rotina" href="/explorar" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inspiration.map((d, i) => (
              <DestinationCard key={d.id} destination={d} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
