import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Home, Newspaper, Phone } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MANDATO } from "@/lib/conteudo";

export const metadata: Metadata = {
  title: "Mensagem enviada",
  robots: { index: false, follow: true },
};

/**
 * Página depois do envio do formulário de contato.
 *
 * Endereço próprio permite contar no Analytics quantas mensagens chegam (visitas
 * a /obrigado), o que a confirmação dentro do formulário não permitia. Fica fora
 * do sitemap e do Google: só faz sentido para quem acabou de enviar.
 */
export default function Obrigado() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section className="pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="container-custom max-w-2xl px-4 text-center md:px-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
            </div>

            <h1 className="text-balance font-heading text-4xl font-bold tracking-tight md:text-5xl">
              Mensagem enviada!
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Obrigado por falar com o gabinete. A equipe retornará em breve pelo e-mail que você
              informou.
            </p>

            <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Se for urgente, ligue para{" "}
                <a href="tel:+555532207220" className="font-medium text-primary underline-offset-4 hover:underline">
                  {MANDATO.telefone}
                </a>
                .
              </span>
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Voltar ao início
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/noticias">
                  <Newspaper className="h-4 w-4" aria-hidden="true" />
                  Ver as notícias do mandato
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
