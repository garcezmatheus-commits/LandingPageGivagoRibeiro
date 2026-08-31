import Image from "next/image";
import Link from "next/link";
import { Leaf, Trophy, Palette, Heart, ArrowRight, type LucideIcon } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { PILARES } from "@/lib/conteudo";

const ICONES: Record<string, LucideIcon> = { Leaf, Trophy, Palette, Heart };

/**
 * Pilares.
 *
 * A versão anterior punha cards claros sobre uma foto de fundo: as imagens
 * dos cards brigavam com a textura atrás e o conjunto ficava sujo. Aqui a
 * foto de cada pilar *é* o card — o texto vive sobre ela, sob um degradê que
 * garante leitura. Menos elementos, mais impacto, e as fotos do mandato
 * finalmente aparecem em tamanho que vale a pena.
 */
export function PilaresSection() {
  return (
    <section
      id="pilares"
      className="bg-foreground py-20 md:py-28"
      aria-labelledby="pilares-titulo"
    >
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-14 max-w-2xl">
          <RotuloSecao claro className="mb-4">
            Plataforma de Governo
          </RotuloSecao>
          <h2
            id="pilares-titulo"
            className="text-balance font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Pilares Estratégicos
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            Quatro eixos que orientam as ações e projetos para uma Santa Maria mais próspera,
            sustentável e acolhedora.
          </p>
        </ScrollReveal>

        <ul className="grid gap-5 md:grid-cols-2">
          {PILARES.map((pilar, i) => {
            const Icone = ICONES[pilar.icone];

            return (
              <li key={pilar.id}>
                <ScrollReveal delay={i * 90} className="h-full">
                  <Link
                    href={`/pilares/${pilar.slug}`}
                    className="group relative block h-full min-h-[26rem] overflow-hidden rounded-2xl md:min-h-[30rem]"
                  >
                    <Image
                      src={pilar.imagem}
                      alt={pilar.imagemAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Degradê de baixo para cima: a foto respira em cima, o texto lê embaixo. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-foreground via-foreground/80 via-40% to-transparent"
                    />

                    <span className="relative flex h-full flex-col justify-end p-7 md:p-8">
                      <span className="mb-4 flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                          <Icone className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <span className="font-heading text-5xl font-bold leading-none text-white/25 tabular-nums">
                          {pilar.numero}
                        </span>
                      </span>

                      <span className="block text-balance font-heading text-2xl font-bold leading-tight text-white md:text-3xl">
                        {pilar.titulo}
                      </span>

                      <span className="mt-3 block max-w-md leading-relaxed text-white/75">
                        {pilar.descricao}
                      </span>

                      {/*
                        As frentes de ação só apareciam na página interna. Aqui elas
                        se abrem no hover e no foco pelo teclado: quem passa o olho
                        já vê o que o pilar entrega, sem precisar clicar.
                        Fecha-se sob prefers-reduced-motion, mostrando tudo aberto.
                      */}
                      <span className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] motion-reduce:grid-rows-[1fr] motion-reduce:transition-none">
                        <span className="overflow-hidden">
                          <span className="mt-4 flex flex-col gap-2 border-l-2 border-accent pl-4">
                            {pilar.frentes.map((frente) => (
                              <span key={frente.titulo} className="block text-sm leading-snug text-white/80">
                                {frente.titulo}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>

                      <span className="mt-5 inline-flex items-center gap-2 font-medium text-accent">
                        Ver as frentes de ação
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                  </Link>
                </ScrollReveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
