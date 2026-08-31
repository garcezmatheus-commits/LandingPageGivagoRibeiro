import { MANDATO } from "@/lib/conteudo";

/**
 * Faixa com a declaração do mandato.
 *
 * A página inteira fala *sobre* o Givago; em nenhum ponto ela fala *como* ele.
 * Site de mandato vive de voz, e esta faixa é onde ela entra — sem card, sem
 * foto, só a frase em tipografia grande, quebrando o ritmo de seções.
 *
 * O texto abaixo é a linha de compromisso já publicada no site. Para virar
 * uma citação de verdade, substitua por uma frase dita pelo Givago e ative a
 * assinatura — não se inventa fala de ninguém.
 */

const DECLARACAO =
  "Mandato comprometido com transparência, participação social e resultados mensuráveis.";

export function FraseSection() {
  return (
    <section className="bg-primary py-20 md:py-28" aria-labelledby="frase-titulo">
      <div className="container-custom px-4 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="mx-auto mb-6 block h-1 w-16 rounded-full bg-accent"
            aria-hidden="true"
          />

          <p
            id="frase-titulo"
            className="text-balance font-heading text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-4xl lg:text-5xl"
          >
            {DECLARACAO}
          </p>

          <p className="mt-8 text-sm uppercase tracking-widest text-primary-foreground/70">
            {MANDATO.nome} · {MANDATO.cargo}
          </p>
        </div>
      </div>
    </section>
  );
}
