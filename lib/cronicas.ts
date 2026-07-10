const CRONICAS: Record<string, string[]> = {
  Brasil: [
    "Você já conhece o Brasil tão bem que os garçons do Rio já sabem seu pedido de coco gelado.",
    "Dizem que você já discutiu política de futebol com meio Maracanã.",
  ],
  França: [
    "Seu francês fictício já está bom o suficiente pra pedir croissant sem sotaque (quase).",
    "Você já tirou tantas fotos da Torre Eiffel que ela começou a te seguir de volta nas redes.",
  ],
  Japão: [
    "Você já domina o ritual do chá tão bem que templo algum se surpreende mais com sua visita.",
    "Rumores dizem que você já foi convidado(a) pra um festival secreto de sakura.",
  ],
  Grécia: [
    "As ilhas gregas já reservam a melhor mesa pro pôr do sol quando veem seu nome.",
    "Você já sabe diferenciar um bom azeite grego só pelo cheiro (fictício, claro).",
  ],
  "Estados Unidos": [
    "Você já rodou tantos parques temáticos que sabe a hora exata de evitar fila.",
    "Seu roteiro pelos EUA já parece um mapa de metrô de tão detalhado.",
  ],
  Indonésia: [
    "Bali já te reconhece como visitante frequente — literalmente, é uma ilha pequena.",
    "Você já domina a arte de negociar preço em mercado local (na teoria).",
  ],
  Argentina: [
    "Você já sabe pedir um bife mal passado em espanhol com convicção.",
    "As montanhas da Patagônia já esperam sua próxima trilha.",
  ],
  Marrocos: [
    "Os vendedores dos souks de Marrakech já te chamam pelo nome fictício.",
    "Você já é craque em regatear preço de tapete (na sua imaginação, pelo menos).",
  ],
};

const GENERIC_CRONICAS = [
  "Você voltou tantas vezes que os moradores locais já perguntam se você não quer se mudar de vez.",
  "Esse lugar já parece mais casa do que destino — parabéns pela dedicação fictícia!",
];

export function getCronica(country: string, visitCount: number): string | null {
  if (visitCount < 3) return null;
  const options = CRONICAS[country] ?? GENERIC_CRONICAS;
  return options[visitCount % options.length];
}
