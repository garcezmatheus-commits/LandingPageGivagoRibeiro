import type { Metadata } from "next";
import Link from "next/link";
import { Home, Newspaper, MessageSquare } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { PILARES } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

/**
 * Página de erro 404.
 *
 * A padrão do Next é em inglês, sem identidade e sem saída — num site de
 * mandato isso passa desleixo justamente para quem chegou por link quebrado
 * ou endereço digitado errado. Aqui a pessoa reconhece onde está e tem para
 * onde ir.
 */
export default function NaoEncontrada() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="container-custom max-w-3xl px-4 text-center md:px-8">
            <RotuloSecao centralizado className="mb-4">
              Erro 404
            </RotuloSecao>

            <h1 className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Esta página não existe
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              O endereço pode ter mudado, ou o link que você seguiu está quebrado. Abaixo
              estão os caminhos mais procurados do site.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Ir para o início
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/noticias">
                  <Newspaper className="h-4 w-4" aria-hidden="true" />
                  Ver notícias
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#contato">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Falar com o mandato
                </Link>
              </Button>
            </div>

            <div className="mt-14 border-t border-border pt-10">
              <p className="mb-5 text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Pilares do mandato
              </p>
              <ul className="flex flex-wrap justify-center gap-2">
                {PILARES.map((pilar) => (
                  <li key={pilar.slug}>
                    <Link
                      href={`/pilares/${pilar.slug}`}
                      className="inline-flex rounded-full border border-border px-4 py-2 text-sm transition-colors hover:border-primary hover:text-primary"
                    >
                      {pilar.tituloCurto}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
