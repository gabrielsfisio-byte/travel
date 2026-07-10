# Travel Quest — Simulador Gamificado de Planejamento de Viagens

Simulador de planejamento de viagens para entretenimento e inspiração. Não vende passagens
nem realiza reservas reais — todo o conteúdo é fictício e serve para você "brincar" de montar
o roteiro dos seus sonhos, comparar destinos e disputar um ranking com outros perfis fictícios.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion (micro animações)
- Zustand + persist (estado do planejador e favoritos salvos em localStorage)
- Lucide Icons

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Estrutura de pastas

```
app/
  page.tsx            → Home (destaques, populares, promoções, inspiração)
  explorar/           → Catálogo de destinos por categoria (próxima etapa)
  planejador/         → Fluxo passo a passo de montagem da viagem (próxima etapa)
  perfil/             → Perfil, conquistas e estatísticas (próxima etapa)
  ranking/            → Leaderboard fictício (próxima etapa)
  favoritos/          → Destinos/hotéis/restaurantes salvos (próxima etapa)
components/
  layout/navbar.tsx   → Navegação principal + orçamento fictício
  home/               → hero, destination-card, section-header, promo-strip
  ui/                 → primitivos de UI reutilizáveis (a expandir com shadcn/ui)
hooks/                → hooks customizados (a criar conforme necessário)
lib/
  data/               → destinations.ts, gamification.ts (mock data)
  services/           → camada de integração futura (Amadeus, OpenWeather, etc.)
store/
  travel-store.ts     → estado global do planejador + cálculo de score da viagem
types/
  index.ts            → tipos do domínio (Destination, TripSelection, TripScore, etc.)
utils/
  cn.ts               → utilitários (cn, formatBRL, clamp)
```

## Paleta de design

| Uso        | Cor       |
|------------|-----------|
| Background | `#09090B` |
| Cards      | `#18181B` |
| Primary    | `#16A34A` |
| Secondary  | `#2563EB` |
| Accent     | `#F59E0B` |
| Danger     | `#DC2626` |

Dark mode elegante, glassmorphism leve (`.glass` em `globals.css`), cantos arredondados e
micro animações via Framer Motion.

## Etapa atual (entregue)

- [x] Estrutura completa de pastas (components, hooks, lib, store, types, services, data, utils, app)
- [x] Tema dark + glassmorphism configurado em `globals.css`
- [x] Navbar responsiva com orçamento fictício visível
- [x] Home totalmente funcional: hero, destinos em destaque, populares, promoções fictícias, inspiração
- [x] 9 destinos fictícios cobrindo todas as categorias pedidas (praia, neve, Europa, Ásia, América, natureza, luxo, aventura, romântico, família)
- [x] Cards modernos com favoritar, rating, promoção, badge "em alta"
- [x] Store global (Zustand) já preparado com o cálculo de `TripScore` (orçamento, conforto, aventura, sustentabilidade, pontuação geral) para a próxima etapa (Planejador)
- [x] `/planejador` — fluxo passo a passo completo (destino → voo → hotel → transporte → atrações → restaurantes → resumo) com orçamento/conforto/aventura/sustentabilidade atualizando ao vivo, resumo final com confete e viagem salva no histórico (pronta pro Perfil)

## Próximas etapas (aguardando aprovação)

- [ ] `/explorar` — grid filtrável por categoria, busca instantânea
- [ ] `/perfil` — viagens criadas, conquistas, nível, estatísticas
- [ ] `/ranking` — leaderboard por categoria (economia, luxo, países visitados, pontuação)
- [ ] `/favoritos` — destinos, hotéis, restaurantes e passeios salvos
- [ ] Card de compartilhamento visual (imagem) ao final de uma viagem
- [ ] Animações de simulação (passagem encontrada, promoção, mudança de clima)

## Integrações futuras (estrutura já preparada em `lib/services`)

- Google Places, Unsplash, Amadeus, Skyscanner, OpenWeather, Mapbox — hoje tudo roda 100% com
  dados locais em `lib/data`, mas os tipos em `types/index.ts` já foram desenhados para
  acomodar dados reais sem quebrar a interface.

## Deploy na Vercel

1. Suba este projeto para um repositório no GitHub.
2. Em vercel.com/new, importe o repositório.
3. Framework preset: **Next.js** (detectado automaticamente).
4. Deploy — sem variáveis de ambiente obrigatórias nesta etapa.

Ou via CLI:

```bash
npm i -g vercel
vercel
```
