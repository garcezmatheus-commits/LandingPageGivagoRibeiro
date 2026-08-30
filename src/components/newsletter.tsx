"use client";

import * as React from "react";
import { Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { inscreverNewsletter, ErroDeEnvio } from "@/lib/enviar-formulario";

type Estado = "parado" | "enviando" | "ok" | "erro";

export function Newsletter() {
  const [email, setEmail] = React.useState("");
  const [estado, setEstado] = React.useState<Estado>("parado");
  const [erro, setErro] = React.useState("");

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setEstado("enviando");
    setErro("");

    try {
      await inscreverNewsletter(email);
      setEstado("ok");
      setEmail("");
    } catch (e) {
      setEstado("erro");
      setErro(e instanceof ErroDeEnvio ? e.message : "Não foi possível concluir a inscrição.");
    }
  }

  if (estado === "ok") {
    return (
      <p role="status" aria-live="polite" className="flex items-center gap-2 text-sm text-footer-foreground/80">
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        Inscrição confirmada. Obrigado!
      </p>
    );
  }

  return (
    <form onSubmit={enviar} className="space-y-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Seu e-mail
      </label>
      <Input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        autoComplete="email"
        inputMode="email"
        spellCheck={false}
        className="border-white/20 bg-white/10 text-footer-foreground placeholder:text-footer-foreground/50"
      />
      <Button
        type="submit"
        disabled={estado === "enviando"}
        className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
      >
        {estado === "enviando" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Inscrevendo…
          </>
        ) : (
          "Inscreva-se"
        )}
      </Button>
      {erro && (
        <p role="alert" aria-live="polite" className="text-xs text-red-300">
          {erro}
        </p>
      )}
    </form>
  );
}
