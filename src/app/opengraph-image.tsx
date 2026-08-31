import { ImageResponse } from "next/og";
import { MANDATO } from "@/lib/conteudo";

export const alt = `${MANDATO.nome} — ${MANDATO.cargo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem que aparece quando o link é compartilhado no WhatsApp, Instagram,
 * Facebook ou X. Gerada no build, com as cores e a tipografia do mandato.
 */
export default async function Imagem() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e6626 0%, #185d79 100%)",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              color: "rgba(251,248,241,0.75)",
              textTransform: "uppercase",
            }}
          >
            {MANDATO.cargo}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#fbf8f1",
              marginTop: 16,
              lineHeight: 1.05,
            }}
          >
            {MANDATO.nome}
          </div>

          <div
            style={{
              display: "flex",
              width: 120,
              height: 8,
              background: "#fac547",
              borderRadius: 4,
              marginTop: 28,
            }}
          />

          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              color: "#fbf8f1",
              marginTop: 28,
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            Gestão com Raiz, Disciplina e Resultado
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "rgba(251,248,241,0.8)",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>givagoribeiro.com.br</div>
          <div style={{ display: "flex" }}>Santa Maria · RS</div>
        </div>
      </div>
    ),
    size
  );
}
