import type { Metadata } from "next";
import { PaginaLegal, type SecaoLegal } from "@/components/pagina-legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Gabinete do Vereador Givago Ribeiro coleta, usa e protege os dados pessoais dos cidadãos.",
};

const SECOES: SecaoLegal[] = [
  {
    titulo: "Introdução",
    paragrafos: [
      "Este site é mantido pelo Gabinete do Vereador Givago Ribeiro e tem como objetivo informar os cidadãos sobre as atividades legislativas e projetos do mandato. Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.",
    ],
  },
  {
    titulo: "Dados Coletados",
    paragrafos: ["Coletamos apenas os dados necessários para responder às suas solicitações:"],
    itens: [
      "Nome e e-mail (ao preencher o formulário de contato)",
      "Telefone (opcional, para retorno de contato)",
      "Bairro (opcional, para encaminhar demandas da sua região)",
      "Mensagem ou solicitação enviada",
    ],
  },
  {
    titulo: "Uso dos Dados",
    paragrafos: ["Os dados coletados são utilizados exclusivamente para:"],
    itens: [
      "Responder às solicitações dos cidadãos",
      "Enviar informativos sobre o mandato (mediante autorização)",
      "Melhorar a comunicação com os eleitores",
    ],
  },
  {
    titulo: "Proteção dos Dados",
    paragrafos: [
      "Comprometemo-nos a proteger seus dados pessoais contra acesso não autorizado, alteração ou destruição. Seus dados não são vendidos ou compartilhados com terceiros para fins comerciais.",
      "Pedimos que não sejam incluídos no campo de mensagem dados pessoais sensíveis — como informações de saúde, convicção religiosa ou opinião política —, já que a finalidade do formulário é apenas o atendimento da demanda apresentada.",
    ],
  },
  {
    titulo: "Seus Direitos",
    paragrafos: [
      "De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:",
    ],
    itens: [
      "Acessar seus dados pessoais",
      "Solicitar correção de dados incompletos ou incorretos",
      "Solicitar a exclusão de seus dados",
      "Revogar o consentimento a qualquer momento",
    ],
  },
];

export default function Privacidade() {
  return (
    <PaginaLegal
      titulo="Política de Privacidade"
      atualizacao="março de 2025"
      secoes={SECOES}
      textoContato="Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato pelo e-mail"
    />
  );
}
