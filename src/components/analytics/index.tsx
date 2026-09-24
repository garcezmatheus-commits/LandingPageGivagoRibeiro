"use client";

import * as React from "react";
import Script from "next/script";
import {
  BannerDeConsentimento,
  lerConsentimento,
  type Consentimento,
} from "@/components/analytics/consentimento";

/**
 * Google Analytics 4, ligado só depois do consentimento.
 *
 * O script não é carregado enquanto a pessoa não aceitar — não é o modo
 * "carrega e depois desliga", é não carregar mesmo. Quem recusa não baixa
 * nada do Google.
 *
 * O ID vem de NEXT_PUBLIC_GA_ID. Sem ele, o componente não faz nada e nem o
 * banner aparece: sem medição, não há o que consentir.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const [decisao, setDecisao] = React.useState<Consentimento>(null);

  React.useEffect(() => {
    setDecisao(lerConsentimento());
  }, []);

  // Quem aceitou e depois recusou: o script já baixado continua na memória da
  // página, então é preciso mandá-lo parar (bandeira oficial do Google) e
  // apagar os cookies que ele deixou.
  const aoDecidir = React.useCallback(
    (nova: Consentimento) => {
      if (id) {
        (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = nova !== "aceito";
        if (nova === "recusado") apagarCookiesDoAnalytics();
      }
      setDecisao(nova);
    },
    [id]
  );

  if (!id) return null;

  return (
    <>
      {decisao === "aceito" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
            strategy="afterInteractive"
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${id}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=Lax;Secure'
              });
            `}
          </Script>
        </>
      )}

      <BannerDeConsentimento aoDecidir={aoDecidir} />
    </>
  );
}

function apagarCookiesDoAnalytics() {
  const dominio = location.hostname.replace(/^www\./, "");
  for (const par of document.cookie.split(";")) {
    const nome = par.split("=")[0].trim();
    if (!nome.startsWith("_ga")) continue;
    for (const escopo of ["", `; domain=${dominio}`, `; domain=.${dominio}`]) {
      document.cookie = `${nome}=; Max-Age=0; path=/${escopo}`;
    }
  }
}
