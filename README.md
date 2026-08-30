# Landing Page — Vereador Givago Ribeiro

Site institucional do mandato do vereador **Givago Ribeiro** (Santa Maria/RS).

> ⚠️ **Este repositório contém apenas o BUILD do site, não o código-fonte.**
> É um snapshot de referência para reconstruir o projeto. Ver [Situação atual](#situação-atual).

**Produção:** https://givagoribeiro.com.br

---

## Situação atual

O código-fonte original se perdeu. O que existe aqui é a saída de build de um projeto
Next.js (pasta `_next/static` + assets públicos), recuperada da hospedagem.

| Recuperado | Perdido |
|---|---|
| Paleta de cores e design tokens completos | Componentes React (`app/`, `components/`) |
| Fontes (Montserrat + Inter, 12 arquivos woff2) | Lógica das 4 rotas de API |
| Todas as imagens em resolução original | `package.json` e dependências |
| Todos os textos fixos do site | Painel administrativo |
| Todas as classes Tailwind (design 100% legível) | Chaves e variáveis de ambiente |
| Configuração de deploy (`netlify.toml`) | Histórico de commits |

As classes Tailwind sobreviveram à minificação, então **o layout é reconstruível com
alta fidelidade** — não é um chute visual.

---

## Stack identificada

- **Next.js** (App Router, Turbopack)
- **Tailwind CSS v4** — tokens via `@theme`
- **Radix UI** — Dialog, Select, e outros primitivos
- **bun** como gerenciador/runtime de build
- **Netlify** — deploy (`bun run build` → publish `.next`)
- **WordPress headless** como CMS — `givagoribeirobr.wordpress.com`
- **YouTube Data API** — feed de vídeos do mandato

## Design tokens

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#1e6626` | Verde — cor principal do mandato |
| `secondary` | `#185d79` | Azul petróleo |
| `accent` | `#fac547` | Amarelo — destaques e CTAs |
| `footer` | `#003c6e` | Azul escuro — rodapé |
| `terracotta` | `#9a6051` | Apoio |
| `background` | `#fbf8f1` | Off-white — fundo |
| `foreground` | `#101810` | Quase-preto — texto |
| `card` | `#fdfcf8` | Fundo de cards |
| `muted` | `#e1e6e0` | Neutro |
| `muted-foreground` | `#4f584f` | Texto secundário |
| `border` / `input` | `#cad0ca` / `#e1e6e0` | Bordas e campos |
| `destructive` | `#d40c1a` | Erros |

**Tipografia:** `Montserrat` (headings, `--font-heading`) · `Inter` (corpo, `--font-sans`)

## Rotas

| Rota | Tipo |
|---|---|
| `/` | Landing page |
| `/noticias` | Listagem de notícias (WordPress) com busca |
| `/api/posts` | Busca posts do WordPress |
| `/api/youtube` | Feed de vídeos do canal |
| `/api/contato` | Formulário "Fale com o Mandato" |
| `/api/newsletter` | Cadastro de e-mails |

> As 4 rotas de API precisam ser reescritas do zero — a pasta `.next/server` não foi preservada.

## Seções da landing page

1. **Hero** — "Gestão com Raiz, Disciplina e Resultado", com indicador de scroll animado
2. **Trajetória** — "De Atleta a Gestor Público" (canoagem, 5 mundiais, 10º no ranking mundial em 2009, Bacharel em Educação Física pela FAMES)
3. **Pilares / Frentes de Ação** — 4 eixos:
   - Esporte como Ferramenta de Educação
   - Desenvolvimento Sustentável e Inovação
   - Cultura e Economia Criativa
   - Bairros / cuidado no dia a dia
4. **Destaques do Mandato** — projetos de lei, concluídos e em tramitação
5. **Vídeos** — embeds do YouTube
6. **Blog do Mandato** — últimas notícias do WordPress
7. **Contato** — formulário com consentimento LGPD
8. **Rodapé** — redes sociais, horário de atendimento (08h–12h e 13h30–17h30)

## Assets

`images/` — 7 arquivos:
`hero-bg.jpg` · `givago-atleta.jpg` · `givago-origens.webp` ·
`pilar-esporte.jpg` · `pilar-sustentabilidade.jpg` · `pilar-cultura.jpg` · `pilar-bairros.jpg`

> ⚠️ Otimizar antes de reusar: `pilar-esporte.jpg` tem **4.5 MB** e `givago-origens.webp` **2.8 MB**.

## Redes

- Instagram — [@givagoribeirobr](https://www.instagram.com/givagoribeirobr)
- Facebook — [givagokayak](https://www.facebook.com/givagokayak)
- YouTube — canal do mandato
- Blog — givagoribeirobr.wordpress.com

---

## Próximo passo

Reconstruir o projeto Next.js a partir desta referência, em `src/`, mantendo
`_next/` apenas como material de consulta até a paridade visual ser atingida.
