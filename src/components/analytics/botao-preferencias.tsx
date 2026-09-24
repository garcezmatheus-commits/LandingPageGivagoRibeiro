"use client";

import { abrirPreferenciasDeCookies } from "@/components/analytics/consentimento";

/** Reabre o aviso de cookies. Sem medição configurada, não há o que rever. */
export function BotaoPreferenciasCookies({ className }: { className?: string }) {
  if (!process.env.NEXT_PUBLIC_GA_ID) return null;

  return (
    <button type="button" onClick={abrirPreferenciasDeCookies} className={className}>
      Preferências de cookies
    </button>
  );
}
