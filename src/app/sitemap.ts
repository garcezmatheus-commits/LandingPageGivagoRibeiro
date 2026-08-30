import type { MetadataRoute } from "next";
import { PILARES } from "@/lib/conteudo";
import { buscarNoticias } from "@/lib/wordpress";

const BASE = "https://givagoribeiro.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixas: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/noticias`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/termos`, changeFrequency: "yearly", priority: 0.3 },
    ...PILARES.map((pilar) => ({
      url: `${BASE}/pilares/${pilar.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  try {
    const noticias = await buscarNoticias(50);
    return [
      ...fixas,
      ...noticias.map((noticia) => ({
        url: `${BASE}/noticias/${noticia.slug}`,
        lastModified: new Date(noticia.data),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch {
    return fixas;
  }
}
