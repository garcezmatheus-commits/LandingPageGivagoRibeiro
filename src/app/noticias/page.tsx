import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Instagram } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MANDATO } from "@/lib/conteudo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { buscarNoticias, formatarData, type Noticia } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Acompanhe ações, projetos, agendas e resultados do mandato.",
};

export default async function PaginaDeNoticias() {
  let noticias: Noticia[];

  try {
    noticias = await buscarNoticias(24);
  } catch {
    noticias = [];
  }

  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="bg-primary pb-16 pt-32 md:pb-20 md:pt-40">
          <div className="container-custom px-4 md:px-8">
            <Badge className="mb-3 bg-white/15 text-primary-foreground">Blog do Mandato</Badge>
            <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-5xl">
              Notícias
            </h1>
            <p className="mt-3 max-w-2xl text-primary-foreground/80">
              Acompanhe ações, projetos e resultados do mandato.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-custom px-4 md:px-8">
            {noticias.length === 0 ? (
              <p className="py-12 text-center text-muted-foreground">
                Ainda não há notícias publicadas.
              </p>
            ) : (
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {noticias.map((noticia, i) => (
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
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container-custom px-4 text-center md:px-8">
            <h2 className="font-heading text-2xl font-bold">Acompanhe o mandato</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Siga nas redes sociais para ficar por dentro de todas as ações.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild>
                <a href={MANDATO.redes.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" aria-hidden="true" />
                  Instagram
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/#contato">Entre em contato</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
