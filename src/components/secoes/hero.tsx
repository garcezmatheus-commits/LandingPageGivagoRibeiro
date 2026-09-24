"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Pause, Play } from "lucide-react";
import { FotoComParallax } from "@/components/ui/foto-com-parallax";
import { Button } from "@/components/ui/button";
import { BlurText } from "@/components/ui/blur-text";
import { Onda } from "@/components/ui/onda";
import { ENTREGAS_HERO, MANDATO } from "@/lib/conteudo";
import { cn } from "@/lib/utils";

/*
  O hero é um carrossel de telas inteiras: a principal ("Gestão com Raiz")
  e, em seguida, as entregas do mandato. A principal fica 4s, cada entrega 6s,
  e depois volta ao começo.

  Quem marca o tempo é a própria barrinha de progresso (animação CSS): quando
  ela termina, o slide avança. Assim o que o visitante vê e o relógio real
  nunca se desencontram, e pausar é só congelar a animação.
*/
const DURACAO_PRINCIPAL = 4000;
const DURACAO_ENTREGA = 6000;
// Mesmo valor de --hero-troca no globals.css.
const DURACAO_TROCA = 1100;

type Slide =
  | { tipo: "principal"; rotulo: string; duracao: number }
  | ({ tipo: "entrega"; duracao: number } & (typeof ENTREGAS_HERO)[number]);

const SLIDES: Slide[] = [
  { tipo: "principal", rotulo: "Apresentação", duracao: DURACAO_PRINCIPAL },
  ...ENTREGAS_HERO.map((e) => ({ ...e, tipo: "entrega" as const, duracao: DURACAO_ENTREGA })),
];

const TOTAL = SLIDES.length;
const circular = (i: number) => (i + TOTAL) % TOTAL;

type Estado = "ativo" | "saindo" | "inativo";

export function HeroSection() {
  const secaoRef = React.useRef<HTMLElement>(null);
  const toqueRef = React.useRef<{ x: number; y: number } | null>(null);
  const limpezaRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const [ativo, setAtivo] = React.useState(0);
  const [saindo, setSaindo] = React.useState<number | null>(null);
  const [direcao, setDirecao] = React.useState<1 | -1>(1);
  // Conta as trocas. Zero = primeira pintura: nada anima, o título nasce
  // visível direto do HTML do servidor.
  const [ciclo, setCiclo] = React.useState(0);
  const [montados, setMontados] = React.useState<Set<number>>(() => new Set([0]));

  const [pronto, setPronto] = React.useState(false);
  const [reduzir, setReduzir] = React.useState(false);
  const [pausadoPeloUsuario, setPausadoPeloUsuario] = React.useState(false);
  const [foraDeTela, setForaDeTela] = React.useState(false);
  const [abaOculta, setAbaOculta] = React.useState(false);
  const [focoTeclado, setFocoTeclado] = React.useState(false);

  const autoplay = pronto && !reduzir;
  const rodando = autoplay && !pausadoPeloUsuario && !foraDeTela && !abaOculta && !focoTeclado;

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzir(mq.matches);
    const aoMudar = () => setReduzir(mq.matches);
    mq.addEventListener("change", aoMudar);
    setPronto(true);
    return () => mq.removeEventListener("change", aoMudar);
  }, []);

  // Rotação para quando o hero sai da tela ou a aba fica em segundo plano:
  // ninguém está olhando, e voltar no meio de uma entrega é melhor que voltar
  // três slides depois.
  React.useEffect(() => {
    const el = secaoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entrada]) => setForaDeTela(!entrada.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    const aoTrocarAba = () => setAbaOculta(document.hidden);
    // Página aberta em aba de fundo já nasce oculta, sem evento de mudança.
    aoTrocarAba();
    document.addEventListener("visibilitychange", aoTrocarAba);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", aoTrocarAba);
    };
  }, []);

  // Só a foto da tela principal entra no carregamento inicial. A próxima é
  // baixada depois da hidratação, e cada troca já busca a seguinte: nunca
  // disputa banda com a primeira pintura, e nunca aparece foto pela metade.
  React.useEffect(() => {
    if (!pronto) return;
    setMontados((atual) => {
      const proximo = circular(ativo + 1);
      if (atual.has(ativo) && atual.has(proximo)) return atual;
      return new Set(atual).add(ativo).add(proximo);
    });
  }, [ativo, pronto]);

  React.useEffect(() => () => clearTimeout(limpezaRef.current), []);

  const irPara = React.useCallback(
    (alvo: number, dir: 1 | -1) => {
      if (alvo === ativo) return;
      setDirecao(dir);
      setSaindo(ativo);
      setAtivo(alvo);
      setCiclo((c) => c + 1);
      clearTimeout(limpezaRef.current);
      limpezaRef.current = setTimeout(() => setSaindo(null), DURACAO_TROCA);
    },
    [ativo]
  );

  const avancar = () => irPara(circular(ativo + 1), 1);
  const voltar = () => irPara(circular(ativo - 1), -1);

  const estadoDe = (i: number): Estado => (i === ativo ? "ativo" : i === saindo ? "saindo" : "inativo");

  return (
    <section
      ref={secaoRef}
      id="inicio"
      aria-roledescription="carrossel"
      aria-label="Destaques do mandato"
      data-dir={direcao}
      className={cn(
        "hero-carrossel relative flex min-h-[36rem] items-center overflow-hidden py-32 md:min-h-[42rem] md:py-40",
        ciclo > 0 && "hero-trocou"
      )}
      style={{ minHeight: "min(100svh, 52rem)" }}
      onFocus={(e) => {
        // Só foco de teclado pausa. Clique de mouse também foca o botão, e
        // aí a rotação ficaria congelada sem o visitante ter pedido.
        if (e.target instanceof HTMLElement && e.target.matches(":focus-visible")) setFocoTeclado(true);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocoTeclado(false);
      }}
      onTouchStart={(e) => {
        const t = e.touches[0];
        toqueRef.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(e) => {
        const inicio = toqueRef.current;
        toqueRef.current = null;
        if (!inicio) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - inicio.x;
        const dy = t.clientY - inicio.y;
        // Deslize horizontal claro troca de slide; vertical é rolagem da página.
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
        if (dx < 0) avancar();
        else voltar();
      }}
    >
      <FotoComParallax>
        {SLIDES.map((slide, i) => (
          <div key={i} className="hero-fundo" data-estado={estadoDe(i)} aria-hidden={i !== ativo}>
            <div className="hero-fundo-movel">
              {montados.has(i) &&
                (slide.tipo === "principal" ? (
                  /*
                    Tela principal: enquadramento do rosto do Givago.

                    object-position 18% 38%: o rosto fica na borda esquerda da
                    foto original. O eixo X é o que importa no celular, onde
                    está a maioria das visitas.

                    A partir de lg, object-position não tem sobra para mover
                    (a seção trava em 52rem), então força-se sobra com scale +
                    translate: sobe o rosto em qualquer largura de desktop.
                    Testado em 1024, 1440, 1600 e 2200px (2026-09-11).

                    Qualidade 45 em todas as fotos do hero: vivem sob um véu de
                    ~80%, acima disso são bytes que ninguém enxerga.
                  */
                  <Image
                    src="/images/hero-bg.webp"
                    alt=""
                    fill
                    priority
                    quality={45}
                    sizes="100vw"
                    className="object-cover object-[18%_38%] lg:scale-125 lg:-translate-y-[10%]"
                  />
                ) : (
                  <Image
                    src={slide.imagem}
                    alt={slide.alt}
                    fill
                    quality={45}
                    sizes="100vw"
                    className={slide.foto}
                  />
                ))}
            </div>
          </div>
        ))}
      </FotoComParallax>

      {/*
        Com o conteúdo centralizado, o véu não pode ser assimétrico: o texto
        passa por cima da largura toda. Então o degradê é vertical, leve no
        topo e mais firme no miolo e embaixo, onde o texto precisa de
        contraste. É o mesmo para todas as telas: as fotos das entregas são
        muito diferentes entre si, o véu é o que mantém o hero uma coisa só.
      */}
      <div
        className="absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(30,102,38,0.78) 0%, rgba(30,102,38,0.76) 38%, rgba(24,93,121,0.80) 72%, rgba(24,93,121,0.86) 100%)",
        }}
      />

      {/* Marca-d'água com o nome, como no site original. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5] flex select-none items-center justify-center overflow-hidden font-heading text-[22vw] font-bold leading-none text-white/10"
      >
        GIVAGO
      </span>

      {/*
        O bloco de conteúdo é centralizado verticalmente na seção, e o
        indicador de rolagem fica ancorado de forma absoluta no rodapé. O
        padding-bottom reserva a folga para os dois não colidirem.

        Os textos de todas as telas ficam empilhados na mesma célula de grid:
        a altura do bloco é a do maior, então os botões não pulam a cada troca.
      */}
      <div className="container-custom relative z-10 px-4 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="grid w-full" aria-live={rodando ? "off" : "polite"}>
            {SLIDES.map((slide, i) => {
              const estado = estadoDe(i);
              const animar = ciclo > 0 && estado === "ativo";
              return (
                <div
                  key={i}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${TOTAL}: ${slide.rotulo}`}
                  aria-hidden={estado !== "ativo"}
                  inert={estado !== "ativo"}
                  data-estado={estado}
                  className="hero-texto flex flex-col items-center self-center [grid-area:1/1]"
                >
                  {slide.tipo === "principal" ? (
                    <React.Fragment key={estado === "ativo" ? ciclo : "ocioso"}>
                      <p className="hero-revela mb-5 flex items-center gap-3 text-sm font-medium uppercase tracking-widest text-white">
                        <span className="h-px w-10 bg-accent" aria-hidden="true" />
                        {MANDATO.cargo}
                        <span className="h-px w-10 bg-accent" aria-hidden="true" />
                      </p>

                      <BlurText
                        as="h1"
                        animar={animar}
                        inicio={0.3}
                        linhas={[{ texto: "Gestão com Raiz," }, { texto: "Disciplina e Resultado" }]}
                        className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
                      />

                      <p
                        className="hero-revela mt-7 max-w-2xl text-lg leading-relaxed text-white md:text-xl"
                        style={{ "--atraso": "650ms" } as React.CSSProperties}
                      >
                        Givago é o gestor público que, com a disciplina de atleta e a visão de quem conhece
                        a cidade em suas raízes, transforma o potencial natural e humano em desenvolvimento
                        concreto e qualidade de vida dos santamarienses.
                      </p>
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={estado === "ativo" ? ciclo : "ocioso"}>
                      <BlurText
                        as="h2"
                        animar={animar}
                        inicio={0.3}
                        linhas={[
                          { texto: slide.dor, className: "text-accent" },
                          { texto: slide.solucao },
                        ]}
                        className="text-balance font-heading text-[2rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-[3.5rem] lg:text-6xl"
                      />
                      <p
                        className="hero-revela mt-7 max-w-2xl text-lg leading-relaxed text-white md:text-xl"
                        style={{ "--atraso": "750ms" } as React.CSSProperties}
                      >
                        {slide.texto}
                      </p>
                    </React.Fragment>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

          {/* Linha de apoio: na tela principal, o compromisso; nas entregas, a fonte. */}
          <div className="mt-10 grid w-full max-w-xl">
            {SLIDES.map((slide, i) => {
              const estado = estadoDe(i);
              return (
                <p
                  key={`${i}-${estado === "ativo" ? ciclo : "ocioso"}`}
                  aria-hidden={estado !== "ativo"}
                  data-estado={estado}
                  className="hero-texto flex items-center justify-center gap-2 text-sm text-white/85 [grid-area:1/1]"
                >
                  {slide.tipo === "principal" ? (
                    <span className="hero-revela" style={{ "--atraso": "850ms" } as React.CSSProperties}>
                      Mandato comprometido com transparência, participação social e resultados mensuráveis.
                    </span>
                  ) : (
                    <span
                      className="hero-revela inline-flex items-center gap-2"
                      style={{ "--atraso": "950ms" } as React.CSSProperties}
                    >
                      <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
                      {slide.fonte}
                    </span>
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-8 flex items-center gap-3">
            {autoplay && (
              <button
                type="button"
                onClick={() => setPausadoPeloUsuario((p) => !p)}
                aria-label={pausadoPeloUsuario ? "Retomar a troca automática dos destaques" : "Pausar a troca automática dos destaques"}
                className="flex size-8 items-center justify-center rounded-full border border-white/30 text-white/85 transition-colors hover:border-white/70 hover:text-white"
              >
                {pausadoPeloUsuario ? (
                  <Play className="size-3.5 translate-x-px fill-current" aria-hidden="true" />
                ) : (
                  <Pause className="size-3.5 fill-current" aria-hidden="true" />
                )}
              </button>
            )}

            <div className="flex items-center gap-1.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => irPara(i, i > ativo ? 1 : -1)}
                  aria-label={`Mostrar destaque ${i + 1} de ${TOTAL}: ${slide.rotulo}`}
                  aria-current={i === ativo ? "true" : undefined}
                  className="group flex h-8 w-7 items-center md:w-10"
                >
                  <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/25 transition-colors group-hover:bg-white/45">
                    {i === ativo && (
                      <span
                        key={ciclo}
                        className={cn(
                          "absolute inset-0 origin-left rounded-full bg-accent",
                          autoplay ? "hero-progresso" : "scale-x-100"
                        )}
                        style={
                          autoplay
                            ? ({
                                "--duracao": `${slide.duracao}ms`,
                                animationPlayState: rodando ? "running" : "paused",
                              } as React.CSSProperties)
                            : undefined
                        }
                        onAnimationEnd={avancar}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Onda className="text-background" />

      <a
        href="#destaques"
        className="group absolute inset-x-0 bottom-20 z-30 mx-auto flex w-fit flex-col items-center gap-2 md:bottom-28"
      >
        <span className="text-sm text-white/85 transition-colors group-hover:text-white">
          Rolar para baixo
        </span>
        <span className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-1 transition-colors group-hover:border-white/80">
          <span className="h-3 w-1.5 animate-pulse rounded-full bg-white/70 transition-colors group-hover:bg-white" />
        </span>
      </a>
    </section>
  );
}
