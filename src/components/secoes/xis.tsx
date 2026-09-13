import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { Badge } from "@/components/ui/badge";

/**
 * Lei da Cidade do Xis — única com documentação primária completa no acervo
 * (PL e lei sancionada em PDF), por isso ganha destaque com foto em vez de
 * entrar só como linha no Panorama Legislativo.
 *
 * Cuidado factual já registrado no projeto: a denominação legal é "Cidade do
 * Xis". "Capital do xis" é chamada criativa usada em peças de divulgação e
 * não pode aparecer aqui como se fosse o título da lei.
 */
export function XisSection() {
  return (
    <section id="lei-do-xis" className="bg-muted/30 py-16 md:py-24" aria-labelledby="xis-titulo">
      <div className="container-custom px-4 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScrollReveal>
            <RotuloSecao className="mb-4">Lei de autoria do mandato</RotuloSecao>
            <h2
              id="xis-titulo"
              className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl"
            >
              A lei que fez de Santa Maria a Cidade do Xis
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Em 2023, Givago apresentou o Projeto de Lei nº 9.715/2023, que denomina
              Santa Maria como <strong className="text-foreground">&ldquo;Cidade do Xis&rdquo;</strong> e
              institui o Festival do Xis no calendário oficial de eventos do município.
              Aprovado na Câmara, o projeto foi sancionado como{" "}
              <strong className="text-foreground">Lei Municipal nº 6.879, em 26/03/2024</strong>.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A tradição segue viva: a Prefeitura já anunciou o Festival Nacional do Xis
              para novembro de 2026, no Largo da Gare — evento que a lei do mandato
              ajudou a colocar no calendário da cidade.
            </p>
            <Badge className="mt-6">PL nº 9.715/2023 → Lei nº 6.879/2024</Badge>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="foto-do-mandato overflow-hidden rounded-2xl shadow-soft">
              <Image
                src="/images/festival-do-xis.webp"
                alt="Sanduíche gigante preparado no Festival do Xis, em Santa Maria"
                width={1225}
                height={816}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={70}
                className="h-auto w-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
