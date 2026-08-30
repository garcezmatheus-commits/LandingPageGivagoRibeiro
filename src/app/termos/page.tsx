import type { Metadata } from "next";
import { PaginaLegal, type SecaoLegal } from "@/components/pagina-legal";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do site do mandato do Vereador Givago Ribeiro.",
};

const SECOES: SecaoLegal[] = [
  {
    titulo: "Aceitação dos Termos",
    paragrafos: [
      "Ao acessar e utilizar este site, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, por favor, não utilize o site.",
    ],
  },
  {
    titulo: "Finalidade do Site",
    paragrafos: [
      "Este site tem como objetivo divulgar informações sobre as atividades legislativas, projetos e ações do mandato do Vereador Givago Ribeiro, além de facilitar a comunicação entre o mandato e os cidadãos de Santa Maria.",
    ],
  },
  {
    titulo: "Uso Aceitável",
    paragrafos: ["Ao utilizar este site, você concorda em:"],
    itens: [
      "Fornecer informações verdadeiras ao entrar em contato",
      "Não utilizar o site para fins ilegais ou não autorizados",
      "Não tentar acessar áreas restritas do site",
      "Não transmitir conteúdo ofensivo, difamatório ou ameaçador",
    ],
  },
  {
    titulo: "Conteúdo do Site",
    paragrafos: [
      "Todo o conteúdo publicado neste site, incluindo textos, imagens, vídeos e informações sobre projetos legislativos, tem caráter informativo. As informações são atualizadas regularmente, mas podem não refletir alterações recentes.",
    ],
  },
  {
    titulo: "Propriedade Intelectual",
    paragrafos: [
      "O conteúdo deste site é protegido por direitos autorais. A reprodução, distribuição ou modificação do conteúdo sem autorização prévia é proibida, exceto para fins informativos com citação da fonte.",
    ],
  },
  {
    titulo: "Links Externos",
    paragrafos: [
      "Este site pode conter links para sites externos. Não nos responsabilizamos pelo conteúdo ou práticas de privacidade de sites terceiros.",
    ],
  },
  {
    titulo: "Limitação de Responsabilidade",
    paragrafos: [
      "O Gabinete do Vereador Givago Ribeiro não se responsabiliza por danos diretos ou indiretos decorrentes do uso deste site ou de informações nele contidas.",
    ],
  },
  {
    titulo: "Alterações nos Termos",
    paragrafos: [
      "Reservamo-nos o direito de alterar estes Termos de Uso a qualquer momento. As alterações entram em vigor imediatamente após sua publicação no site.",
    ],
  },
];

export default function Termos() {
  return (
    <PaginaLegal
      titulo="Termos de Uso"
      atualizacao="março de 2025"
      secoes={SECOES}
      textoContato="Para dúvidas sobre estes Termos de Uso, entre em contato pelo e-mail"
    />
  );
}
