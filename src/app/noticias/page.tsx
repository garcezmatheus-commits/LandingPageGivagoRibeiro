import type { Metadata } from "next";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListaDeNoticias } from "@/components/lista-de-noticias";
import { MANDATO } from "@/lib/conteudo";
import { buscarNoticias, type Noticia } from "@/lib/wordpress";

export const metadata: Metadata = {
  title: "Notícias",
  description: "Acompanhe ações, projetos e resultados do mandato.",
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
            <ListaDeNoticias noticias={noticias} />
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
