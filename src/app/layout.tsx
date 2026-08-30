import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { MANDATO } from "@/lib/conteudo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://givagoribeiro.com.br"),
  title: {
    default: `${MANDATO.nome} - ${MANDATO.slogan}`,
    template: `%s | ${MANDATO.nome}`,
  },
  description:
    "Givago é o gestor público que, com a disciplina de atleta e a visão de quem conhece a cidade em suas raízes, transforma o potencial natural e humano em desenvolvimento concreto e qualidade de vida dos santamarienses.",
  keywords: ["Givago Ribeiro", "vereador", "Santa Maria", "RS", "mandato", "Câmara Municipal"],
  authors: [{ name: MANDATO.nome }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://givagoribeiro.com.br",
    siteName: `${MANDATO.nome} - ${MANDATO.cargo}`,
    title: `${MANDATO.nome} - ${MANDATO.slogan}`,
    description: MANDATO.descricao,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

// A barra do navegador no celular acompanha o fundo do site.
export const viewport: Viewport = {
  themeColor: "#fbf8f1",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  );
}
