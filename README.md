# William Whang — Portfolio Infleet

Portfólio protegido com autenticação OTP por e-mail.
Stack: Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Vercel

---

## Configuração das variáveis de ambiente

Preenche o arquivo `.env.local` na raiz do projeto com as variáveis abaixo.

### 1. `RESEND_API_KEY` — Envio de e-mail

1. Cria conta em [resend.com](https://resend.com)
2. Vai em **API Keys** → **Create API Key**
3. Copia a chave gerada

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 2. `RESEND_FROM_EMAIL` — Remetente

- **Com domínio próprio:** adiciona o domínio em Resend → **Domains**, verifica os registros DNS, e usa `noreply@seudominio.com`
- **Sem domínio (teste):** usa `onboarding@resend.dev` — só funciona enviando para o teu próprio e-mail

```
RESEND_FROM_EMAIL=noreply@seudominio.com
```

---

### 3. `KV_REST_API_URL` e `KV_REST_API_TOKEN` — Vercel KV

1. No painel da Vercel, vai no teu projeto → **Storage** → **Create Database** → escolhe **KV**
2. Conecta ao projeto
3. Em **Settings > Environment Variables**, copia `KV_REST_API_URL` e `KV_REST_API_TOKEN`
4. Para desenvolvimento local, copia os valores para o `.env.local`

```
KV_REST_API_URL=https://xxxxxxxxxxxxxxxx.kv.vercel-storage.com
KV_REST_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

### 4. Google Sheets — Log de acessos

O log salva: **Nome · E-mail · Domínio · Data/Hora** na aba `Acessos` da planilha.

#### Passo a passo:

**a) Criar a planilha**
1. Cria uma planilha no Google Sheets
2. Nomeia a primeira aba como `Acessos`
3. Adiciona cabeçalhos na linha 1: `Nome`, `E-mail`, `Domínio`, `Data/Hora`
4. Copia o ID da URL: `docs.google.com/spreadsheets/d/**ID_AQUI**/edit`

**b) Criar a Service Account**
1. Vai para [Google Cloud Console](https://console.cloud.google.com)
2. Cria um projeto (ou usa um existente)
3. Ativa a **Google Sheets API**: APIs & Services → Enable APIs → busca "Google Sheets API"
4. Vai em **IAM & Admin** → **Service Accounts** → **Create Service Account**
5. Dá um nome (ex: `portfolio-sheets`) e clica em **Create**
6. Na lista, clica na service account criada → **Keys** → **Add Key** → **Create new key** → **JSON**
7. Faz o download do arquivo JSON

**c) Compartilhar a planilha**
1. Abre o JSON baixado e copia o campo `client_email`
2. Na planilha, clica em **Compartilhar** e adiciona esse e-mail com permissão de **Editor**

**d) Preencher as variáveis**

```
GOOGLE_SHEETS_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms

GOOGLE_SHEETS_CLIENT_EMAIL=portfolio-sheets@meu-projeto.iam.gserviceaccount.com

# Cole a chave privada do JSON, substituindo quebras de linha por \n
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"
```

> **Dica:** o campo `private_key` no JSON já vem com `\n`. Cola o valor inteiro (entre aspas).

---

### 5. `JWT_SECRET` — Segurança da sessão

Gera uma string aleatória longa:

```bash
openssl rand -base64 32
```

```
JWT_SECRET=xK3mP9...
```

---

## Rodar localmente

```bash
npm run dev
```

Acessa em [http://localhost:3000](http://localhost:3000).
O middleware redireciona para `/login` se não houver sessão válida.

---

## Deploy (Vercel)

1. Conecta o repositório na Vercel
2. Adiciona todas as variáveis em **Settings > Environment Variables**
3. Para o KV, usa a integração nativa do Vercel (não precisas adicionar manualmente)
4. Deploy automático a cada push na `main`

---

## Imagens

Coloca as imagens em `public/images/`:

| Arquivo | Seção |
|---|---|
| `mapa-problema.png` | Imagem do Problema |
| `prototipo-real.png` | Protótipo Real |

Resolução recomendada: **1360×800px** (retina 2x), PNG ou WebP.

---

## Estrutura

```
app/
  layout.tsx          — fontes Inter + Lora, metadata
  globals.css         — design tokens (Tailwind v4 @theme)
  page.tsx            — portfolio página única
  login/page.tsx      — autenticação OTP (2 passos)
  api/auth/
    send-otp/         — gera OTP, salva no KV (TTL 15min), envia via Resend
    verify-otp/       — valida OTP, seta cookie httpOnly com JWT (7 dias)
    log/              — salva acesso no Google Sheets
components/
  sections/           — Hero, ProblemImage, Problem, Discovery, Tradeoff,
                        Solution, Prototype, AuditWireframe, Results
  ui/                 — AnimatedCounter, AnimatedWords, Stepper, AuditFilter
middleware.ts         — protege todas as rotas exceto /login e /api/auth/*
```
