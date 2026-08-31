import { cn } from "@/lib/utils";

/**
 * Transição em onda entre seções.
 *
 * Não é ornamento: água é a biografia do mandato — canoagem, cinco mundiais,
 * o projeto social na barragem do Campestre. Por isso aparece só nas duas
 * viradas que importam (fim do hero e entrada do rodapé), e nunca animada:
 * site público ganha com credibilidade, não com efeito.
 *
 * A cor é a da seção para onde a onda corre, e o SVG é decorativo — fica
 * fora da árvore de acessibilidade.
 */
export function Onda({
  className,
  posicao = "baixo",
}: {
  /** Classe de cor do destino, ex.: "text-background" ou "text-footer". */
  className?: string;
  /** "baixo" fecha uma seção; "cima" abre a seguinte. */
  posicao?: "baixo" | "cima";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-20 leading-[0]",
        posicao === "baixo" ? "bottom-0" : "top-0 rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[60px] w-full md:h-[90px]"
        fill="currentColor"
        focusable="false"
      >
        {/* Três cristas em profundidades diferentes, como água em camadas. */}
        <path
          d="M0 64c120 24 240 36 360 30s240-30 360-36 240 6 360 24 240 24 360 12v30H0z"
          opacity="0.35"
        />
        <path
          d="M0 82c144 20 288 26 432 16s288-34 432-34 288 22 432 30v26H0z"
          opacity="0.6"
        />
        <path d="M0 100c180 14 360 18 540 10s360-24 540-20 240 12 360 16v14H0z" />
      </svg>
    </div>
  );
}
