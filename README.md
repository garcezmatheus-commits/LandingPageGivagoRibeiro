# Landing Page — Vereador Givago Ribeiro

Site institucional do mandato do vereador **Givago Ribeiro** (Santa Maria/RS).

> ⚠️ **Este repositório contém apenas o BUILD do site, não o código-fonte.**
> O fonte **existe** e está guardado na Netlify. Ver [Onde está o código-fonte](#onde-está-o-código-fonte).

**Produção:** https://givagoribeiro.com.br

---

## Onde está o código-fonte

O site foi construído pelo **Agent Runner da Netlify** (a IA embutida no painel dela),
não por um fluxo de git tradicional. Por isso nunca houve repositório: o código é
guardado pela própria Netlify como um zip.

Confirmado pela API da Netlify no deploy de produção:

| Campo | Valor | Significado |
|---|---|---|
| `deploy_source` | `agent_runner` | Construído pela IA da Netlify |
| `has_source_zip` | `true` | O fonte está arquivado |
| `code_origin` | `zip` | Guardado como zip, não em git |
| `needs_git_sync` | `false` | Ainda não sincronizado com git |
| `build_settings.repo_url` | vazio | Nenhum repositório conectado |

**O código não se perdeu.** Ele está no painel da Netlify, no projeto
`stellular-palmier-3d6f3e`, e pode ser sincronizado com o GitHub pela própria interface.

### Como recuperar

1. Entrar em [app.netlify.com](https://app.netlify.com) com `givagoribeirobr@gmail.com`
2. Abrir o projeto `stellular-palmier-3d6f3e` (givagoribeiro.com.br)
3. Ir na seção de agentes/IA e localizar o projeto
4. Usar a opção de conectar ao GitHub — apontar para este repositório

## O que este repositório tem hoje

Snapshot do build de produção, como referência caso o passo acima não funcione.

| Recuperado do bundle | Ausente |
|---|---|
| Paleta e design tokens completos | Componentes React |
| Fontes (Montserrat + Inter, 12 woff2) | Lógica das 4 rotas de API |
| Imagens em resolução original | `package.json` |
| Todos os textos fixos | Variáveis de ambiente |
| Todas as classes Tailwind | Histórico de commits |
| **Nomes dos componentes** | |

As classes Tailwind e os nomes dos componentes sobreviveram à minificação, então uma
reconstrução manual teria alta fidelidade — mas só faz sentido se a Netlify falhar.

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

| Rota | Tipo | Estado em produção |
|---|---|---|
| `/` | Landing page | ✅ |
| `/noticias` | Listagem do WordPress | ✅ |
| `/api/posts` | Proxy do WordPress | ✅ HTTP 200 |
| `/api/youtube` | Feed do canal | ✅ HTTP 200 |
| `/api/contato` | Formulário de contato | 🔴 **HTTP 500** |
| `/api/newsletter` | Cadastro de e-mails | 🔴 **HTTP 500** |

### 🔴 Quebrado em produção

Verificado em 2026-08-30:

- `/api/contato` → `{"error":"Erro interno do servidor"}`
- `/api/newsletter` → `{"error":"Erro ao buscar inscrições"}`

**O formulário "Fale com o Mandato" não está funcionando.** Quem preenche recebe erro.

Netlify Forms não está ativo e há **0 envios armazenados** — nada foi retido como backup,
então as mensagens enviadas nesse período se perderam.

👉 **Plano de conserto:** [docs/corrigir-formulario.md](docs/corrigir-formulario.md)
A mensagem do newsletter indica um banco de dados por trás que não responde — e o
projeto não tem nenhuma variável de ambiente configurada na Netlify, o que é
provavelmente a causa.

## Conteúdo (WordPress)

API pública, sem autenticação: `public-api.wordpress.com/wp/v2/sites/givagoribeirobr.wordpress.com`

- **27 posts** publicados
- Último: *"Revitalização dos mirantes do Perau"* — **22/06/2026**

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
