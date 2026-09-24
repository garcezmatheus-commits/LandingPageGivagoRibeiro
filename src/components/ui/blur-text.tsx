"use client";

import { useEffect, useState, type ComponentType, type ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Porta de entrada do BlurText (React Bits, ver blur-text-animado.tsx).
 *
 * O texto parado sai daqui, sem nenhuma dependência: é o que vai no HTML do
 * servidor e o que aparece na primeira tela. A versão animada, com o Motion,
 * é baixada no navegador depois da hidratação, então o JavaScript inicial da
 * home não carrega biblioteca de animação nenhuma. Se ela ainda não chegou
 * quando a troca acontece, o texto aparece parado: nunca fica invisível
 * esperando script.
 */
export type LinhaBlurText = { texto: string; className?: string };

export type BlurTextProps = {
  linhas: LinhaBlurText[];
  as?: ElementType;
  className?: string;
  animar?: boolean;
  /** Atraso antes da primeira palavra, em segundos. */
  inicio?: number;
};

export function TituloEstatico({ linhas, as: Tag = "p", className }: Omit<BlurTextProps, "animar" | "inicio">) {
  return (
    <Tag className={className}>
      {linhas.map((linha, i) => (
        // Cada linha é um bloco, para o text-balance equilibrar uma de cada vez.
        <span key={i} className={cn("block", linha.className)}>
          {linha.texto}
        </span>
      ))}
    </Tag>
  );
}

type Animado = ComponentType<Omit<BlurTextProps, "animar">>;
let animado: Animado | null = null;

/** Baixa a versão animada antes de ela ser necessária (o hero chama ao montar). */
export function precarregarBlurText() {
  return import("./blur-text-animado").then((mod) => {
    // O motor de animação também, senão a primeira troca espera o download
    // com as palavras ainda invisíveis.
    mod.carregarRecursos();
    animado = mod.default;
    return mod.default;
  });
}

export function BlurText({ animar = false, ...props }: BlurTextProps) {
  const [Comp, setComp] = useState<Animado | null>(() => animado);

  useEffect(() => {
    if (!animar || Comp) return;
    let ativo = true;
    precarregarBlurText().then((c) => ativo && setComp(() => c));
    return () => {
      ativo = false;
    };
  }, [animar, Comp]);

  if (!animar || !Comp) return <TituloEstatico {...props} />;
  return <Comp {...props} />;
}
