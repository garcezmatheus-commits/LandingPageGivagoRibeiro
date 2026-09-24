"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TamanhoDeTexto } from "@/components/tamanho-de-texto";
import { MANDATO, NAVEGACAO } from "@/lib/conteudo";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = React.useState(false);
  const [rolou, setRolou] = React.useState(false);
  // Só a home, a lista de notícias e os pilares abrem com foto ou faixa escura.
  // Nas outras páginas o topo é claro: cabeçalho transparente com letra branca sumia.
  const topoEscuro = pathname === "/" || pathname === "/noticias" || pathname.startsWith("/pilares/");
  const solido = rolou || aberto || !topoEscuro;
  const [secaoAtiva, setSecaoAtiva] = React.useState("");

  React.useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 20);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  // Marca no menu em qual seção o visitante está — a home passa de 10.000px,
  // sem isso não há como saber "onde estou" rolando, só "quanto falta"
  // (função da BarraDeProgresso). Só roda na home: é a única página com
  // essas âncoras.
  React.useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;

    const ids = NAVEGACAO.filter((item) => item.href.startsWith("/#")).map((item) =>
      item.href.slice(2)
    );
    const secoes = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (secoes.length === 0) return;

    const observer = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting);
        if (visivel) setSecaoAtiva(visivel.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    secoes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solido ? "bg-background/95 shadow-soft backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container-custom px-4 md:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex flex-col leading-tight">
            <span
              className={cn(
                "font-heading text-xl font-bold transition-colors",
                solido ? "text-foreground" : "text-white"
              )}
            >
              {MANDATO.nome}
            </span>
            <span
              className={cn(
                "text-xs transition-colors",
                solido ? "text-muted-foreground" : "text-white/80"
              )}
            >
              {MANDATO.cargo}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
            {NAVEGACAO.map((item) => {
              const ativo = item.href.startsWith("/#")
                ? pathname === "/" && item.href.slice(2) === secaoAtiva
                : pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={ativo ? "true" : undefined}
                  className={cn(
                    "relative pb-1 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 motion-reduce:after:transition-none",
                    solido ? "text-muted-foreground hover:text-primary" : "text-white/90 hover:text-white",
                    ativo && (solido ? "text-primary after:scale-x-100" : "text-white after:scale-x-100")
                  )}
                >
                  {item.rotulo}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <TamanhoDeTexto
              className="hidden md:flex"
              claro={!solido}
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
                solido ? "text-foreground" : "text-white"
              )}
            >
              {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {aberto && (
        <nav
          className="menu-mobile-abrir border-t border-border bg-background lg:hidden"
          aria-label="Navegação principal"
        >
          <ul className="container-custom flex flex-col px-4 py-2">
            {NAVEGACAO.map((item) => {
              const ativo = item.href.startsWith("/#")
                ? pathname === "/" && item.href.slice(2) === secaoAtiva
                : pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setAberto(false)}
                    aria-current={ativo ? "true" : undefined}
                    className={cn(
                      "block py-3 text-sm font-medium transition-colors hover:text-primary",
                      ativo ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.rotulo}
                  </Link>
                </li>
              );
            })}
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
