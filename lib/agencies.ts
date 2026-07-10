export interface Agency {
  achievementId: string;
  name: string;
  description: string;
  icon: string;
  colorClass: string;
}

export const AGENCIES: Agency[] = [
  {
    achievementId: "backpacker",
    name: "Agência Mochilão",
    description: "Especialista em viagens econômicas e cheias de história.",
    icon: "Backpack",
    colorClass: "bg-secondary/15 text-secondary",
  },
  {
    achievementId: "luxury",
    name: "Agência VIP",
    description: "Só o melhor: resorts, spas e experiências exclusivas.",
    icon: "Gem",
    colorClass: "bg-accent/15 text-accent",
  },
  {
    achievementId: "budget-traveler",
    name: "Agência Econômica",
    description: "Mestre em economizar sem abrir mão da experiência.",
    icon: "PiggyBank",
    colorClass: "bg-primary/15 text-primary",
  },
  {
    achievementId: "foodie",
    name: "Agência Gourmet",
    description: "Roteiros pensados de restaurante em restaurante.",
    icon: "UtensilsCrossed",
    colorClass: "bg-danger/15 text-danger",
  },
  {
    achievementId: "world-explorer",
    name: "Agência Global",
    description: "Para quem já rodou três continentes e não parou por aí.",
    icon: "Globe2",
    colorClass: "bg-secondary/15 text-secondary",
  },
  {
    achievementId: "country-collector",
    name: "Agência Colecionadora",
    description: "Cada país é uma figurinha rara pra essa agência.",
    icon: "Map",
    colorClass: "bg-primary/15 text-primary",
  },
];
