# Site do Mandato — Vereador Givago Ribeiro

Site institucional do mandato do vereador **Givago Ribeiro** (Santa Maria/RS).

**Produção:** https://givagoribeiro.com.br

---

## Rodando o projeto

```bash
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Serve a build |
| `npm run typecheck` | Verifica os tipos |

## Stack

- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS v4** — tokens em `src/app/globals.css`
- **Radix UI** — Select, Checkbox, Label
- **lucide-react** — ícones
- **Netlify** — hospedagem

Sem banco de dados e sem variáveis de ambiente: tudo que vem de fora usa API pública.

## Estrutura

```
src/
  app/
    page.tsx                 landing page
    noticias/                listagem e detalhe (WordPress)
    pilares/[slug]/          as 4 páginas de pilar
    privacidade/ termos/     páginas legais
    sitemap.ts
  components/
    header.tsx  footer.tsx  newsletter.tsx
    secoes/                  as 8 seções da home
    ui/                      componentes base
  lib/
    conteudo.ts              todo o texto fixo do site
    wordpress.ts             blog do mandato
    youtube.ts               vídeos do canal
    enviar-formulario.ts     envio via Netlify Forms
public/
  __forms.html               declaração dos formulários para a Netlify
_referencia/                 build antigo, só para consulta
```

**Para mudar texto, mexa em `src/lib/conteudo.ts`** — não é preciso tocar em componente.

## Conteúdo dinâmico

| Origem | O que traz | Chave? |
|---|---|---|
| WordPress (`givagoribeirobr.wordpress.com`) | Notícias | não, API pública |
| YouTube (feed RSS do canal) | Vídeos | não, feed público |

Ambos revalidam a cada hora. Se qualquer um cair, a seção correspondente
some e o resto da página continua de pé.

Notícias novas são publicadas **no WordPress**, não neste repositório.

## Formulários

Contato e newsletter usam **Netlify Forms** — sem backend, sem banco, sem chave.

O formulário é renderizado por React e o detector da Netlify só lê HTML estático
no build, por isso existe `public/__forms.html` declarando os campos. O envio vai
por POST para `/__forms.html`, que a Netlify intercepta no edge.

Já configurado na Netlify: detecção de formulários ligada e notificação por e-mail
para `givagoribeirobr@gmail.com` nos dois formulários. Verificado por envio real.

## Design tokens

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#1e6626` | Verde — cor principal |
| `secondary` | `#185d79` | Azul petróleo |
| `accent` | `#fac547` | Amarelo — destaques |
| `footer` | `#003c6e` | Azul escuro — rodapé |
| `terracotta` | `#9a6051` | Apoio |
| `background` | `#fbf8f1` | Off-white — fundo |
| `foreground` | `#101810` | Quase-preto — texto |
| `destructive` | `#d40c1a` | Erros |

**Tipografia:** Montserrat (títulos) · Inter (corpo)

---

## Histórico: por que este repositório existe

O site original foi construído pelo **Agent Runner da Netlify** — a IA embutida no
painel — e nunca teve repositório git. O código ficava guardado como zip pela
própria Netlify (`deploy_source: agent_runner`, `code_origin: zip`), fora de
qualquer controle de versão.

Em 2026-08-30 o site estava com **dois endpoints quebrados em produção**:

```
/api/contato    → 500  {"error":"Erro interno do servidor"}
/api/newsletter → 500  {"error":"Erro ao buscar inscrições"}
```

O formulário "Fale com o Mandato" não funcionava: as rotas gravavam num banco de
dados que não existia mais, e o projeto não tinha nenhuma variável de ambiente
configurada. Nada havia sido retido como backup — 0 envios armazenados.

O código foi então **reconstruído do zero** a partir do site em produção: textos,
paleta, tipografia, imagens, componentes e estrutura. As duas rotas quebradas foram
substituídas por Netlify Forms, e a dependência de chave de API do YouTube trocada
pelo feed RSS público.

O conteúdo foi conferido página a página contra o site no ar. As únicas diferenças
de texto são correções de pontuação (o original tem espaço antes de vírgula em
três trechos).

### Melhorias em relação ao original

- Formulário de contato funcionando, entregando no e-mail do gabinete
- Sem banco de dados, sem chave de API — nada a expirar
- `ScrollReveal` que não deixa seção invisível em acesso por link direto
- Skip-link, rótulos ARIA e respeito a `prefers-reduced-motion`
- `sitemap.xml` gerado a partir das notícias do WordPress
- Redirects 301 dos endereços antigos das páginas legais
- Cabeçalhos de segurança no `netlify.toml`

Documentação do conserto do formulário: [docs/corrigir-formulario.md](docs/corrigir-formulario.md)
