# Conserto do formulário "Fale com o Mandato"

**Problema:** `/api/contato` e `/api/newsletter` respondem HTTP 500 em produção.
Quem preenche o formulário recebe erro e a mensagem se perde.

**Destino desejado das mensagens:** `givagoribeirobr@gmail.com` (e-mail do gabinete)

---

## Diagnóstico

O site chama uma rota de API própria, que grava num banco de dados. Esse banco não
responde mais — e o projeto tem **zero variáveis de ambiente** configuradas na Netlify,
o que explica a falha: as credenciais sumiram junto com o código-fonte original.

Verificado em 2026-08-30:

```
/api/contato    → {"error":"Erro interno do servidor"}
/api/newsletter → {"error":"Erro ao buscar inscrições"}
```

Netlify Forms não está ativo e há **0 envios armazenados** — nada foi retido como backup.

## Solução recomendada: Netlify Forms

Trocar a rota de API por **Netlify Forms**, recurso nativo da plataforma onde o site
já está hospedado.

| Vantagem | Detalhe |
|---|---|
| Sem backend | Elimina a rota de API que está quebrada |
| Sem banco de dados | Remove a causa raiz da falha |
| Sem chave de API | Nada para expirar ou vazar de novo |
| E-mail automático | Notificação direta para o gabinete |
| Backup no painel | Envios ficam salvos e exportáveis em CSV |

**Limite do plano gratuito:** 100 envios/mês. Para um site de mandato é folgado; se
estourar, o plano pago sobe para 1.000.

Isso segue a linha de "simplicidade sobre arquitetura" já adotada em outros projetos:
menos peça móvel, menos coisa para quebrar.

## Campos atuais do formulário

`nome` · `email` · `telefone` · `bairro` · `assunto` · `mensagem` · `lgpd` (checkbox)

Opções de `assunto`: Demanda do Bairro · Sugestão · Convite · Imprensa · Outro

---

## Prompt para o Agent Runner da Netlify

O código-fonte só é editável pelo agente de IA no painel da Netlify. Copie e cole:

```
O formulário de contato está quebrado — /api/contato retorna HTTP 500 porque o banco
de dados que ele usava não existe mais. Quero substituir por Netlify Forms.

1. No ContatoSection, converta o formulário para Netlify Forms:
   - adicione os atributos: name="contato" data-netlify="true"
     netlify-honeypot="bot-field"
   - inclua o campo oculto <input type="hidden" name="form-name" value="contato" />
   - inclua o honeypot oculto: <p hidden><input name="bot-field" /></p>
   - mantenha os campos existentes com os mesmos names: nome, email, telefone,
     bairro, assunto, mensagem, lgpd
   - mantenha o texto de consentimento LGPD e o checkbox como obrigatório

2. Como o formulário é renderizado por React, adicione também um formulário estático
   equivalente em public/__forms.html para que a Netlify detecte os campos no build.

3. Troque o envio: em vez de fetch para /api/contato, faça POST para "/" com
   Content-Type application/x-www-form-urlencoded e o corpo serializado via
   URLSearchParams, incluindo form-name=contato.

4. Mantenha os estados de carregando / sucesso / erro que já existem na interface.

5. Apague a rota /api/contato, que deixa de ser usada.

6. Faça o mesmo para o newsletter, com um segundo formulário name="newsletter"
   contendo apenas o campo email, e apague /api/newsletter.

Não invente banco de dados nem serviço de e-mail externo — o armazenamento e a
notificação são responsabilidade da própria Netlify.
```

## Depois que o agente publicar

No painel da Netlify, em **Forms → Form notifications**, adicionar:

- Tipo: *Email notification*
- Formulário: `contato` (repetir para `newsletter`)
- Enviar para: `givagoribeirobr@gmail.com`

Sem esse passo os envios ficam salvos no painel mas **não chegam no e-mail**.

## Como testar

```bash
curl -sS -o /dev/null -w "%{http_code}\n" \
  -d "form-name=contato&nome=Teste&email=teste@exemplo.com&assunto=Outro&mensagem=teste" \
  https://givagoribeiro.com.br/
```

Resposta 200 e o envio aparecendo em **Forms** no painel = funcionando.
Confirmar também que o e-mail chegou na caixa do gabinete.

---

## Alternativa, se Netlify Forms não servir

Se o volume passar de 100/mês ou for preciso integrar com o [[mandato360-crm]],
a rota de API volta a fazer sentido — mas aí com **Resend** para o envio
(domínio givagoribeiro.com.br já é do mandato, dá para verificar) e a chave guardada
em variável de ambiente na Netlify, não no código.

## Nota de LGPD

O campo `mensagem` é texto livre — o cidadão pode escrever ali questão de saúde,
posição política ou religiosa, que são **dados sensíveis** na Lei 13.709/2018.

Duas consequências:

1. O texto de consentimento deve deixar claro a finalidade (atendimento da demanda) e
   por quanto tempo o dado fica guardado.
2. Os envios ficam armazenados no painel da Netlify por tempo indeterminado — vale
   definir uma rotina de limpeza e não deixar acumular indefinidamente.

Mesmo raciocínio da decisão tomada no CRM do gabinete: coletar o mínimo necessário.
