# Conserto do formulário "Fale com o Mandato"

**Problema:** `/api/contato` e `/api/newsletter` respondem HTTP 500 em produção.
Quem preenche o formulário recebe erro e a mensagem se perde.

**Destino das mensagens:** `givagoribeirobr@gmail.com` (e-mail do gabinete)

**Quem executa:** eu (Claude), localmente. **Sem usar o Agent Runner da Netlify** —
rodar o agente consome créditos; editar aqui e publicar pela CLI não consome nada.

---

## Diagnóstico

O site chama uma rota de API própria que grava num banco de dados. Esse banco não
responde mais, e o projeto tem **zero variáveis de ambiente** configuradas na Netlify —
as credenciais se perderam junto com o código-fonte original.

Verificado em 2026-08-30:

```
/api/posts      → 200 OK
/api/youtube    → 200 OK
/api/contato    → 500  {"error":"Erro interno do servidor"}
/api/newsletter → 500  {"error":"Erro ao buscar inscrições"}
```

Netlify Forms não está ativo e há **0 envios armazenados** — nada foi retido como
backup, então as mensagens enviadas durante a falha se perderam.

## Solução: Netlify Forms

Trocar a rota de API por **Netlify Forms**, recurso nativo da plataforma onde o site
já está hospedado.

| Vantagem | Detalhe |
|---|---|
| Sem backend | Elimina a rota que está quebrada |
| Sem banco de dados | Remove a causa raiz da falha |
| Sem chave de API | Nada para expirar ou vazar de novo |
| E-mail automático | Notificação direta para o gabinete |
| Backup no painel | Envios salvos e exportáveis em CSV |

**Limite gratuito:** 100 envios/mês — folgado para um site de mandato.

Segue a linha de "simplicidade sobre arquitetura" já adotada nos outros projetos:
menos peça móvel, menos coisa para quebrar.

## Campos do formulário

`nome` · `email` · `telefone` · `bairro` · `assunto` · `mensagem` · `lgpd`

Opções de `assunto`: Demanda do Bairro · Sugestão · Convite · Imprensa · Outro

---

## Implementação

Código pronto em [`referencia/`](referencia/):

| Arquivo | Vai para | Função |
|---|---|---|
| [`__forms.html`](referencia/__forms.html) | `public/__forms.html` | Declara os campos para a Netlify detectar no build |
| [`enviar-formulario.ts`](referencia/enviar-formulario.ts) | `src/lib/` | Substitui as chamadas às rotas quebradas |

Alterações no `ContatoSection`:

1. Trocar o `fetch("/api/contato")` por `enviarContato(dados)`
2. Manter os estados de carregando / sucesso / erro que já existem
3. Manter o checkbox de consentimento LGPD como obrigatório
4. Apagar as rotas `/api/contato` e `/api/newsletter`

O formulário é renderizado por React, e o parser da Netlify só lê HTML estático no
build — por isso o `public/__forms.html`. O POST vai para `/__forms.html`, que a
Netlify intercepta no edge.

## Passo manual obrigatório

Depois de publicar, no painel da Netlify em **Forms → Form notifications**:

- Tipo: *Email notification*
- Formulário: `contato` (repetir para `newsletter`)
- Enviar para: `givagoribeirobr@gmail.com`

**Sem esse passo os envios ficam salvos no painel mas não chegam no e-mail.**
É configuração de conta, não de código — não dá para fazer por commit.

## Como testar

```bash
curl -sS -o /dev/null -w "%{http_code}\n" \
  -d "form-name=contato&nome=Teste&email=teste@exemplo.com&assunto=Outro&mensagem=teste" \
  https://givagoribeiro.com.br/
```

Resposta 200 e o envio aparecendo em **Forms** no painel = funcionando.
Confirmar também que o e-mail chegou na caixa do gabinete.

## Publicação

Preview primeiro, produção só com aprovação:

```bash
netlify deploy --dir=.next --site=dc863ec5-880b-4f31-81f3-a6dd63f3b909
```

Gera um link de preview. Só depois do ok é que vai `--prod`.

---

## Nota de LGPD

O campo `mensagem` é texto livre — o cidadão pode escrever ali questão de saúde,
posição política ou religiosa, que são **dados sensíveis** na Lei 13.709/2018.

1. O texto de consentimento deve deixar clara a finalidade (atendimento da demanda)
   e por quanto tempo o dado fica guardado.
2. Os envios ficam armazenados no painel da Netlify por tempo indeterminado — vale
   definir rotina de limpeza em vez de deixar acumular.

Mesmo raciocínio da decisão tomada no CRM do gabinete: coletar o mínimo necessário.
