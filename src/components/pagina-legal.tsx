import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MANDATO } from "@/lib/conteudo";

export interface SecaoLegal {
  titulo: string;
  paragrafos?: string[];
  itens?: string[];
}

/**
 * Molde das páginas de Política de Privacidade e Termos de Uso — as duas têm
 * a mesma estrutura, só muda o conteúdo.
 */
export function PaginaLegal({
  titulo,
  atualizacao,
  secoes,
  textoContato,
}: {
  titulo: string;
  atualizacao: string;
  secoes: SecaoLegal[];
  textoContato: string;
}) {
  return (
    <>
      <Header />
      <main id="conteudo">
        <article className="pb-16 pt-32 md:pt-40">
          <div className="container-custom max-w-3xl px-4 md:px-8">
            <h1 className="font-heading text-3xl font-bold md:text-4xl">{titulo}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Última atualização: {atualizacao}</p>

            <div className="mt-10 space-y-8">
              {secoes.map((secao, i) => (
                <section key={secao.titulo}>
                  <h2 className="mb-3 font-heading text-xl font-bold">
                    {`${i + 1}. ${secao.titulo}`}
                  </h2>

                  {secao.paragrafos?.map((p) => (
                    <p key={p} className="mb-3 leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}

                  {secao.itens && (
                    <ul className="mt-2 space-y-2">
                      {secao.itens.map((item) => (
                        <li key={item} className="flex gap-2 text-muted-foreground">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section>
                <h2 className="mb-3 font-heading text-xl font-bold">{secoes.length + 1}. Contato</h2>
                <p className="leading-relaxed text-muted-foreground">
                  {`${textoContato}:`}{" "}
                  <a
                    href={`mailto:${MANDATO.email}`}
                    className="break-all text-primary underline-offset-4 hover:underline"
                  >
                    {MANDATO.email}
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
