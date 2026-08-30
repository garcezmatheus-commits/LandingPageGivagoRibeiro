import Image from "next/image";
import Link from "next/link";
import { Leaf, Trophy, Palette, Heart, ArrowRight, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PILARES } from "@/lib/conteudo";

const ICONES: Record<string, LucideIcon> = { Leaf, Trophy, Palette, Heart };

export function PilaresSection() {
  return (
    <section id="pilares" className="bg-muted/30 py-16 md:py-24" aria-labelledby="pilares-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <Badge className="mb-3">Plataforma de Governo</Badge>
          <h2 id="pilares-titulo" className="font-heading text-3xl font-bold md:text-4xl">
            Pilares Estratégicos
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Quatro eixos que orientam as ações e projetos para uma Santa Maria mais próspera,
            sustentável e acolhedora. Clique em cada pilar para saber mais.
          </p>
        </ScrollReveal>

        <ul className="grid gap-8 md:grid-cols-2">
          {PILARES.map((pilar, i) => {
            const Icone = ICONES[pilar.icone];
            return (
              <li key={pilar.id}>
                <ScrollReveal delay={i * 100}>
                  <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={pilar.imagem}
                        alt={pilar.imagemAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <CardContent className="pt-6">
                      <div className="mb-3 flex items-center gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${pilar.bgCor}`}>
                          <Icone className={`h-5 w-5 ${pilar.cor}`} aria-hidden="true" />
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Pilar {pilar.numero}
                        </span>
                      </div>

                      <h3 className="mb-2 font-heading text-xl font-bold leading-snug">
                        {pilar.titulo}
                      </h3>
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {pilar.descricao}
                      </p>

                      <ul className="mb-5 space-y-2">
                        {pilar.frentes.map((frente) => (
                          <li key={frente.titulo} className="flex gap-2 text-sm text-muted-foreground">
                            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${pilar.cor.replace("text-", "bg-")}`} aria-hidden="true" />
                            {frente.titulo}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/pilares/${pilar.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                      >
                        Saiba mais sobre o Pilar {pilar.numero}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
