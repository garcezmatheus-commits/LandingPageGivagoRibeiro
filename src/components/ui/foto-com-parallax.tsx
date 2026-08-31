"use client";

import * as React from "react";
import Image from "next/image";

/**
 * Foto de fundo que desliza mais devagar que a rolagem.
 *
 * Dá profundidade ao hero: a cidade "fica" enquanto o conteúdo sobe. O
 * deslocamento é pequeno de propósito — a diretriz é de 5% a 15%, acima disso
 * o fundo descola do primeiro plano e incomoda.
 *
 * Só a camada decorativa se move; texto e botões nunca. E quem pediu menos
 * movimento recebe a foto parada.
 */
export function FotoComParallax({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pendente = false;
    let ocioso: ReturnType<typeof setTimeout>;

    const mover = () => {
      const topo = el.parentElement?.getBoundingClientRect().top ?? 0;
      // no máximo ~12% de deslocamento, dentro da faixa recomendada
      const deslocamento = Math.max(Math.min(-topo * 0.12, 90), -90);
      el.style.transform = `translate3d(0, ${deslocamento}px, 0)`;
      pendente = false;
    };

    const aoRolar = () => {
      el.style.willChange = "transform";
      clearTimeout(ocioso);
      // libera a GPU quando a rolagem para
      ocioso = setTimeout(() => {
        el.style.willChange = "auto";
      }, 200);

      if (pendente) return;
      pendente = true;
      requestAnimationFrame(mover);
    };

    mover();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      clearTimeout(ocioso);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 -bottom-24">
      <Image src={src} alt="" fill priority sizes="100vw" className={className} />
    </div>
  );
}
