import { cn } from "@/lib/utils";

/**
 * Rótulo que abre cada seção.
 *
 * Substitui o Badge cinza por um marcador em amarelo do mandato — a cor mais
 * enérgica da paleta estava sendo usada em um botão só. Aqui ela vira sistema
 * e dá identidade sem pesar.
 */
export function RotuloSecao({
  children,
  centralizado = false,
  claro = false,
  className,
}: {
  children: React.ReactNode;
  centralizado?: boolean;
  /** Sobre fundo escuro. */
  claro?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-sm font-medium uppercase tracking-widest",
        centralizado && "justify-center",
        claro ? "text-white/80" : "text-muted-foreground",
        className
      )}
    >
      <span className="h-px w-8 bg-accent" aria-hidden="true" />
      {children}
      {centralizado && <span className="h-px w-8 bg-accent" aria-hidden="true" />}
    </p>
  );
}
