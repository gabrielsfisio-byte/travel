export interface PassportTheme {
  id: string;
  label: string;
  gradient: string;
  requiredLevel: string[];
}

export const PASSPORT_THEMES: PassportTheme[] = [
  {
    id: "verde",
    label: "Verde Clássico",
    gradient: "from-card via-card to-primary/15",
    requiredLevel: ["Iniciante", "Aventureiro", "Explorador", "Lenda Viajante"],
  },
  {
    id: "azul",
    label: "Azul Aventureiro",
    gradient: "from-card via-card to-secondary/20",
    requiredLevel: ["Aventureiro", "Explorador", "Lenda Viajante"],
  },
  {
    id: "dourado",
    label: "Dourado Explorador",
    gradient: "from-card via-accent/10 to-accent/25",
    requiredLevel: ["Explorador", "Lenda Viajante"],
  },
  {
    id: "lendario",
    label: "Capa Lendária",
    gradient: "from-primary/25 via-accent/15 to-secondary/25",
    requiredLevel: ["Lenda Viajante"],
  },
];

export function getAvailableThemes(levelName: string): PassportTheme[] {
  return PASSPORT_THEMES.filter((t) => t.requiredLevel.includes(levelName));
}
