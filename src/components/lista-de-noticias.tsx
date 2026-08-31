"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { formatarData, type Noticia } from "@/lib/wordpress";

/**
 * Listagem de notícias com busca.
 *
 * Filtra no cliente em vez de bater na API do WordPress a cada tecla: são
 * poucas dezenas de posts, todos já carregados. Resposta imediata e nenhuma
 * requisição extra.
 */
export function ListaDeNoticias({ noticias }: { noticias: Noticia[] }) {
  const [termo, setTermo] = React.useState("");

  const filtradas = React.useMemo(() => {
    const busca = termo.trim().toLowerCase();
    if (!busca) return noticias;
    return noticias.filter((n) => `${n.titulo} ${n.resumo}`.toLowerCase().includes(busca));
  }, [noticias, termo]);

  return (
    <>
      <div className="relative mx-auto mb-10 max-w-xl">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <label htmlFor="busca-noticias" className="sr-only">
          Buscar notícias
        </label>
        <Input
          id="busca-noticias"
          type="search"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar notícias…"
          className="pl-10 pr-10"
        />
        {termo && (
          <button
            type="button"
            onClick={() => setTermo("")}
            aria-label="Limpar busca"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <p aria-live="polite" className="sr-only">
        {termo
          ? `${filtradas.length} ${filtradas.length === 1 ? "notícia encontrada" : "notícias encontradas"}`
          : ""}
      </p>

      {filtradas.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          {termo
            ? `Nenhuma notícia encontrada para “${termo}”.`
            : "Ainda não há notícias publicadas."}
        </p>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((noticia, i) => (
            <li key={noticia.id}>
              <ScrollReveal delay={(i % 3) * 100}>
                <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                  {noticia.imagem && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={noticia.imagem}
                        alt={noticia.imagemAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <time dateTime={noticia.data}>{formatarData(noticia.data)}</time>
                    </p>
                    <h2 className="mb-2 font-heading text-base font-bold leading-snug transition-colors group-hover:text-primary">
                      <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
                    </h2>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {noticia.resumo}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
