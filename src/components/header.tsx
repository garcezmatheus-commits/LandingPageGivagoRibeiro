"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TamanhoDeTexto } from "@/components/tamanho-de-texto";
import { MANDATO, NAVEGACAO } from "@/lib/conteudo";
import { cn } from "@/lib/utils";

export function Header() {
  const [aberto, setAberto] = React.useState(false);
  const [rolou, setRolou] = React.useState(false);

  React.useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 20);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        rolou || aberto ? "bg-background/95 shadow-soft backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom px-4 md:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-heading text-xl font-bold transition-colors",
                rolou || aberto ? "text-foreground" : "text-white"
              )}
            >
              {MANDATO.nome}
            </span>
            <span
              className={cn(
                "text-xs transition-colors",
                rolou || aberto ? "text-muted-foreground" : "text-white/80"
              )}
            >
              {MANDATO.cargo}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            {NAVEGACAO.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  rolou ? "text-muted-foreground hover:text-primary" : "text-white/90 hover:text-white"
                )}
              >
                {item.rotulo}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <TamanhoDeTexto
              className={cn("hidden md:flex", rolou || aberto ? "" : "text-white/80")}
            />

            <Button asChild className="hidden sm:inline-flex">
              <Link href="/#contato">Quer ajuda? Fala com a gente</Link>
            </Button>

            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-expanded={aberto}
              className={cn(
                "rounded-lg p-2 lg:hidden",
                rolou || aberto ? "text-foreground" : "text-white"
              )}
            >
              {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {aberto && (
        <nav className="border-t border-border bg-background lg:hidden" aria-label="Navegação principal">
          <ul className="container-custom flex flex-col px-4 py-2">
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between border-t border-border py-3">
              <span className="text-sm font-medium text-muted-foreground">Tamanho do texto</span>
              <TamanhoDeTexto />
            </li>
            <li className="py-3">
              <Button asChild className="w-full">
                <Link href="/#contato" onClick={() => setAberto(false)}>
                  Fala com a gente
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
