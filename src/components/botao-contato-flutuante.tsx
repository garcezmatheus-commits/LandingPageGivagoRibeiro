"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Atalho para o formulário, que fica no fim de uma página longa.
 *
 * Só aparece depois que o visitante passou do hero, e some quando ele já
 * chegou na seção de contato — não faz sentido oferecer atalho para onde a
 * pessoa já está.
 */
export function BotaoContatoFlutuante() {
  const [visivel, setVisivel] = React.useState(false);

  React.useEffect(() => {
    const contato = document.querySelector("#contato");

    const avaliar = () => {
      const passouDoHero = window.scrollY > window.innerHeight * 0.9;
      const noContato = contato
        ? contato.getBoundingClientRect().top < window.innerHeight * 0.8
        : false;
      setVisivel(passouDoHero && !noContato);
    };

    avaliar();
    window.addEventListener("scroll", avaliar, { passive: true });
    return () => window.removeEventListener("scroll", avaliar);
  }, []);

  return (
    <Link
      href="/#contato"
      aria-hidden={!visivel}
      tabIndex={visivel ? 0 : -1}
      className={cn(
        "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-5 py-3",
        "text-sm font-medium text-primary-foreground shadow-lg",
        "transition-[opacity,transform] duration-300 hover:bg-primary/90",
        "motion-reduce:transition-none",
        visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <MessageSquare className="h-4 w-4" aria-hidden="true" />
      Fale com o mandato
    </Link>
  );
}
