# 🚀 Guia de Deploy - AWS Amplify

## ⚠️ IMPORTANTE: Configuração Obrigatória

**A aplicação NÃO funcionará sem configurar as variáveis de ambiente no AWS Amplify.**

Você receberá erro 500/401 se as variáveis não estiverem configuradas.

## 🔑 Configurando Variáveis de Ambiente no AWS Amplify

### Método 1: Via Console Web (Recomendado)

#### Passo 1: Acesse o AWS Amplify Console

1. Acesse: https://console.aws.amazon.com/amplify/
2. Faça login na sua conta AWS
3. Selecione seu aplicativo na lista

#### Passo 2: Localize Environment Variables

**Caminhos possíveis dependendo da interface:**

**Opção A - Nova Interface:**
1. No menu lateral esquerdo, clique em **"Hosting"**
2. Selecione a branch **"main"**
3. Clique na aba **"Environment variables"**
4. Clique em **"Manage variables"**

**Opção B - Interface Clássica:**
1. No menu lateral, procure por **"App settings"**
2. Clique em **"Environment variables"**
3. Clique em **"Manage variables"**

**Opção C - Via Build Settings:**
1. Clique em **"Build settings"** no menu lateral
2. Role para baixo até encontrar **"Environment variables"**
3. Clique em **"Manage variables"** ou **"Edit"**

#### Passo 3: Adicione as Variáveis

Clique em **"Add variable"** ou **"Add"** e adicione:

| Nome da Variável | Valor | Descrição |
|------------------|-------|-----------|
| `NEXT_PUBLIC_API_SITE_KEY` | `[OBTENHA VIA TERRAFORM]` | Chave Read-Only (GET requests) |
| `API_ADMIN_KEY` | `[OBTENHA VIA TERRAFORM]` | Chave Full Access (usado pelo chat) |
| `NEXT_PUBLIC_API_BASE_URL` | `https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com` | Base URL da API |
| `NEXT_PUBLIC_CHAT_API_URL` | `https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com/chat` | Chat endpoint |

**⚠️ Importante:**
- `NEXT_PUBLIC_*` são expostas no browser (só para leitura)
- `API_ADMIN_KEY` **NÃO** tem prefixo `NEXT_PUBLIC_` (só acessível server-side)
- O chat requer Admin Key pois o backend exige permissões elevadas

**Obtenha as API Keys via Terraform:**

```bash
# No diretório do backend
cd ../backend  # ou onde está o Terraform

# Site Key (Read-Only)
terraform output -raw api_key_site

# Admin Key (Full Access)
terraform output -raw api_key_admin
```

#### Passo 4: Salvar e Redeploy

1. Clique em **"Save"** ou **"Save changes"**
2. Vá para a página principal do app
3. Clique em **"Redeploy this version"** no último build
4. Aguarde o build completar (~3-5 min)

### Método 2: Via AWS CLI

Se você tem AWS CLI configurado:

```bash
# Liste suas apps
aws amplify list-apps

# Configure as variáveis (substitua APP_ID e BRANCH_NAME)
aws amplify update-branch \
  --app-id APP_ID \
  --branch-name main \
  --environment-variables \
    NEXT_PUBLIC_API_SITE_KEY=sua-site-key-aqui \
    API_ADMIN_KEY=sua-admin-key-aqui \
    NEXT_PUBLIC_API_BASE_URL=https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com \
    NEXT_PUBLIC_CHAT_API_URL=https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com/chat
```

### Método 3: Via amplify.yml (Build-time)

**⚠️ NÃO RECOMENDADO** - Expõe as chaves no repositório

Adicione no `amplify.yml`:

```yaml
frontend:
  phases:
    preBuild:
      commands:
        - cd portfolio-web
        - npm ci
        # NÃO FAÇA ISSO - apenas para referência
        # - export NEXT_PUBLIC_API_SITE_KEY="sua-chave"
```

## 🔍 Verificando se as Variáveis Foram Configuradas

### Durante o Build

1. Acesse os **Build logs** do Amplify
2. Procure na saída do build por:
   - ✅ **Sucesso:** Build completa sem erros
   - ❌ **Erro:** Mensagens sobre variáveis não configuradas

### Após o Deploy

Acesse sua URL do Amplify. Se as variáveis não estiverem configuradas, você verá:

```json
{
  "error": "API Key not configured",
  "message": "NEXT_PUBLIC_API_SITE_KEY environment variable is required..."
}
```

## 🐛 Troubleshooting

### ❌ Não Encontro "Environment Variables" no Console

**Possíveis razões:**

1. **Interface Diferente**: O Amplify tem diferentes UIs dependendo da região/conta
   - Tente pesquisar "Environment" ou "Variables" na barra de busca do console
   - Verifique em **App settings → Build settings → Advanced settings**

2. **Permissões IAM Insuficientes**:
   - Sua conta AWS pode não ter permissão para modificar variáveis
   - Contate o administrador da conta AWS
   - Permissão necessária: `amplify:UpdateBranch`

3. **Versão Legacy do Amplify**:
   - Apps muito antigos podem estar em versão legacy
   - Solução: Migre para Amplify Gen 2 ou use AWS CLI

**Alternativas:**

#### A) Use AWS CloudShell (Direto no Console AWS)

1. No console AWS, clique no ícone **CloudShell** (>_) no topo
2. Execute:

```bash
# Liste suas apps Amplify
aws amplify list-apps --output table

# Configure a variável (substitua APP_ID pela sua)
aws amplify get-app --app-id APP_ID | grep appId
aws amplify update-branch \
  --app-id d27cwsug3pgpo1 \
  --branch-name main \
  --environment-variables \
    NEXT_PUBLIC_API_SITE_KEY=SUA_CHAVE_AQUI \
    NEXT_PUBLIC_API_BASE_URL=https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com

# Trigger redeploy
aws amplify start-job --app-id d27cwsug3pgpo1 --branch-name main --job-type RELEASE
```

#### B) Use GitHub Secrets + GitHub Actions

Crie workflow `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Amplify
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Set Environment Variables
        run: |
          aws amplify update-branch \
            --app-id ${{ secrets.AMPLIFY_APP_ID }} \
            --branch-name main \
            --environment-variables \
              NEXT_PUBLIC_API_SITE_KEY=${{ secrets.API_SITE_KEY }}
```

Configure os secrets no GitHub: **Settings → Secrets → Actions**

### ❌ Erro 401 Unauthorized Após Deploy

**Causa:** Variável `NEXT_PUBLIC_API_SITE_KEY` não foi configurada ou está incorreta

**Solução:**
1. Verifique se a variável foi salva corretamente no Amplify
2. Confirme o valor da API Key via Terraform: `terraform output -raw api_key_site`
3. Certifique-se de que não há espaços extras no início/fim do valor
4. Faça um **redeploy** completo (não apenas revalidate)

### ❌ Build Falha com "Module not found"

**Causa:** Estrutura de diretórios incorreta no amplify.yml

**Solução:**
Verifique se o `amplify.yml` aponta para `portfolio-web`:

```yaml
preBuild:
  commands:
    - cd portfolio-web  # ← Importante!
    - npm ci
```

### ❌ Variável Aparece Como "undefined" no Build

**Causa:** Variáveis `NEXT_PUBLIC_*` não são injetadas corretamente

**Solução:**
1. Variáveis devem ser definidas **antes** do build
2. Limpe o cache: **App settings → General → Clear cache**
3. Redeploy completo
4. Verifique logs do build para confirmar que as variáveis foram carregadas

## 📋 Configuração do Build (amplify.yml)

O projeto já inclui um arquivo `amplify.yml` na raiz com a configuração de build:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd portfolio-web
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: portfolio-web/.next
    files:
      - '**/*'
  cache:
    paths:
      - portfolio-web/node_modules/**/*
      - portfolio-web/.next/cache/**/*
```

## � Processo Completo de Deploy

### 1. Configure as Variáveis de Ambiente

**ANTES de fazer qualquer deploy**, configure as variáveis no Amplify (ver seção acima).

### 2. Prepare o Código

```bash
# Teste localmente com as variáveis
cd portfolio-web
cp .env.example .env.local
# Edite .env.local e adicione suas API Keys
npm run build
npm run start

# Se tudo funcionar, commit (NÃO commite .env.local!)
git add .
git commit -m "feat: configuração para produção"
```

### 3. Push para o GitHub

```bash
git push origin main
```

### 4. Monitore o Deploy

1. Acesse o [Amplify Console](https://console.aws.amazon.com/amplify/)
2. Acompanhe o progresso em tempo real
3. Fases do build:
   - **Provision**: Preparando ambiente
   - **Build**: Instalando dependências e buildando
   - **Deploy**: Publicando na CDN
   - **Verify**: Validando deploy

### 5. Verifique a Aplicação

Após deploy completo:
1. Acesse a URL fornecida pelo Amplify
2. Teste as páginas principais
3. Verifique se os dados da API carregam corretamente
4. Confira o console do navegador (F12) para erros

## ✅ Checklist Pré-Deploy

- [ ] ✅ **Variáveis de ambiente configuradas no Amplify**
- [ ] API Keys obtidas via Terraform e testadas
- [ ] Código compila sem erros (`npm run build`)
- [ ] Testado localmente com `npm run start`
- [ ] Arquivo `.env.local` NÃO está commitado (está no .gitignore)
- [ ] Arquivo `amplify.yml` está na raiz do repositório
- [ ] Não há valores sensíveis hardcoded no código
- [ ] README.md e DEPLOYMENT.md estão atualizados

## 🔒 Segurança

### ✅ O que é SEGURO

- ✅ `NEXT_PUBLIC_API_SITE_KEY` nas variáveis do Amplify (Read-Only)
- ✅ URLs públicas da API
- ✅ Configuração via console AWS (protegida por IAM)

### ❌ O que NUNCA fazer

- ❌ Commitar `.env.local` com valores reais
- ❌ Hardcodar API Keys no código
- ❌ Expor `API_ADMIN_KEY` no frontend
- ❌ Compartilhar chaves em issues/PRs públicos
- ❌ Usar a mesma API Key para dev e produção

## 📚 Referências

- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [Next.js on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/server-side-rendering-amplify.html)
- [Amplify Environment Variables](https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

---

**Última atualização:** 16 de fevereiro de 2026
