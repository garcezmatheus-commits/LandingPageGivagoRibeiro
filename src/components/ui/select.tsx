import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Seleção nativa do sistema.
 *
 * Substituiu o Select do Radix, que trazia 89 kB de JavaScript junto com o
 * Checkbox para um formulário no fim da página. O controle nativo custa zero
 * JavaScript, abre o seletor próprio do celular — melhor em tela pequena — e
 * já vem com teclado e leitor de tela funcionando.
 *
 * A seta é desenhada em background porque `appearance: none` remove a nativa.
 */
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full appearance-none rounded-lg border border-input bg-card px-3 py-2 pr-9 text-sm",
        "bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "invalid:text-muted-foreground",
        className
      )}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234f584f' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export { Select };
