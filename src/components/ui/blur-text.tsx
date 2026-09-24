"use client";

import { LazyMotion, domAnimation, m, useReducedMotion, type Easing, type Transition } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

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
 * - `animar`: o original dispara por IntersectionObserver. No carrossel do
 *   hero quem decide é a troca de slide, e a primeira tela precisa nascer
 *   visível sem esperar JavaScript (ver padrão "auditar herói no viewport").
 * - Quem pede menos movimento recebe o texto parado.
 * - LazyMotion + `m` no lugar de `motion`: carrega só o pacote de animação
 *   de DOM, bem menor que o motion completo.
 */
export type LinhaBlurText = { texto: string; className?: string };

type BlurTextProps = {
  linhas: LinhaBlurText[];
  as?: ElementType;
  className?: string;
  animar?: boolean;
  /** Atraso antes da primeira palavra, em segundos. */
  inicio?: number;
  /** Intervalo entre palavras, em milissegundos. */
  delay?: number;
  direction?: "top" | "bottom";
  easing?: Easing | Easing[];
  stepDuration?: number;
};

export function BlurText({
  linhas,
  as: Tag = "p",
  className = "",
  animar = true,
  inicio = 0,
  delay = 70,
  direction = "bottom",
  easing = [0.16, 1, 0.3, 1],
  stepDuration = 0.35,
}: BlurTextProps) {
  const reduzir = useReducedMotion();
  const rotulo = linhas.map((l) => l.texto).join(" ");

  if (!animar || reduzir) {
    return (
      <Tag className={className}>
        {linhas.map((linha, i) => (
          <span key={i} className={cn("block", linha.className)}>
            {linha.texto}
          </span>
        ))}
      </Tag>
    );
  }

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
    <LazyMotion features={domAnimation} strict>
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
