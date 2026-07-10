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
- [x] `/perfil` — nível calculado por pontos acumulados, conquistas desbloqueadas dinamicamente com base nas viagens reais do usuário, estatísticas (viagens, países, favoritos) e histórico de viagens criadas
- [x] `/explorar` — busca instantânea (cidade, país ou categoria) + filtro por múltiplas categorias, reaproveitando os cards da Home
- [x] `/favoritos` — destinos salvos com ❤️, com estado vazio guiando para `/explorar`
- [x] `/ranking` — 4 categorias (pontuação, economia, luxo, países visitados), com o próprio usuário aparecendo na lista dinamicamente assim que finaliza uma viagem
- [x] **Monetização real**: login/cadastro (Supabase Auth), assinatura Premium R$ 29,90/mês via Stripe Checkout, portal de autogerenciamento (cancelar/trocar cartão), e dois recursos travados atrás do Premium (exportar PDF do roteiro, estatísticas avançadas no Perfil)

Todos os links do menu principal já funcionam — o MVP completo descrito no prompt inicial está no ar, com monetização real.

## Próximas melhorias possíveis (não solicitadas ainda)

- [ ] Card de compartilhamento visual (imagem) ao final de uma viagem
- [ ] Animações de simulação (passagem encontrada, promoção, mudança de clima)
- [ ] Favoritar hotéis/restaurantes/atrações também (hoje só destinos têm UI de favorito)

## Configurando pagamentos e login (obrigatório para a monetização funcionar)

Copie `.env.local.example` para `.env.local` (localmente) e configure as mesmas variáveis em
**Vercel → seu projeto → Settings → Environment Variables** (produção). Veja no próprio arquivo
onde encontrar cada chave.

### 1. Supabase (login + banco de dados)

1. No painel do seu projeto Supabase, vá em **SQL Editor** → **New query**.
2. Cole todo o conteúdo do arquivo `supabase/schema.sql` deste projeto e clique em **Run**.
   Isso cria a tabela `profiles` (guarda quem é assinante) e configura tudo automaticamente
   para novos usuários que se cadastrarem.
3. Em **Project Settings → API**, copie a **Project URL** e a **anon public key** para
   `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copie também a **service_role secret** (mesma tela, mais abaixo) para
   `SUPABASE_SERVICE_ROLE_KEY` — **essa chave é sensível, nunca a exponha publicamente**.

### 2. Stripe (pagamento)

1. No Dashboard do Stripe, vá em **Product catalog** → crie um produto chamado "Premium",
   com preço recorrente mensal de R$ 29,90 → copie o **Price ID** (começa com `price_`) para
   `STRIPE_PRICE_ID`.
2. Em **Developers → API keys**, copie a **Secret key** para `STRIPE_SECRET_KEY`.
3. Em **Developers → Webhooks**, crie um endpoint apontando para
   `https://SEU-SITE.vercel.app/api/stripe/webhook`, com os eventos:
   `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`.
   Copie o **Signing secret** (começa com `whsec_`) para `STRIPE_WEBHOOK_SECRET`.
4. Ative o **Customer Portal** em **Settings → Billing → Customer portal** (permite o usuário
   cancelar/gerenciar a assinatura sozinho).

### 3. Site

Defina `NEXT_PUBLIC_SITE_URL` como a URL real do seu site (ex: `https://travel-vert-two.vercel.app`).

Depois de configurar tudo na Vercel, force um novo deploy (qualquer commit novo já dispara,
ou use "Redeploy" no dashboard da Vercel) para as variáveis entrarem em vigor.

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
