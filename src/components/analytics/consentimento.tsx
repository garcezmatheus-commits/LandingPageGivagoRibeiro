"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Banner de consentimento de cookies.
 *
 * O Google Analytics usa cookie, e a LGPD exige consentimento antes de medir.
 * Num site de mandato publico isso nao e opcional.
 *
 * A medicao so comeca depois do "aceitar": enquanto nao houver decisao, nada
 * e carregado. Recusar tambem e uma escolha valida e fica guardada, para o
 * banner nao voltar a cada visita.
 */

const CHAVE = "givago:consentimento-analytics";

export type Consentimento = "aceito" | "recusado" | null;

/** Le a decisao ja tomada. Fora do navegador, ou sem acesso, devolve null. */
export function lerConsentimento(): Consentimento {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function BannerDeConsentimento({
  aoDecidir,
}: {
  aoDecidir: (decisao: Consentimento) => void;
}) {
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    // Só aparece para quem ainda não decidiu.
    if (lerConsentimento() === null) setVisivel(true);
  }, []);

  function decidir(decisao: Exclude<Consentimento, null>) {
    try {
      localStorage.setItem(CHAVE, decisao);
    } catch {
      // Sem armazenamento a escolha vale para esta visita.
    }
    setVisivel(false);
    aoDecidir(decisao);
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso sobre cookies"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card p-4 shadow-soft md:p-5"
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="container-custom flex flex-col gap-4 px-0 md:flex-row md:items-center md:justify-between md:px-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para entender como as pessoas navegam pelo site e melhorar o
          conteúdo do mandato. Você pode recusar sem perder nada.{" "}
          <Link href="/privacidade" className="text-primary underline-offset-4 hover:underline">
            Política de Privacidade
          </Link>
        </p>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" onClick={() => decidir("recusado")}>
            Recusar
          </Button>
          <Button onClick={() => decidir("aceito")}>Aceitar</Button>
        </div>
      </div>
    </div>
  );
}
