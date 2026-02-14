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

O frontend consome uma API REST serverless hospedada na AWS:

**Base URL:** `https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com`

### Endpoints

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/certificates` | GET | Lista todos os certificados |
| `/certificates/{id}` | GET | Retorna um certificado específico |
| `/formations` | GET | Lista todas as formações |
| `/formations/{id}` | GET | Retorna uma formação específica |
| `/projects` | GET | Lista todos os projetos |
| `/projects/{id}` | GET | Retorna um projeto específico |

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

Não há variáveis de ambiente obrigatórias, pois a URL da API está configurada diretamente no código.

## 📄 Licença

Este projeto é privado e de propriedade de Diogo Luna.

## 👨‍💻 Autor

**Diogo Luna**  
Tech Lead & Software Engineer

- Portfolio: [Em breve]
- LinkedIn: [@diogosis](https://www.linkedin.com/in/diogosis)
- GitHub: [@DiogoSis](https://github.com/DiogoSis)

---

Desenvolvido usando Next.js e TailwindCSS
