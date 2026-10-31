import paginas from "@/data/paginas.json";

export type Pagina = {
  repo: string;
  nome: string;
  descricao: string;
  tags: string[];
  url: string;
  atualizadaEm: string;
};

export const site = {
  nome: "Hub",
  descricao: "Páginas estáticas de Márcio Wendel, todas com o @mw/ui e independentes entre si.",
};

export const listaPaginas: Pagina[] = paginas;
