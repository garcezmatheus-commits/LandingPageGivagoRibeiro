import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buscarNoticias, formatarData } from "@/lib/wordpress";

export async function NoticiasSection() {
  let noticias;

  try {
    noticias = await buscarNoticias(3);
  } catch {
    // O blog fora do ar não derruba a home: a seção simplesmente não aparece.
    return null;
  }

  if (!noticias.length) return null;

  return (
    <section id="noticias" className="bg-muted/30 py-16 md:py-24" aria-labelledby="noticias-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <RotuloSecao centralizado={true} className="mb-4">Acompanhe</RotuloSecao>
          <h2 id="noticias-titulo" className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Notícias e Transparência
          </h2>
          <p className="mt-3 text-muted-foreground">
            Acompanhe ações, projetos, agendas e resultados do mandato.
          </p>
        </ScrollReveal>

        <ul className="grid gap-6 md:grid-cols-3">
          {noticias.map((noticia, i) => (
            <li key={noticia.id}>
              <ScrollReveal delay={i * 100}>
                <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                  {noticia.imagem && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={noticia.imagem}
                        alt={noticia.imagemAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <p className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" aria-hidden="true" />
                      <time dateTime={noticia.data}>{formatarData(noticia.data)}</time>
                    </p>
                    <h3 className="mb-2 font-heading text-base font-bold leading-snug transition-colors group-hover:text-primary">
                      <Link href={`/noticias/${noticia.slug}`}>{noticia.titulo}</Link>
                    </h3>
                    <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                      {noticia.resumo}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-10 text-center">
          <Button asChild size="lg" variant="outline">
            <Link href="/noticias">
              Ver todas as notícias
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
