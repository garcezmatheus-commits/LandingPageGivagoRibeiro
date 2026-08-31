import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Onda } from "@/components/ui/onda";
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
      {/*
        Véu assimétrico: pesado à esquerda, onde fica o texto, e quase limpo à
        direita, onde aparecem o rosto do Givago e a cidade. Um gradiente
        uniforme dava contraste mas apagava a foto — que é a âncora emocional
        da página.
      */}
      <div
        className="absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(95deg, rgba(30,102,38,0.94) 0%, rgba(30,102,38,0.86) 28%, rgba(30,102,38,0.62) 48%, rgba(24,93,121,0.34) 72%, rgba(24,93,121,0.20) 100%)",
        }}
      />

      {/* Marca-d'água com o nome, como no site original. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] flex select-none items-center justify-center overflow-hidden font-heading text-[22vw] font-bold leading-none text-white/10"
      >
        GIVAGO
      </span>

      <div className="container-custom relative z-10 px-4 md:px-8">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white/90">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            {MANDATO.cargo}
          </p>
          <h1 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Gestão com Raiz,
            <br />
            Disciplina e Resultado
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
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

      <Onda className="text-background" />

      <a
        href="#destaques"
        className="group absolute inset-x-0 bottom-20 z-30 mx-auto flex w-fit flex-col items-center gap-2 md:bottom-28"
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
