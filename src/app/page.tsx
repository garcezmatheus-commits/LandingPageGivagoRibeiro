import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BotaoContatoFlutuante } from "@/components/botao-contato-flutuante";
import { HeroSection } from "@/components/secoes/hero";
import { CredenciaisSection } from "@/components/secoes/credenciais";
import { ApresentacaoSection } from "@/components/secoes/apresentacao";
import { PanoramaLegislativoSection } from "@/components/secoes/panorama-legislativo";
import { FraseSection } from "@/components/secoes/frase";
import { PilaresSection } from "@/components/secoes/pilares";
import { NoticiasSection } from "@/components/secoes/noticias";
import { YoutubeSection } from "@/components/secoes/youtube";
import { ContatoSection } from "@/components/secoes/contato";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <HeroSection />
        <CredenciaisSection />
        <ApresentacaoSection />
        <PanoramaLegislativoSection />
        <FraseSection />
        <PilaresSection />
        <NoticiasSection />
        <YoutubeSection />
        <ContatoSection />
      </main>
      <Footer />
      <BotaoContatoFlutuante />
    </>
  );
}
