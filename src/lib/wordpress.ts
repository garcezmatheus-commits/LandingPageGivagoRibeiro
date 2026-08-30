/**
 * Blog do mandato, hospedado no WordPress.com.
 *
 * A API é pública e não pede autenticação — não há chave a guardar nem a
 * expirar. Foi o que manteve as notícias no ar enquanto o resto do backend
 * do site quebrou.
 */

const SITE = "givagoribeirobr.wordpress.com";
const API = `https://public-api.wordpress.com/wp/v2/sites/${SITE}`;

export interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  data: string;
  imagem: string | null;
  imagemAlt: string;
  link: string;
}

interface PostBruto {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
  };
}

/** Remove tags e normaliza as entidades que o WordPress devolve no HTML. */
function limparHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&#039;|&apos;/g, "'")
    .replace(/&#8220;|&#8221;|&quot;/g, '"')
    .replace(/&#8211;|&#8212;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function converter(post: PostBruto): Noticia {
  const midia = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    id: post.id,
    slug: post.slug,
    titulo: limparHtml(post.title.rendered),
    resumo: limparHtml(post.excerpt.rendered),
    conteudo: post.content.rendered,
    data: post.date,
    imagem: post.jetpack_featured_media_url || midia?.source_url || null,
    imagemAlt: midia?.alt_text || limparHtml(post.title.rendered),
    link: post.link,
  };
}

/**
 * Busca as notícias publicadas.
 *
 * Revalida a cada hora: o blog do mandato publica poucas vezes por semana,
 * então não faz sentido bater na API do WordPress a cada visita.
 */
export async function buscarNoticias(quantidade = 12, busca?: string): Promise<Noticia[]> {
  const params = new URLSearchParams({
    per_page: String(quantidade),
    _embed: "wp:featuredmedia",
  });

  if (busca) params.set("search", busca);

  const resposta = await fetch(`${API}/posts?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) {
    throw new Error(`WordPress respondeu ${resposta.status}`);
  }

  const posts: PostBruto[] = await resposta.json();
  return posts.map(converter);
}

export async function buscarNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  const params = new URLSearchParams({ slug, _embed: "wp:featuredmedia" });

  const resposta = await fetch(`${API}/posts?${params}`, {
    next: { revalidate: 3600 },
  });

  if (!resposta.ok) return null;

  const posts: PostBruto[] = await resposta.json();
  return posts.length ? converter(posts[0]) : null;
}

export function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
