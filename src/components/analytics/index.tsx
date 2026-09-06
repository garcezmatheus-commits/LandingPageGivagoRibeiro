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

      <BannerDeConsentimento aoDecidir={setDecisao} />
    </>
  );
}
