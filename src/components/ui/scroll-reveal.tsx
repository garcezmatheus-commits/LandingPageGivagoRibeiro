"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

/**
 * Revela o conteúdo ao entrar na viewport.
 *
 * Começa visível e só esconde depois que o observer é montado no cliente —
 * assim quem chega com JS desligado, ou por link direto para uma âncora,
 * nunca fica olhando para uma seção em branco.
 */
export function ScrollReveal({ delay = 0, className, children, ...props }: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") return;

    const jaVisivel = el.getBoundingClientRect().top < window.innerHeight;
    if (jaVisivel) return;

    setVisivel(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
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
