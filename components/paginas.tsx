"use client";

import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/search-input";
import type { Pagina } from "@/lib/site";

const data = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Fortaleza" });

function normalizar(texto: string) {
  return texto.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

export function Paginas({ paginas }: { paginas: Pagina[] }) {
  const [busca, setBusca] = useState("");

  const visiveis = useMemo(() => {
    const termo = normalizar(busca.trim());
    if (!termo) return paginas;
    return paginas.filter((p) => normalizar([p.nome, p.descricao, ...p.tags].join(" ")).includes(termo));
  }, [busca, paginas]);

  if (paginas.length === 0) {
    return (
      <EmptyState
        title="Nenhuma página no ar ainda"
        description="Crie um repo a partir do mwds-pagina, adicione a topic mwds-hub e marque o status como no-ar."
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <SearchInput
        value={busca}
        onValueChange={setBusca}
        placeholder="Buscar por nome, descrição ou tag"
        aria-label="Buscar páginas"
        className="max-w-measure"
      />
      <p className="font-mono text-mono-xs text-ink-muted" aria-live="polite">
        {visiveis.length} de {paginas.length} {paginas.length === 1 ? "página" : "páginas"}
      </p>
      {visiveis.length === 0 ? (
        <EmptyState headingLevel="h3" title="Nada encontrado" description={`Nenhuma página combina com "${busca}".`} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((p) => (
            <li key={p.repo} className="flex">
              <Card interactive className="w-full">
                <CardHeader>
                  <CardTitle>
                    <a href={p.url} className="no-underline after:absolute after:inset-0 after:content-['']">
                      {p.nome}
                    </a>
                  </CardTitle>
                  <CardDescription>{p.descricao}</CardDescription>
                </CardHeader>
                {p.tags.length > 0 && (
                  <CardContent className="flex flex-row flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <Badge key={tag} appearance="outline">{tag}</Badge>
                    ))}
                  </CardContent>
                )}
                <CardFooter className="mt-auto flex items-center justify-between font-mono text-mono-xs text-ink-muted">
                  <span>/{p.repo}</span>
                  <span className="flex items-center gap-1">
                    {data.format(new Date(p.atualizadaEm))}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
