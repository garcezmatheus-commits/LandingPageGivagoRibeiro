import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/secoes/hero";
import { DestaquesSection } from "@/components/secoes/destaques";
import { ApresentacaoSection } from "@/components/secoes/apresentacao";
import { PanoramaLegislativoSection } from "@/components/secoes/panorama-legislativo";
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
        <DestaquesSection />
        <ApresentacaoSection />
        <PanoramaLegislativoSection />
        <PilaresSection />
        <NoticiasSection />
        <YoutubeSection />
        <ContatoSection />
      </main>
      <Footer />
    </>
  );
}
