"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

/**
 * Revela o conteúdo ao entrar na viewport.
 *
 * Duas salvaguardas contra o conteúdo ficar invisível para sempre:
 *
 * 1. Começa visível e só esconde depois que o observer é montado no cliente —
 *    quem chega com JS desligado, ou por link direto para uma âncora, vê tudo.
 * 2. O callback também revela quando o elemento já passou pela tela. Num scroll
 *    rápido (clique no menu, flick no celular) o navegador agrupa os eventos e
 *    o "entrou na tela" se perde; sem essa checagem a seção nunca aparecia.
 */
export function ScrollReveal({ delay = 0, className, children, ...props }: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const jaAlcancado = () => el.getBoundingClientRect().top < window.innerHeight;

    if (jaAlcancado()) return;
    setVisivel(false);

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting) || jaAlcancado()) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
        visivel ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
