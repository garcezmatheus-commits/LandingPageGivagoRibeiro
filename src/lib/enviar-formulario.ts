/**
 * Envio de formulários via Netlify Forms.
 *
 * Substitui as chamadas para /api/contato e /api/newsletter, que respondem
 * HTTP 500 porque o banco de dados por trás delas não existe mais.
 *
 * A Netlify intercepta o POST para /__forms.html no edge, grava o envio e
 * dispara a notificação por e-mail. Não há backend, banco nem chave de API.
 *
 * Local sugerido: src/lib/enviar-formulario.ts
 */

export type Assunto =
  | "Demanda do Bairro"
  | "Sugestão"
  | "Convite"
  | "Imprensa"
  | "Outro";

export interface DadosContato {
  nome: string;
  email: string;
  telefone?: string;
  bairro?: string;
  assunto: Assunto;
  mensagem: string;
  lgpd: boolean;
}

/** Erro de envio com mensagem já pronta para exibir ao usuário. */
export class ErroDeEnvio extends Error {}

async function postar(formName: string, campos: Record<string, string>) {
  const corpo = new URLSearchParams({ "form-name": formName, ...campos });

  let resposta: Response;
  try {
    resposta = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: corpo.toString(),
    });
  } catch {
    throw new ErroDeEnvio("Não foi possível conectar. Verifique sua internet e tente novamente.");
  }

  if (!resposta.ok) {
    throw new ErroDeEnvio("Não conseguimos enviar sua mensagem. Tente novamente em instantes.");
  }
}

export async function enviarContato(dados: DadosContato) {
  if (!dados.lgpd) {
    throw new ErroDeEnvio("É preciso autorizar o tratamento dos dados para enviarmos sua mensagem.");
  }

  await postar("contato", {
    nome: dados.nome.trim(),
    email: dados.email.trim(),
    telefone: dados.telefone?.trim() ?? "",
    bairro: dados.bairro?.trim() ?? "",
    assunto: dados.assunto,
    mensagem: dados.mensagem.trim(),
    lgpd: "sim",
  });
}

export async function acompanharProjeto(email: string, projeto: string) {
  await postar("acompanhar-projeto", { email: email.trim(), projeto });
}

export async function inscreverNewsletter(email: string) {
  await postar("newsletter", { email: email.trim() });
}
