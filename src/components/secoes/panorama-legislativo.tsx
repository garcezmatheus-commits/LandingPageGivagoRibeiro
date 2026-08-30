import { CheckCircle2, Clock } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJETOS_CONCLUIDOS, PROJETOS_EM_TRAMITE, type ProjetoDeLei } from "@/lib/conteudo";

function ListaDeProjetos({
  projetos,
  Icone,
  cor,
  bg,
}: {
  projetos: ProjetoDeLei[];
  Icone: typeof CheckCircle2;
  cor: string;
  bg: string;
}) {
  return (
    <ul className="space-y-4">
      {projetos.map((projeto) => (
        <li key={projeto.numero}>
          <Card>
            <CardContent className="flex gap-4 pt-6">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg}`}>
                <Icone className={`h-5 w-5 ${cor}`} aria-hidden="true" />
              </div>
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h4 className="font-heading font-bold leading-snug">{projeto.titulo}</h4>
                  <Badge className="shrink-0">{projeto.numero}</Badge>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{projeto.situacao}</p>
              </div>
            </CardContent>
          </Card>
        </li>
      ))}
    </ul>
  );
}

export function PanoramaLegislativoSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="panorama-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <Badge className="mb-3">Panorama Legislativo 2026</Badge>
          <h2 id="panorama-titulo" className="text-balance font-heading text-3xl font-bold md:text-4xl">
            Projetos de Lei do Vereador Givago
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            Acompanhe o andamento das principais iniciativas e projetos de lei propostos pelo
            mandato do Vereador Givago Ribeiro, divididos entre as propostas já concluídas e as que
            seguem em tramitação.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <ScrollReveal>
            <h3 className="font-heading text-xl font-bold">Projetos Finalizados e Concluídos</h3>
            <p className="mb-5 text-sm text-muted-foreground">Propostas aprovadas e implementadas</p>
            <ListaDeProjetos
              projetos={PROJETOS_CONCLUIDOS}
              Icone={CheckCircle2}
              cor="text-primary"
              bg="bg-primary/10"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <h3 className="font-heading text-xl font-bold">Projetos em Trâmite</h3>
            <p className="mb-5 text-sm text-muted-foreground">Em análise legislativa</p>
            <ListaDeProjetos
              projetos={PROJETOS_EM_TRAMITE}
              Icone={Clock}
              cor="text-secondary"
              bg="bg-secondary/10"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
