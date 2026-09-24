import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { MANDATO } from "@/lib/conteudo";

/**
 * Perguntas frequentes sobre o gabinete.
 *
 * Só usa o que o site já afirma em outros lugares (endereço, horário, formulário,
 * acompanhamento de projeto): nenhuma promessa nova de prazo ou de atendimento.
 * `<details>` nativo abre e fecha sem JavaScript e já vem acessível por teclado.
 */

const { endereco, atendimento } = MANDATO;

const PERGUNTAS: { pergunta: string; resposta: string }[] = [
  {
    pergunta: "Como levo um problema do meu bairro ao gabinete?",
    resposta:
      "Pelo formulário logo abaixo, escolhendo o assunto \"Demanda do Bairro\". Se puder, diga a rua e o bairro: ajuda a equipe a encaminhar. Também dá para ligar, mandar e-mail ou ir ao gabinete.",
  },
  {
    pergunta: "O vereador faz a obra que eu estou pedindo?",
    resposta:
      "Obra é executada pela Prefeitura. O papel do vereador é levar a demanda até ela, com pedido de providência, propor leis e fiscalizar. É assim que as entregas do mandato mostradas no site aconteceram.",
  },
  {
    pergunta: "Qual o horário de atendimento?",
    resposta: `${atendimento[0]}, das ${atendimento[1].replace(" às ", " às ")}. ${atendimento[2]}.`,
  },
  {
    pergunta: "Onde fica o gabinete?",
    resposta: `${MANDATO.gabinete} da ${endereco.local}: ${endereco.rua}, ${endereco.bairro}, ${endereco.cep}. Telefone ${MANDATO.telefone}.`,
  },
  {
    pergunta: "Como acompanho um projeto de lei do vereador?",
    resposta:
      "Na lista de projetos em tramitação, use \"Avise-me quando avançar\" e deixe seu e-mail: avisamos quando o projeto se mover. A tramitação oficial, com todos os documentos, fica no portal da Câmara Municipal.",
  },
  {
    pergunta: "Como recebo as novidades do mandato?",
    resposta:
      "Pela newsletter, no rodapé do site, e pelas redes sociais do Givago no Instagram, Facebook e YouTube.",
  },
];

const DADOS_ESTRUTURADOS = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PERGUNTAS.map(({ pergunta, resposta }) => ({
    "@type": "Question",
    name: pergunta,
    acceptedAnswer: { "@type": "Answer", text: resposta },
  })),
};

export function FaqSection() {
  return (
    <section id="duvidas" className="py-16 md:py-24" aria-labelledby="faq-titulo">
      <div className="container-custom max-w-3xl px-4 md:px-8">
        <ScrollReveal className="mb-10 text-center">
          <RotuloSecao centralizado className="mb-4">
            Dúvidas frequentes
          </RotuloSecao>
          <h2
            id="faq-titulo"
            className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl"
          >
            Não sabe por onde começar? As respostas estão aqui
          </h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
            {PERGUNTAS.map(({ pergunta, resposta }) => (
              <details key={pergunta} className="group px-5 md:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-bold leading-snug marker:content-none [&::-webkit-details-marker]:hidden">
                  {pergunta}
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 leading-relaxed text-muted-foreground">{resposta}</p>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(DADOS_ESTRUTURADOS).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
