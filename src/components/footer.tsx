import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Newsletter } from "@/components/newsletter";
import { MANDATO, PILARES } from "@/lib/conteudo";

const REDES = [
  { nome: "Instagram", href: MANDATO.redes.instagram, Icone: Instagram },
  { nome: "Facebook", href: MANDATO.redes.facebook, Icone: Facebook },
  { nome: "YouTube", href: MANDATO.redes.youtube, Icone: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="container-custom px-4 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl font-bold">{MANDATO.nome}</p>
            <p className="mt-1 text-sm text-footer-foreground/70">{MANDATO.cargo}</p>
            <p className="mt-4 text-sm leading-relaxed text-footer-foreground/80">
              {MANDATO.descricao}
            </p>
            <ul className="mt-6 flex gap-3">
              {REDES.map(({ nome, href, Icone }) => (
                <li key={nome}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${nome} do Vereador ${MANDATO.nome}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                  >
                    <Icone className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Links rápidos">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-footer-foreground/70">
              Links Rápidos
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/#inicio" className="text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#apresentacao" className="text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground">
                  Apresentação
                </Link>
              </li>
              <li>
                <Link href="/#pilares" className="text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground">
                  Pilares
                </Link>
              </li>
              {PILARES.map((pilar) => (
                <li key={pilar.slug}>
                  <Link
                    href={`/pilares/${pilar.slug}`}
                    className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground"
                  >
                    Pilar {pilar.numero} - {pilar.tituloCurto}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/noticias" className="text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground">
                  Notícias
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="text-sm text-footer-foreground/80 transition-colors hover:text-footer-foreground">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-footer-foreground/70">
              Newsletter
            </p>
            <p className="mb-4 text-sm text-footer-foreground/80">
              Receba atualizações periódicas sobre as ações e projetos do mandato.
            </p>
            <Newsletter />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-footer-foreground/70">
              Contato
            </p>
            <ul className="space-y-3 text-sm text-footer-foreground/80">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {MANDATO.endereco.local}
                  <br />
                  {MANDATO.endereco.rua}
                  <br />
                  {MANDATO.endereco.bairro}
                  <br />
                  {MANDATO.endereco.cep}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`tel:+555532207220`} className="transition-colors hover:text-footer-foreground">
                  {MANDATO.telefone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href={`mailto:${MANDATO.email}`} className="break-all transition-colors hover:text-footer-foreground">
                  {MANDATO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-footer-foreground/70">
            {`© ${new Date().getFullYear()} ${MANDATO.nome}. Todos os direitos reservados. Desenvolvido por Matheus Garcez dos Santos.`}
          </p>
          <ul className="flex gap-4">
            <li>
              <Link href="/privacidade" className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground">
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/termos" className="text-sm text-footer-foreground/70 transition-colors hover:text-footer-foreground">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
