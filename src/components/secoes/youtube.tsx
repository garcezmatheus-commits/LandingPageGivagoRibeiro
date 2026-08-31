import Image from "next/image";
import { Play, Youtube } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { RotuloSecao } from "@/components/ui/rotulo-secao";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buscarVideos, CANAL_URL } from "@/lib/youtube";

export async function YoutubeSection() {
  const videos = await buscarVideos(6);

  if (!videos.length) return null;

  return (
    <section id="youtube" className="py-16 md:py-24" aria-labelledby="youtube-titulo">
      <div className="container-custom px-4 md:px-8">
        <ScrollReveal className="mb-12 text-center">
          <RotuloSecao centralizado={true} className="mb-4">YouTube</RotuloSecao>
          <h2 id="youtube-titulo" className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Acompanhe-nos pelo YouTube
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Assista aos vídeos do mandato, acompanhe as ações em Santa Maria e fique por dentro de
            tudo que estamos fazendo pela cidade.
          </p>
          <Button asChild className="mt-5 bg-[#ff0000] text-white hover:bg-[#cc0000]">
            <a href={CANAL_URL} target="_blank" rel="noopener noreferrer">
              <Youtube className="h-4 w-4" aria-hidden="true" />
              Inscreva-se no Canal
            </a>
          </Button>
        </ScrollReveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <li key={video.id}>
              <ScrollReveal delay={i * 80}>
                <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    aria-label={`Assistir no YouTube: ${video.titulo}`}
                  >
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={video.thumbnail}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-lg transition-transform group-hover:scale-110">
                          <Play className="ml-1 h-6 w-6 text-primary-foreground" aria-hidden="true" />
                        </span>
                      </span>
                    </div>
                    <CardContent className="pt-5">
                      <h3 className="line-clamp-3 text-sm font-semibold leading-snug transition-colors group-hover:text-primary">
                        {video.titulo}
                      </h3>
                    </CardContent>
                  </a>
                </Card>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
