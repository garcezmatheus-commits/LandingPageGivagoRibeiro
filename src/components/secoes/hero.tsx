import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MANDATO } from "@/lib/conteudo";

export function HeroSection() {
  return (
    <section id="inicio" className="relative flex min-h-[36rem] items-center overflow-hidden py-32 md:min-h-[42rem] md:py-40"
      style={{ minHeight: "min(100svh, 52rem)" }}>
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Gradiente nas cores do mandato, garantindo contraste do texto sobre a foto. */}
      <div
        className="absolute inset-0 z-10 bg-linear-to-r from-primary/90 via-primary/80 to-secondary/70"
        aria-hidden="true"
      />

      {/* Marca-d'água com o nome, como no site original. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] flex select-none items-center justify-center overflow-hidden font-heading text-[22vw] font-bold leading-none text-white/10"
      >
        GIVAGO
      </span>

      <div className="container-custom relative z-10 px-4 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/80">
            {MANDATO.cargo}
          </p>
          <h1 className="text-balance font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            Gestão com Raiz,
            <br />
            Disciplina e Resultado
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
            Givago é o gestor público que, com a disciplina de atleta e a visão de quem conhece a
            cidade em suas raízes, transforma o potencial natural e humano em desenvolvimento
            concreto e qualidade de vida dos santamarienses.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="accent">
              <Link href="/#pilares">Conheça os Pilares</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              <Link href="/#contato">Fale com a gente</Link>
            </Button>
          </div>

          <p className="mt-10 max-w-xl text-sm text-white/70">
            Mandato comprometido com transparência, participação social e resultados mensuráveis.
          </p>
        </div>
      </div>

      <a
        href="#destaques"
        className="group absolute inset-x-0 bottom-8 z-10 mx-auto flex w-fit flex-col items-center gap-2"
      >
        <span className="text-sm text-white/70 transition-colors group-hover:text-white">
          Rolar para baixo
        </span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1 transition-colors group-hover:border-white/80">
          <span className="h-3 w-1.5 animate-pulse rounded-full bg-white/70 transition-colors group-hover:bg-white" />
        </span>
      </a>
    </section>
  );
}
