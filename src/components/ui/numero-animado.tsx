"use client";

import * as React from "react";

/**
 * Número que conta até o valor final quando entra na tela.
 *
 * Não é enfeite: os números são o argumento mais forte do mandato — cinco
 * mundiais, décimo do mundo, oito projetos. A contagem prende o olho neles
 * por um segundo a mais do que um número parado prenderia.
 *
 * Aceita os formatos usados no site ("5", "10º", "20+", "2023") preservando
 * prefixo e sufixo. Quem pediu menos movimento vê o valor final direto.
 */
export function NumeroAnimado({ valor, className }: { valor: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [exibido, setExibido] = React.useState(valor);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const digitos = valor.match(/\d+/);
    if (!digitos) return;

    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (menosMovimento || typeof IntersectionObserver === "undefined") return;

    const alvo = Number(digitos[0]);
    const prefixo = valor.slice(0, digitos.index);
    const sufixo = valor.slice((digitos.index ?? 0) + digitos[0].length);

    // Anos não contam de 0: "2023" subindo do zero fica absurdo.
    const inicio = alvo > 1900 ? alvo - 12 : 0;

    // Se o número já está na tela quando monta, não faz sentido zerá-lo: a
    // pessoa veria o valor certo virar 0 e voltar. Fica como está.
    const jaAlcancado = () => el.getBoundingClientRect().top < window.innerHeight;
    if (jaAlcancado()) return;

    setExibido(`${prefixo}${inicio}${sufixo}`);

    let quadro = 0;

    const animar = () => {
      const duracao = 900;
      const comeco = performance.now();

      const passo = (agora: number) => {
        const t = Math.min((agora - comeco) / duracao, 1);
        // desacelera no fim, como um contador mecânico parando
        const suave = 1 - Math.pow(1 - t, 3);
        const atual = Math.round(inicio + (alvo - inicio) * suave);
        setExibido(`${prefixo}${atual}${sufixo}`);
        if (t < 1) quadro = requestAnimationFrame(passo);
      };

      quadro = requestAnimationFrame(passo);
    };

    const observer = new IntersectionObserver(
      (entradas) => {
        // Num scroll rápido os eventos se agrupam e o "entrou na tela" se
        // perde. Sem a checagem de posição, o número ficaria em zero para
        // sempre — mesmo problema que o ScrollReveal já teve.
        if (!entradas.some((e) => e.isIntersecting) && !jaAlcancado()) return;
        observer.disconnect();
        animar();

      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  return (
    <span ref={ref} className={className}>
      {exibido}
    </span>
  );
}
