/**
 * Vídeos do canal do mandato.
 *
 * Lê o feed RSS público do YouTube em vez da Data API: não precisa de chave,
 * e chave é justamente o tipo de coisa que se perdeu quando o código original
 * sumiu. O feed traz os 15 vídeos mais recentes.
 */

const CANAL_ID = "UCnUdnnMeujqx2uAgkiDCThg";
const CANAL_URL = "https://www.youtube.com/@givagoribeirobr";

export interface Video {
  id: string;
  titulo: string;
  descricao: string;
  url: string;
  thumbnail: string;
  publicadoEm: string;
}

function extrair(xml: string, tag: string, desde = 0): { valor: string; fim: number } | null {
  const abre = xml.indexOf(`<${tag}`, desde);
  if (abre === -1) return null;
  const inicio = xml.indexOf(">", abre) + 1;
  const fecha = xml.indexOf(`</${tag}>`, inicio);
  if (fecha === -1) return null;
  return { valor: xml.slice(inicio, fecha), fim: fecha };
}

function decodificar(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/**
 * Busca os vídeos do canal.
 *
 * Devolve lista vazia se o feed falhar — a seção de vídeos some, mas o resto
 * da página continua de pé.
 */
export async function buscarVideos(quantidade = 6): Promise<Video[]> {
  const feed = `https://www.youtube.com/feeds/videos.xml?channel_id=${CANAL_ID}`;

  let xml: string;
  try {
    const resposta = await fetch(feed, { next: { revalidate: 3600 } });
    if (!resposta.ok) return [];
    xml = await resposta.text();
  } catch {
    return [];
  }

  const videos: Video[] = [];
  let cursor = 0;

  while (videos.length < quantidade) {
    const entrada = xml.indexOf("<entry>", cursor);
    if (entrada === -1) break;
    const fimEntrada = xml.indexOf("</entry>", entrada);
    const bloco = xml.slice(entrada, fimEntrada);
    cursor = fimEntrada;

    const id = extrair(bloco, "yt:videoId")?.valor;
    const titulo = extrair(bloco, "title")?.valor;
    const publicado = extrair(bloco, "published")?.valor;
    const descricao = extrair(bloco, "media:description")?.valor ?? "";

    if (!id || !titulo) continue;

    videos.push({
      id,
      titulo: decodificar(titulo),
      descricao: decodificar(descricao).slice(0, 200),
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      publicadoEm: publicado ?? "",
    });
  }

  return videos;
}

export { CANAL_URL, CANAL_ID };
