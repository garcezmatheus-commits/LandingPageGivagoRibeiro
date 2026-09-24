import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PassoTrilha {
  rotulo: string;
  /** Sem href: é a página atual. */
  href?: string;
}

const SITE = "https://givagoribeiro.com.br";

/**
 * Caminho de navegação ("Início > Pilares > ...") das páginas internas, com os
 * dados estruturados do Google (BreadcrumbList) para o resultado de busca
 * mostrar o caminho em vez do endereço cru.
 */
export function Trilha({ passos, claro = false }: { passos: PassoTrilha[]; claro?: boolean }) {
  const todos: PassoTrilha[] = [{ rotulo: "Início", href: "/" }, ...passos];

  const dados = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: todos.map((passo, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: passo.rotulo,
      ...(passo.href ? { item: `${SITE}${passo.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Você está em" className="mb-6">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm",
          claro ? "text-white/80" : "text-muted-foreground"
        )}
      >
        {todos.map((passo, i) => (
          <li key={passo.rotulo} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />}
            {passo.href ? (
              <Link
                href={passo.href}
                className={cn(
                  "underline-offset-4 transition-colors hover:underline",
                  claro ? "hover:text-white" : "hover:text-primary"
                )}
              >
                {passo.rotulo}
              </Link>
            ) : (
              <span aria-current="page" className={cn("line-clamp-1", claro ? "text-white" : "text-foreground")}>
                {passo.rotulo}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, "\\u003c") }} />
    </nav>
  );
}
