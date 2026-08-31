"use client";

import * as React from "react";

/**
 * Barra de progresso de leitura, no topo.
 *
 * A home tem mais de 10.000px. Sem referência, o visitante não sabe se está
 * no meio ou perto do fim — e quem não sabe, desiste. A barra é orientação,
 * não decoração.
 *
 * Atualiza dentro de requestAnimationFrame para não disputar a thread com o
 * scroll.
 */
export function BarraDeProgresso() {
  const [progresso, setProgresso] = React.useState(0);

  React.useEffect(() => {
    let pendente = false;

    const medir = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgresso(total > 0 ? Math.min(window.scrollY / total, 1) : 0);
      pendente = false;
    };

    const aoRolar = () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent"
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuenow={Math.round(progresso * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full origin-left bg-accent"
        style={{ transform: `scaleX(${progresso})` }}
      />
    </div>
  );
}
