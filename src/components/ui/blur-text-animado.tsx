"use client";

import { LazyMotion, useReducedMotion, type Easing, type Transition } from "motion/react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";
import { TituloEstatico, type BlurTextProps } from "./blur-text";

/**
 * Texto que surge palavra por palavra saindo do desfoque.
 *
 * Origem: React Bits, BlurText (variante TS-TW),
 * github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/TextAnimations/BlurText/BlurText.tsx
 * Licença MIT + Commons Clause. Consultado em 2026-09-23.
 *
 * Adaptações para este site:
 * - `as`: o original sempre renderiza <p>; aqui o título do hero precisa ser
 *   h1/h2 de verdade.
 * - `linhas`: o título tem quebra fixa e a primeira parte ("a dor") muda de
 *   cor. Cada linha é um bloco, para o text-balance equilibrar uma de cada
 *   vez. O original só aceita uma string corrida.
 * - Leitor de tela lê a frase inteira pelo aria-label; os pedaços animados
 *   ficam aria-hidden (o original faz o leitor soletrar palavra por palavra).
 * - Disparo: o original usa IntersectionObserver. No carrossel do hero quem
 *   decide é a troca de slide (ver blur-text.tsx), e a primeira tela nasce
 *   visível sem esperar JavaScript (ver padrão "auditar herói no viewport").
 * - Quem pede menos movimento recebe o texto parado.
 * - Este arquivo inteiro só é baixado depois que a página carrega (ver
 *   blur-text.tsx), e ainda usa LazyMotion + `m` com o motor de animação sob
 *   demanda (motion-recursos.ts): a home não paga por uma animação que só
 *   acontece a partir da primeira troca, aos 4s.
 */
export const carregarRecursos = () => import("./motion-recursos").then((r) => r.default);

type Props = Omit<BlurTextProps, "animar"> & {
  /** Atraso antes da primeira palavra, em segundos. */
  inicio?: number;
  /** Intervalo entre palavras, em milissegundos. */
  delay?: number;
  direction?: "top" | "bottom";
  easing?: Easing | Easing[];
  stepDuration?: number;
};

export default function BlurTextAnimado({
  linhas,
  as: Tag = "p",
  className = "",
  inicio = 0,
  delay = 70,
  direction = "bottom",
  easing = [0.16, 1, 0.3, 1],
  stepDuration = 0.35,
}: Props) {
  const reduzir = useReducedMotion();
  const rotulo = linhas.map((l) => l.texto).join(" ");

  if (reduzir) return <TituloEstatico linhas={linhas} as={Tag} className={className} />;

  const y = direction === "top" ? -24 : 24;
  const de = { filter: "blur(10px)", opacity: 0, y };
  const para = {
    filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
    opacity: [0, 0.6, 1],
    y: [y, -y / 8, 0],
  };

  // Índice contínuo entre linhas: a segunda linha continua a cadência da
  // primeira em vez de recomeçar junto com ela.
  let ordem = 0;

  return (
    <LazyMotion features={carregarRecursos} strict>
      <Tag className={className} aria-label={rotulo}>
        {linhas.map((linha, l) => {
          const palavras = linha.texto.split(" ");
          return (
            <span key={l} className={cn("block", linha.className)} aria-hidden="true">
              {palavras.map((palavra, i) => {
                const transicao: Transition = {
                  duration: stepDuration * 2,
                  times: [0, 0.5, 1],
                  delay: inicio + (ordem++ * delay) / 1000,
                  ease: easing,
                };
                return (
                  <m.span
                    key={i}
                    initial={de}
                    animate={para}
                    transition={transicao}
                    className="inline-block will-change-[transform,filter,opacity]"
                  >
                    {palavra}
                    {i < palavras.length - 1 && "\u00A0"}
                  </m.span>
                );
              })}
            </span>
          );
        })}
      </Tag>
    </LazyMotion>
  );
}
