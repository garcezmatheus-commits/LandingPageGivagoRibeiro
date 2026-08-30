import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Leaf, Trophy, Palette, Heart, ArrowLeft, type LucideIcon } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PILARES } from "@/lib/conteudo";

const ICONES: Record<string, LucideIcon> = { Leaf, Trophy, Palette, Heart };

export function generateStaticParams() {
  return PILARES.map((pilar) => ({ slug: pilar.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pilar = PILARES.find((p) => p.slug === slug);

  if (!pilar) return {};

  return { title: pilar.titulo, description: pilar.descricao };
}

export default async function PaginaDePilar({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pilar = PILARES.find((p) => p.slug === slug);

  if (!pilar) notFound();

  const Icone = ICONES[pilar.icone];

  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="relative flex min-h-[60vh] items-center overflow-hidden">
          <Image src={pilar.imagem} alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/90 to-secondary/80" aria-hidden="true" />

          <div className="container-custom relative z-10 px-4 py-32 md:px-8">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <Icone className="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-white/80">
                Pilar {pilar.numero}
              </span>
            </div>
            <h1 className="max-w-4xl font-heading text-3xl font-bold leading-tight text-white md:text-5xl">
              {pilar.titulo}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">{pilar.subtitulo}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container-custom max-w-4xl px-4 md:px-8">
            <ScrollReveal>
              <Badge className="mb-3">Sobre este Pilar</Badge>
              {pilar.sobre.map((paragrafo) => (
                <p key={paragrafo} className="mb-4 leading-relaxed text-muted-foreground">
                  {paragrafo}
                </p>
              ))}
            </ScrollReveal>

            <ScrollReveal className="mt-14">
              <h2 className="mb-6 font-heading text-2xl font-bold">Frentes de Ação</h2>
              <ul className="space-y-4">
                {pilar.frentes.map((frente, i) => (
                  <li key={frente.titulo}>
                    <ScrollReveal delay={i * 80}>
                      <Card>
                        <CardContent className="flex gap-4 pt-6">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${pilar.bgCor} font-heading font-bold ${pilar.cor}`}
                            aria-hidden="true"
                          >
                            {i + 1}
                          </span>
                          <span>
                            <strong className="mb-1 block font-heading text-lg">{frente.titulo}</strong>
                            <span className="text-sm leading-relaxed text-muted-foreground">
                              {frente.descricao}
                            </span>
                          </span>
                        </CardContent>
                      </Card>
                    </ScrollReveal>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <div className="mt-12 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/#pilares">
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Voltar aos Pilares
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
