import Link from "next/link";
import { Trophy, Globe, Medal, FileCheck2, CheckCircle2, Landmark } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { NumeroAnimado } from "@/components/ui/numero-animado";
import { Button } from "@/components/ui/button";
import { PROJETOS_CONCLUIDOS, PROJETOS_EM_TRAMITE } from "@/lib/conteudo";

/**
 * Substitui os antigos "Destaques do Mandato", que repetiam os Pilares com
 * outras palavras.
 *
 * Aqui ficam as duas coisas que só o Givago tem: a carreira de atleta de alto
 * rendimento e o que o mandato já entregou. Os números do legislativo são
 * calculados a partir das listas de projetos, então não têm como divergir do
 * que a página mostra logo abaixo.
 */

const TOTAL_PROJETOS = PROJETOS_CONCLUIDOS.length + PROJETOS_EM_TRAMITE.length;

const ATLETA = [
  { icone: Trophy, valor: "5", rotulo: "Campeonatos mundiais", detalhe: "representando o Brasil" },
  { icone: Medal, valor: "10º", rotulo: "No ranking mundial", detalhe: "em 2009" },
  { icone: Globe, valor: "20+", rotulo: "Países", detalhe: "onde competiu" },
];

const MANDATO_NUMEROS = [
  { icone: FileCheck2, valor: String(TOTAL_PROJETOS), rotulo: "Projetos de lei", detalhe: "apresentados" },
  { icone: CheckCircle2, valor: String(PROJETOS_CONCLUIDOS.length), rotulo: "Já concluídos", detalhe: "aprovados e implementados" },
  { icone: Landmark, valor: "2023", rotulo: "Presidente da Câmara", detalhe: "líder do governo em 2024 e 2025" },
];

function Bloco({
  titulo,
  descricao,
  itens,
  destaque,
}: {
  titulo: string;
  descricao: string;
  itens: typeof ATLETA;
  destaque: "accent" | "primary";
}) {
  const corValor = destaque === "accent" ? "text-accent-foreground" : "text-primary";
  const corIcone = destaque === "accent" ? "bg-accent/30 text-accent-foreground" : "bg-primary/10 text-primary";

  return (
    <div>
      <h3 className="font-heading text-2xl font-bold tracking-tight">{titulo}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{descricao}</p>

      <ul className="mt-8 space-y-8">
        {itens.map((item) => (
          <li key={item.rotulo} className="flex items-start gap-5">
            <span className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${corIcone}`}>
              <item.icone className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span
                className={`block font-heading text-6xl font-bold leading-[0.9] tracking-tight tabular-nums md:text-7xl ${corValor}`}
              >
                <NumeroAnimado valor={item.valor} />
              </span>
              <span className="mt-2 block text-lg font-medium leading-tight">{item.rotulo}</span>
              <span className="block text-sm text-muted-foreground">{item.detalhe}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CredenciaisSection() {
  return (
    <section id="destaques" className="py-16 md:py-24" aria-labelledby="credenciais-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Trajetória
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </p>
          <h2
            id="credenciais-titulo"
            className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Disciplina de atleta, entrega de gestor
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A mesma rotina que levou ao alto rendimento hoje orienta o trabalho na Câmara.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="grid gap-10 rounded-2xl border border-border bg-card p-8 shadow-soft md:grid-cols-2 md:gap-12 md:p-12">
            <Bloco
              titulo="No esporte"
              descricao="Canoagem, seleção brasileira e alto rendimento."
              itens={ATLETA}
              destaque="accent"
            />

            <div className="border-t border-border pt-10 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <Bloco
                titulo="No mandato"
                descricao="O que já foi proposto e aprovado na Câmara."
                itens={MANDATO_NUMEROS}
                destaque="primary"
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/#apresentacao">Conheça a trajetória completa</Link>
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
