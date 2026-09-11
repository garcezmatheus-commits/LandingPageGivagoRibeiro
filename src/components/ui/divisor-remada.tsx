"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Traço que se desenha uma vez ao entrar em tela — separa "no esporte" de
 * "no mandato" em Credenciais, ligando as duas metades da mesma trajetória.
 *
 * Mesmo mecanismo do ScrollReveal (observer + checagem de posição no mount,
 * pra não travar invisível em scroll rápido), mas anima escala em vez de
 * opacidade/translação.
 */
export function DivisorRemada({ className }: { className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [desenhado, setDesenhado] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const jaAlcancado = () => el.getBoundingClientRect().top < window.innerHeight;

    if (jaAlcancado()) return;
    setDesenhado(false);

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting) || jaAlcancado()) {
          setDesenhado(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(
        "absolute left-0 top-0 h-px w-full origin-left bg-border transition-transform duration-700 ease-out motion-reduce:transition-none md:h-full md:w-px md:origin-top",
        desenhado ? "scale-x-100 md:scale-y-100" : "scale-x-0 md:scale-y-0",
        className
      )}
    />
  );
}
