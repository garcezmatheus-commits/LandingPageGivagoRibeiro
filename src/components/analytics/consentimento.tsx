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
 * banner nao voltar a cada visita. E a escolha pode ser revista a qualquer
 * momento pelo botao "Preferencias de cookies" do rodape, como a politica de
 * privacidade promete.
 */

const CHAVE = "givago:consentimento-analytics";
const EVENTO_REABRIR = "givago:preferencias-cookies";

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

/** Reabre o aviso para a pessoa rever a escolha. */
export function abrirPreferenciasDeCookies() {
  window.dispatchEvent(new Event(EVENTO_REABRIR));
}

export function BannerDeConsentimento({
  aoDecidir,
}: {
  aoDecidir: (decisao: Consentimento) => void;
}) {
  const [visivel, setVisivel] = React.useState(false);
  const [atual, setAtual] = React.useState<Consentimento>(null);
  const caixaRef = React.useRef<HTMLDivElement>(null);
  const focarAoAbrir = React.useRef(false);

  React.useEffect(() => {
    const aoReabrir = () => {
      setAtual(lerConsentimento());
      focarAoAbrir.current = true;
      setVisivel(true);
    };
    window.addEventListener(EVENTO_REABRIR, aoReabrir);
    if (lerConsentimento() !== null) {
      return () => window.removeEventListener(EVENTO_REABRIR, aoReabrir);
    }

    // Primeira visita: o aviso espera a pessoa comecar a rolar (ou navegar
    // pelo teclado). Aparecendo na chegada, ele cobria o fim do hero no
    // celular, com os botoes e os controles do carrossel. Esperar nao tem
    // custo legal: nada e medido antes do "aceitar".
    const mostrar = () => {
      limpar();
      setVisivel(true);
    };
    const aoRolar = () => {
      if (window.scrollY > 80) mostrar();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Tab") mostrar();
    };
    function limpar() {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("keydown", aoTeclar);
    }

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("keydown", aoTeclar);
    return () => {
      limpar();
      window.removeEventListener(EVENTO_REABRIR, aoReabrir);
    };
  }, []);

  // Enquanto o aviso esta aberto, a rolagem por foco (Tab) para acima dele:
  // sem isso o elemento focado podia ficar escondido atras do aviso.
  React.useEffect(() => {
    const caixa = caixaRef.current;
    if (!visivel || !caixa) return;
    const raiz = document.documentElement;
    raiz.style.scrollPaddingBottom = `${caixa.offsetHeight}px`;
    if (focarAoAbrir.current) {
      focarAoAbrir.current = false;
      caixa.focus();
    }
    return () => {
      raiz.style.scrollPaddingBottom = "";
    };
  }, [visivel]);

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
      ref={caixaRef}
      role="dialog"
      aria-live="polite"
      aria-label="Aviso sobre cookies"
      tabIndex={-1}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-card p-3 shadow-soft outline-none sm:p-4 md:p-5"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="container-custom flex flex-col gap-3 px-0 md:flex-row md:items-center md:justify-between md:gap-4 md:px-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Usamos cookies para entender como as pessoas navegam pelo site e melhorar o
          conteúdo do mandato. Você pode recusar sem perder nada.{" "}
          <Link href="/privacidade" className="text-primary underline-offset-4 hover:underline">
            Política de Privacidade
          </Link>
          {atual && (
            <span className="mt-1 block font-medium text-foreground">
              Sua escolha atual: {atual === "aceito" ? "medição aceita" : "medição recusada"}.
            </span>
          )}
        </p>

        <div className="flex shrink-0 gap-2">
          <Button variant="outline" className="flex-1 md:flex-none" onClick={() => decidir("recusado")}>
            Recusar
          </Button>
          <Button className="flex-1 md:flex-none" onClick={() => decidir("aceito")}>
            Aceitar
          </Button>
        </div>
      </div>
    </div>
  );
}
