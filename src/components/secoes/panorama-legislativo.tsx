import { CheckCircle2, Clock, CircleSlash, Info, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PROJETOS_CONCLUIDOS,
  PROJETOS_EM_TRAMITE,
  PROJETOS_NAO_AVANCARAM,
  PERFIL_CITTA,
  type ProjetoDeLei,
} from "@/lib/conteudo";
import { Button } from "@/components/ui/button";
import { AcompanharProjeto } from "@/components/acompanhar-projeto";

/**
 * Os dois grupos não têm o mesmo peso: o que já foi aprovado é resultado, o
 * que está tramitando é promessa. A coluna dos concluídos vem primeiro e com
 * mais destaque visual; a dos em trâmite fica mais discreta.
 */

function Concluido({ projeto }: { projeto: ProjetoDeLei }) {
  return (
    <Card className="border-primary/25 bg-primary/[0.03]">
      <CardContent className="flex gap-4 pt-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="mb-1 flex flex-wrap items-center gap-2">
            <strong className="font-heading text-lg leading-snug">{projeto.titulo}</strong>
            <Badge className="shrink-0 bg-primary/10 text-primary">{projeto.numero}</Badge>
          </span>
          <span className="block text-sm leading-relaxed text-muted-foreground">
            {projeto.situacao}
          </span>
        </span>
      </CardContent>
    </Card>
  );
}

function EmTramite({ projeto }: { projeto: ProjetoDeLei }) {
  return (
    <div className="flex gap-3 border-b border-border py-4 last:border-b-0">
      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium leading-snug">{projeto.titulo}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{projeto.numero}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{projeto.situacao}</p>
        <AcompanharProjeto projeto={projeto} />
      </div>
    </div>
  );
}

/** Projeto que travou ou foi rejeitado, com o motivo à mostra. */
function NaoAvancou({ projeto }: { projeto: ProjetoDeLei }) {
  return (
    <div className="flex gap-3 border-b border-border py-4 last:border-b-0">
      <CircleSlash className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium leading-snug">{projeto.titulo}</span>
          <span className="shrink-0 text-xs text-muted-foreground">{projeto.numero}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{projeto.situacao}</p>
        {projeto.motivo && (
          <p className="mt-2 flex gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-medium text-foreground">Por que não avançou: </strong>
              {projeto.motivo}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export function PanoramaLegislativoSection() {
  const total = PROJETOS_CONCLUIDOS.length + PROJETOS_EM_TRAMITE.length;

  return (
    <section className="py-16 md:py-24" aria-labelledby="panorama-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <RotuloSecao centralizado={true} className="mb-4">Panorama Legislativo 2026</RotuloSecao>
          <h2
            id="panorama-titulo"
            className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Projetos de Lei do Vereador Givago
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            {total} iniciativas apresentadas: {PROJETOS_CONCLUIDOS.length} já concluídas e{" "}
            {PROJETOS_EM_TRAMITE.length} em tramitação na Câmara.
          </p>

          <Button asChild variant="outline" size="lg" className="mt-6">
            <a href={PERFIL_CITTA} target="_blank" rel="noopener noreferrer">
              Consultar na Câmara Municipal
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Perfil oficial no sistema legislativo da Câmara de Santa Maria
          </p>
        </ScrollReveal>

        <div className="grid items-start gap-10 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-3">
            <div className="mb-5 flex items-center gap-2">
              <h3 className="font-heading text-xl font-bold">Aprovados e implementados</h3>
              <Badge className="bg-primary/10 text-primary">{PROJETOS_CONCLUIDOS.length}</Badge>
            </div>
            <ul className="space-y-4">
              {PROJETOS_CONCLUIDOS.map((projeto) => (
                <li key={projeto.numero}>
                  <Concluido projeto={projeto} />
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={100} className="lg:col-span-2">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="font-heading text-lg font-bold text-muted-foreground">
                Em tramitação
              </h3>
              <Badge>{PROJETOS_EM_TRAMITE.length}</Badge>
            </div>
            <div className="rounded-2xl border border-border bg-card px-5 shadow-soft">
              {PROJETOS_EM_TRAMITE.map((projeto) => (
                <EmTramite key={projeto.numero} projeto={projeto} />
              ))}
            </div>
          </ScrollReveal>
        </div>

        {PROJETOS_NAO_AVANCARAM.length > 0 && (
          <ScrollReveal className="mt-12">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="font-heading text-xl font-bold">O que não avançou</h3>
                <Badge>{PROJETOS_NAO_AVANCARAM.length}</Badge>
              </div>
              <p className="mb-4 max-w-2xl text-sm text-muted-foreground">
                Prestação de contas também é mostrar o que travou. Abaixo, as propostas que
                não seguiram adiante e a razão de cada uma.
              </p>
              <div>
                {PROJETOS_NAO_AVANCARAM.map((projeto) => (
                  <NaoAvancou key={projeto.numero} projeto={projeto} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
