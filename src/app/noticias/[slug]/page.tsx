import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { buscarNoticiaPorSlug, formatarData } from "@/lib/wordpress";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = await buscarNoticiaPorSlug(slug);

  if (!noticia) return {};

  return {
    title: noticia.titulo,
    description: noticia.resumo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      images: noticia.imagem ? [noticia.imagem] : undefined,
      type: "article",
      publishedTime: noticia.data,
    },
  };
}

export default async function PaginaDeNoticia({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const noticia = await buscarNoticiaPorSlug(slug);

  if (!noticia) notFound();

  return (
    <>
      <Header />
      <main id="conteudo">
        <article className="pb-16 pt-32 md:pt-40">
          <div className="container-custom max-w-3xl px-4 md:px-8">
            <p className="mb-3 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={noticia.data}>{formatarData(noticia.data)}</time>
            </p>

            <h1 className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              {noticia.titulo}
            </h1>

            {noticia.imagem && (
              <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={noticia.imagem}
                  alt={noticia.imagemAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}

            {/*
              O conteúdo vem do WordPress do mandato, uma fonte confiável e
              controlada pelo gabinete.
            */}
            <div
              className="conteudo-wp mt-8"
              dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
            />

            <div className="mt-12 border-t border-border pt-8">
              <Button asChild variant="outline">
                <Link href="/noticias">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Voltar às notícias
                </Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
