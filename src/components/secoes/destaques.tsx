import { MapPin, Target, Leaf, Trophy, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { DESTAQUES } from "@/lib/conteudo";

const ICONES: Record<string, LucideIcon> = { MapPin, Target, Leaf, Trophy };

export function DestaquesSection() {
  return (
    <section id="destaques" className="py-16 md:py-24" aria-labelledby="destaques-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal>
          <h2 id="destaques-titulo" className="mb-10 text-balance text-center font-heading text-3xl font-bold md:text-4xl">
            Destaques do Mandato
          </h2>
        </ScrollReveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {DESTAQUES.map((destaque, i) => {
            const Icone = ICONES[destaque.icone];
            return (
              <li key={destaque.id}>
                <ScrollReveal delay={i * 100}>
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <div
                        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${destaque.bgCor}`}
                      >
                        <Icone className={`h-5 w-5 ${destaque.cor}`} aria-hidden="true" />
                      </div>
                      <h3 className="mb-2 font-heading text-lg font-bold">{destaque.titulo}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {destaque.descricao}
                      </p>
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
