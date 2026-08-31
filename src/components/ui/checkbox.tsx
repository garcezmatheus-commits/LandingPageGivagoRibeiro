import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Caixa de seleção nativa.
 *
 * Trocou o Checkbox do Radix pelo controle do próprio navegador: `accent-color`
 * pinta a marcação com o verde do mandato sem nenhum JavaScript, e o alvo de
 * toque continua adequado.
 */
const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded border-input",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      style={{ accentColor: "var(--color-primary)" }}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
