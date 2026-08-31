"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Controle de tamanho de texto.
 *
 * Parte do público do mandato é idosa, e aumentar a fonte no navegador não é
 * óbvio para todo mundo. Escala a raiz em vez de mexer em cada componente, e
 * guarda a escolha no navegador da pessoa.
 *
 * Sem `localStorage` disponível (janela anônima, cookies bloqueados) o
 * controle continua funcionando — só não lembra na próxima visita.
 */

const ESCALAS = [
  { rotulo: "A", titulo: "Texto padrão", valor: 100 },
  { rotulo: "A", titulo: "Texto maior", valor: 112 },
  { rotulo: "A", titulo: "Texto muito maior", valor: 125 },
] as const;

const CHAVE = "givago:tamanho-texto";

export function TamanhoDeTexto({ className }: { className?: string }) {
  const [escala, setEscala] = React.useState(100);

  React.useEffect(() => {
    try {
      const salvo = Number(localStorage.getItem(CHAVE));
      if (ESCALAS.some((e) => e.valor === salvo)) aplicar(salvo, false);
    } catch {
      // Sem acesso ao armazenamento: segue no tamanho padrão.
    }
  }, []);

  function aplicar(valor: number, guardar = true) {
    setEscala(valor);
    document.documentElement.style.fontSize = valor === 100 ? "" : `${valor}%`;

    if (!guardar) return;
    try {
      if (valor === 100) localStorage.removeItem(CHAVE);
      else localStorage.setItem(CHAVE, String(valor));
    } catch {
      // Preferência não persiste, mas a página já mudou.
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label="Tamanho do texto">
      {ESCALAS.map((opcao, i) => (
        <button
          key={opcao.valor}
          type="button"
          onClick={() => aplicar(opcao.valor)}
          aria-pressed={escala === opcao.valor}
          title={opcao.titulo}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg font-heading font-bold leading-none transition-colors",
            i === 0 && "text-xs",
            i === 1 && "text-sm",
            i === 2 && "text-base",
            escala === opcao.valor
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {opcao.rotulo}
          <span className="sr-only">{opcao.titulo}</span>
        </button>
      ))}
    </div>
  );
}
