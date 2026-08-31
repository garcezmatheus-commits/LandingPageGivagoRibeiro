import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Landmark, Gavel } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRAJETORIA } from "@/lib/conteudo";

const NUMEROS = [
  { valor: "5", rotulo: "Mundiais" },
  { valor: "Top 10", rotulo: "2009" },
  { valor: "20+", rotulo: "Países" },
];

const EXPERIENCIA = [
  { titulo: "Formação Acadêmica", Icone: GraduationCap, itens: TRAJETORIA.formacao, cor: "text-primary", bg: "bg-primary/10", ponto: "bg-primary" },
  { titulo: "Gestão Pública", Icone: Landmark, itens: TRAJETORIA.gestao, cor: "text-secondary", bg: "bg-secondary/10", ponto: "bg-secondary" },
  { titulo: "Atuação Legislativa", Icone: Gavel, itens: TRAJETORIA.legislativa, cor: "text-accent-foreground", bg: "bg-accent/30", ponto: "bg-accent" },
];

export function ApresentacaoSection() {
  return (
    <section id="apresentacao" className="bg-muted/30 py-16 md:py-24" aria-labelledby="apresentacao-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-14 text-center">
          <Badge className="mb-3">Conheça a Trajetória</Badge>
          <h2 id="apresentacao-titulo" className="text-balance font-heading text-3xl font-bold md:text-4xl">
            De Atleta a Gestor Público
          </h2>
          <p className="mt-3 text-muted-foreground">
            Uma jornada de raízes, disciplina e compromisso com Santa Maria
          </p>
        </ScrollReveal>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <Badge className="mb-3">Origem e Raízes</Badge>
            <h3 className="mb-4 font-heading text-2xl font-bold">
              Nascido no Campestre, Comprometido com Santa Maria
            </h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Nascido e criado no bairro Campestre, Givago Ribeiro tem uma relação visceral com a
              região. Estudou na escola municipal Hylda Vasconcellos e iniciou sua carreira na
              canoagem por meio de um projeto social na barragem do Campestre, experiência que
              moldou sua visão sobre o poder transformador do esporte e da natureza.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Sua trajetória carrega a autenticidade de quem conhece, por dentro, as dualidades
              locais: uma riqueza natural extraordinária, contrastando com desafios socioeconômicos
              reais. É a partir dessas raízes que Givago estrutura um olhar técnico, humano e focado
              em soluções para Santa Maria.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="/images/givago-origens.webp"
                alt="Givago Ribeiro no bairro Campestre de Santa Maria"
                width={600}
                height={400}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal delay={100} className="lg:order-2">
            <Badge className="mb-3">Atleta e Educador</Badge>
            <h3 className="mb-4 font-heading text-2xl font-bold">
              Disciplina de Atleta, Visão de Gestor
            </h3>
            <p className="mb-6 leading-relaxed text-muted-foreground">
              Como atleta de canoagem, representou o Brasil em cinco campeonatos mundiais e alcançou
              a <strong className="text-foreground">10ª posição no ranking mundial em 2009</strong>.
              Competir em mais de 20 países ampliou sua bagagem cultural e seu entendimento de
              políticas bem-sucedidas em educação, esporte, meio ambiente e desenvolvimento urbano.
            </p>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              A passagem do esporte para a gestão foi uma evolução natural: a mesma disciplina, metas
              claras e trabalho em equipe que levaram ao alto rendimento hoje orientam sua forma de
              governar, com planejamento, indicadores e resultados.
            </p>

            <ul className="grid grid-cols-3 gap-4">
              {NUMEROS.map((n) => (
                <li key={n.rotulo} className="rounded-xl bg-card p-4 text-center shadow-soft">
                  <p className="font-heading text-2xl font-bold tabular-nums text-primary">{n.valor}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.rotulo}</p>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal className="lg:order-1">
            <div className="overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="/images/givago-atleta.webp"
                alt="Givago Ribeiro como atleta de canoagem"
                width={600}
                height={400}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mb-10 text-center">
          <Badge className="mb-3">Capacidade Técnica</Badge>
          <h3 className="font-heading text-2xl font-bold">
            Formação e Experiência que Entregam Resultados
          </h3>
        </ScrollReveal>

        <ul className="grid gap-6 md:grid-cols-3">
          {EXPERIENCIA.map((bloco, i) => (
            <li key={bloco.titulo}>
              <ScrollReveal delay={i * 100}>
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${bloco.bg}`}>
                      <bloco.Icone className={`h-5 w-5 ${bloco.cor}`} aria-hidden="true" />
                    </div>
                    <h4 className="mb-3 font-heading text-lg font-bold">{bloco.titulo}</h4>
                    <ul className="space-y-2">
                      {bloco.itens.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
                          <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${bloco.ponto}`} aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ul>

        <ScrollReveal className="mt-10 text-center">
          <Button asChild size="lg">
            <Link href="/#contato">Fale com a Equipe</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
