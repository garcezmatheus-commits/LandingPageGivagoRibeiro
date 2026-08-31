"use client";

import * as React from "react";
import { Bell, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { acompanharProjeto, ErroDeEnvio } from "@/lib/enviar-formulario";
import type { ProjetoDeLei } from "@/lib/conteudo";

type Estado = "fechado" | "aberto" | "enviando" | "ok" | "erro";

/**
 * Deixa o cidadão pedir aviso quando um projeto se mover na Câmara.
 *
 * Fica recolhido até o clique: um campo de e-mail por projeto poluiria a
 * lista inteira. O envio usa o mesmo Netlify Forms do resto do site, então
 * não há backend novo para manter.
 */
export function AcompanharProjeto({ projeto }: { projeto: ProjetoDeLei }) {
  const [estado, setEstado] = React.useState<Estado>("fechado");
  const [email, setEmail] = React.useState("");
  const [erro, setErro] = React.useState("");

  const idCampo = `acompanhar-${projeto.numero.replace(/\W+/g, "-").toLowerCase()}`;

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEstado("enviando");
    setErro("");

    try {
      await acompanharProjeto(email, `${projeto.titulo} (${projeto.numero})`);
      setEstado("ok");
      setEmail("");
    } catch (e) {
      setEstado("erro");
      setErro(e instanceof ErroDeEnvio ? e.message : "Não foi possível concluir. Tente novamente.");
    }
  }

  if (estado === "ok") {
    return (
      <p
        role="status"
        aria-live="polite"
        className="mt-3 flex items-center gap-2 text-sm text-primary"
      >
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        Pronto. Avisamos assim que este projeto se mover.
      </p>
    );
  }

  if (estado === "fechado") {
    return (
      <button
        type="button"
        onClick={() => setEstado("aberto")}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:underline"
      >
        <Bell className="h-3.5 w-3.5" aria-hidden="true" />
        Avise-me quando avançar
      </button>
    );
  }

  return (
    <form onSubmit={enviar} className="mt-3 rounded-lg bg-muted p-3">
      <Label htmlFor={idCampo} className="text-xs">
        Seu e-mail para acompanhar <span className="font-normal">{projeto.numero}</span>
      </Label>
      <div className="mt-1.5 flex flex-col gap-2 sm:flex-row">
        <Input
          id={idCampo}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 text-sm"
        />
        <div className="flex gap-2">
          <Button type="submit" size="sm" disabled={estado === "enviando"} className="h-9">
            {estado === "enviando" ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              "Acompanhar"
            )}
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-9"
            onClick={() => setEstado("fechado")}
          >
            Cancelar
          </Button>
        </div>
      </div>

      {erro && (
        <p role="alert" aria-live="polite" className="mt-2 text-xs text-destructive">
          {erro}
        </p>
      )}

      <p className="mt-2 text-xs text-muted-foreground">
        Usamos seu e-mail só para avisar sobre este projeto.
      </p>
    </form>
  );
}
