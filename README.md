# 🚀 Portfolio V2 - Frontend

Portfolio profissional desenvolvido com Next.js 16, TypeScript e TailwindCSS, consumindo uma API REST serverless hospedada na AWS.

## 📋 Sobre o Projeto

Este é um site de portfólio moderno e responsivo que apresenta informações profissionais, projetos, certificações e formações acadêmicas. O projeto utiliza tecnologias de ponta para garantir performance, acessibilidade e experiência do usuário excepcional.

## 🛠️ Tecnologias

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca JavaScript para interfaces
- **[TypeScript 5](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[TailwindCSS 4](https://tailwindcss.com/)** - Framework CSS utilitário

### UI & Animações
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas e interativas
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones moderna
- **[Radix UI](https://www.radix-ui.com/)** - Componentes headless acessíveis
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis

### Utilitários
- **[clsx](https://github.com/lukeed/clsx)** - Construção condicional de classes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes Tailwind
- **[class-variance-authority](https://cva.style/docs)** - Variantes de componentes

## 📁 Estrutura do Projeto

```
portfolio-web/
├── src/
│   ├── app/                      # App Router (Next.js 16)
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Página inicial
│   │   ├── globals.css          # Estilos globais
│   │   ├── certificacoes/       # Página de certificações e formações
│   │   ├── projetos/            # Página de projetos
│   │   ├── setup/               # Página de setup/equipamentos
│   │   ├── sobre/               # Página sobre mim
│   │   └── status/              # Status da API
│   │
│   ├── components/              # Componentes React
│   │   ├── certificacoes/       # Components de certificados
│   │   │   ├── certificate-card.tsx
│   │   │   └── formation-card.tsx
│   │   ├── home/                # Components da home
│   │   │   ├── current-focus-card.tsx
│   │   │   ├── hero-terminal.tsx
│   │   │   └── tech-stack-grid.tsx
│   │   ├── projetos/            # Components de projetos
│   │   │   ├── project-card.tsx
│   │   │   └── project-grid.tsx
│   │   ├── sobre/               # Components sobre
│   │   │   ├── soft-skills-badges.tsx
│   │   │   └── timeline-vertical.tsx
│   │   ├── shared/              # Components compartilhados
│   │   │   ├── footer.tsx
│   │   │   └── navbar.tsx
│   │   └── ui/                  # Componentes base (Shadcn)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── separator.tsx
│   │       ├── skeleton.tsx
│   │       └── tabs.tsx
│   │
│   └── lib/                     # Utilitários e configurações
│       ├── api-service.ts       # Cliente da API REST
│       ├── api-types.ts         # Tipagens TypeScript da API
│       └── utils.ts             # Funções utilitárias
│
├── public/                      # Arquivos estáticos
├── desing-system/               # Documentação do design system
│   ├── API_INTEGRATION.md
│   ├── api.http
│   ├── desing-token.md
│   ├── frontend-structure.md
│   └── site-architecture.md
└── package.json
```

## ✨ Funcionalidades

### 🏠 Home
- Hero section com efeito de terminal animado
- Stack tecnológico com grid de tecnologias
- Card de foco atual com projetos em andamento

### 📚 Certificações & Formações
- **Formações Acadêmicas**
  - Filtro dinâmico por área (extraído do campo `area`)
  - Cards com informações detalhadas (matérias, conclusão, certificado)
  - Layout responsivo em grid
  
- **Certificados Profissionais**
  - Filtro dinâmico por categoria (extraído do campo `categoryCode`)
  - Cards com imagem, nome do curso, datas de início e conclusão
  - Sistema de abas para navegação entre categorias
  - Estatísticas automáticas por categoria

### 💼 Projetos
- Grid de projetos com cards animados
- Filtros por categoria e tipo de performance
- Informações sobre tecnologias utilizadas
- Links para GitHub e demonstração

### 👤 Sobre
- Timeline vertical de experiência profissional
- Soft skills em badges
- Cards informativos (Quem sou, O que faço, O que amo)

### ⚙️ Setup
- Equipamentos utilizados
- Ferramentas de desenvolvimento

### 📊 Status
- Monitoramento da saúde da API
- Informações sobre endpoints disponíveis

## 🔌 Integração com API

O frontend consome uma API REST serverless hospedada na AWS com autenticação via API Key:

**Base URL:** `https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com`

### Autenticação

Todas as requisições devem incluir o header `x-api-key`:

```typescript
headers: {
  'Content-Type': 'application/json',
  'x-api-key': 'your-api-key-here'
}
```

### Endpoints

| Endpoint | Método | Autenticação | Descrição |
|----------|--------|--------------|-----------|
| `/certificates` | GET | Site Key | Lista todos os certificados |
| `/certificates/{id}` | GET | Site Key | Retorna um certificado específico |
| `/certificates` | POST | Admin Key | Cria um novo certificado |
| `/certificates/{id}` | PUT | Admin Key | Atualiza um certificado |
| `/formations` | GET | Site Key | Lista todas as formações |
| `/formations/{id}` | GET | Site Key | Retorna uma formação específica |
| `/formations` | POST | Admin Key | Cria uma nova formação |
| `/formations/{id}` | PUT | Admin Key | Atualiza uma formação |
| `/projects` | GET | Site Key | Lista todos os projetos |
| `/projects/{id}` | GET | Site Key | Retorna um projeto específico |
| `/projects` | POST | Admin Key | Cria um novo projeto |
| `/projects/{id}` | PUT | Admin Key | Atualiza um projeto |
| `/chat` | POST | Site Key | Envia uma pergunta para o chatbot RAG |

### Tipos de Dados

```typescript
interface Certificate {
  id: number;
  categoryCode: string;
  certificateUrl: string;
  courseName: string;
  finishedAt: string;
  imageUrl: string;
  startedAt: string;
}

interface Formation {
  id: number;
  name: string;
  area: string;
  certificate: string;
  conclusion: string;
  materias: string[];
}

interface Project {
  id: number;
  projectName: string;
  description: string;
  categoryLocal: string;
  typePerformance?: string;
  imagesUrl: string[];
  technologiesUsed: string[];
  linkGithub?: string;
  linkSite?: string;
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 20+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre na pasta do projeto
cd portfolio-web

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## 🎨 Design System

O projeto segue um design system documentado na pasta `desing-system/`:

- **Design Tokens**: Cores, tipografia, espaçamentos
- **Componentes**: Biblioteca de componentes documentada
- **Arquitetura**: Estrutura de pastas e padrões

### Paleta de Cores

```css
--background-950: #0a0a0b;
--background-900: #131316;
--text-50: #f8f8f9;
--text-400: #9ca3af;
--accent-500: #1e90ff;
--primary-400: #60a5fa;
--border: #1f2937;
```

### Tipografia

- **Heading**: Noto Sans (700)
- **Body**: Inter (400)
- **Code**: JetBrains Mono

## 📱 Responsividade

O site é totalmente responsivo com breakpoints:

- **xs**: < 640px (mobile)
- **sm**: 640px+ (tablet)
- **md**: 768px+
- **lg**: 1024px+ (desktop)
- **xl**: 1280px+
- **2xl**: 1536px+

## 🔧 Configuração

### Variáveis de Ambiente

A aplicação **requer** configuração de API Keys para funcionar.

#### Desenvolvimento Local

Crie um arquivo `.env.local` na raiz do `portfolio-web/`:

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com

# API Keys para autenticação (obter via Terraform)
NEXT_PUBLIC_API_SITE_KEY=sua-chave-aqui
API_SITE_KEY=sua-chave-aqui

# Chat API Configuration  
NEXT_PUBLIC_CHAT_API_URL=https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com/chat

# Admin auth via Cognito
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_CLIENT_ID=seu-client-id-aqui

# Sessao admin (cookie httpOnly assinado)
ADMIN_SESSION_SECRET=change-me-in-local
```

Tambem existe um template em `.env.example` para acelerar a configuracao local.

### Area Admin (Cognito)

A area administrativa usa Cognito para autenticar usuarios e grupos (`superadmin` e `editor`).

1. Inicie o frontend com `npm run dev`
2. Acesse `http://localhost:3000/admin/login`
3. Use um usuario existente no User Pool com grupo admin (`superadmin` ou `editor`)
4. Apos login, voce sera redirecionado para `http://localhost:3000/admin`
5. Use o botao `Sair` para limpar a sessao local

Se aparecer a mensagem `Cognito nao configurado no frontend`, confirme as variaveis de ambiente acima e reinicie o servidor (`npm run dev`), pois o Next le as envs no boot.

#### Como Obter as API Keys

Use o Terraform no projeto backend:

```bash
# Navegue até o diretório do backend
cd ../backend  

# Obtenha a Site Key (Read-Only)
terraform output -raw api_key_site
```

#### Segurança

- **SITE KEY**: Operações GET (leitura) - Usada no frontend
- **ADMIN KEY**: NUNCA expor no frontend (apenas backend)
- **Rate Limiting**: Proteção automática na API Gateway

### Smoke Test BFF (Producao)

Para validar os endpoints BFF do Next em producao (`/api/*`) em uma unica execucao:

```bash
BFF_BASE_URL=https://www.diogo.life \
BFF_ADMIN_USERNAME=seu-admin@email.com \
BFF_ADMIN_PASSWORD='sua-senha' \
npm run test:bff:prod
```

O teste cobre:
- `GET /api/certificates`
- `GET /api/formations`
- `GET /api/projects`
- `POST /api/chat`
- `POST /api/admin/auth/login` + `GET /api/admin/projects`

## � Deploy em Produção

A aplicação **requer configuração de variáveis de ambiente** no AWS Amplify para funcionar em produção.

**Sem as variáveis configuradas, você receberá erro 500/401!**

Ver guia completo: **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Deploy no AWS Amplify

**1. Configure as variáveis de ambiente no Amplify** (ver [DEPLOYMENT.md](./DEPLOYMENT.md))  
**2. Faça push para o repositório:**

```bash
git add .
git commit -m "deploy: versão para produção"
git push origin main
```

**Guia completo com troubleshooting:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## �📄 Licença

Este projeto é privado e de propriedade de Diogo Luna.

## 👨‍💻 Autor

**Diogo Luna**  
Tech Lead & Software Engineer

- Portfolio: [@amplify](https://www.diogo.life/)
- LinkedIn: [@diogosis](https://www.linkedin.com/in/diogosis)
- GitHub: [@DiogoSis](https://github.com/DiogoSis)

---

Desenvolvido usando Next.js e TailwindCSS
