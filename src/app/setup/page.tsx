import { Metadata } from "next";
import {
  Monitor,
  Smartphone,
  Cpu,
  HardDrive,
  Terminal,
  Code2,
  Container,
  Server,
  Layers,
  GitBranch,
  FileText,
  Music,
  MessageSquare,
  BookOpen,
  Package,
  Notebook,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Setup | Diogo Luna",
  description:
    "Meu setup de trabalho: hardware, software e ambiente de desenvolvimento.",
};

const hardware = [
  {
    tipo: "workstation",
    nome: "Desktop Workstation",
    specs: "AMD Ryzen 5 8600G • 32GB DDR5 • 1TB NVMe • RX 6600",
    foco: "Desenvolvimento, IA Local (Ollama), VMs",
    icon: Monitor,
  },
  {
    tipo: "server",
    nome: "Homelab Server",
    specs: "Intel i5-10400 • 64GB ECC • 4x4TB RAID",
    foco: "Proxmox, Docker Swarm, Backups",
    icon: Server,
  },
  {
    tipo: "corporateNotebook",
    nome: "Notebook de Trabalho",
    specs: "Intel i5-12700H • 16GB DDR4 • 1TB NVMe",
    foco: "Desenvolvimento remoto, testes de API, escritório",
    icon: Notebook,
  },
];

const operatingSystems = [
  {
    nome: "Fedora Workstation",
    versao: "41",
    uso: "Ambiente pessoal/lab",
    descricao: "Cutting-edge packages, ideal para testar novas tecnologias",
    icon: Package,
    color: "#51A2DA",
  },
  {
    nome: "Debian",
    versao: "12 (Bookworm)",
    uso: "Ambiente corporativo",
    descricao: "Estabilidade e segurança para servidores em produção",
    icon: Server,
    color: "#A81D33",
  },
];

const software = [
  {
    categoria: "Editores",
    items: [
      { nome: "VS Code", icon: Code2, desc: "IDE principal com extensões" },
      { nome: "Neovim", icon: Terminal, desc: "Edição rápida no terminal" },
      { nome: "IntelliJ", icon: Code2, desc: "Projetos Java e backend" },
    ],
  },
  {
    categoria: "DevOps",
    items: [
      { nome: "Docker", icon: Container, desc: "Containerização" },
      { nome: "Git", icon: GitBranch, desc: "Versionamento" },
      { nome: "Postman", icon: FileText, desc: "Testes de API" },
    ],
  },
  {
    categoria: "Produtividade",
    items: [
      { nome: "Obsidian", icon: BookOpen, desc: "Second brain" },
      { nome: "Draw.io", icon: Layers, desc: "Diagramas e fluxos" },
      { nome: "Jira", icon: Layers, desc: "Gestão de projetos" },
      { nome: "Spotify", icon: Music, desc: "Foco com música" },
      { nome: "Discord", icon: MessageSquare, desc: "Comunidades dev" },
    ],
  },
];

const terminalSetup = {
  shell: "Zsh + Oh My Zsh",
  tema: "Powerlevel10k",
  terminal: "Kitty / Ghostty",
  plugins: ["zsh-autosuggestions", "zsh-syntax-highlighting", "fzf", "z"],
};

export default function SetupPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-accent-500 font-mono text-sm mb-4">
            {"// Setup"}
          </p>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-50 mb-6">
            Meu Ambiente de Trabalho
          </h1>
          <p className="text-text-400 text-lg leading-relaxed">
            Hardware, software e configurações que uso no dia a dia para
            desenvolver e gerenciar infraestrutura.
          </p>
        </div>

        {/* Hardware Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-6 h-6 text-accent-500" />
            <h2 className="font-heading font-bold text-2xl text-text-50">
              Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hardware.map((item) => (
              <Card
                key={item.nome}
                className="bg-background-900 border-border hover:border-accent-500/30 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-accent-500/10">
                      <item.icon className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-text-50 mb-1">
                        {item.nome}
                      </h3>
                      <p className="text-text-400 text-sm mb-2">{item.specs}</p>
                      <Badge
                        variant="secondary"
                        className="bg-background-800 text-text-300 text-xs"
                      >
                        {item.foco}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12 bg-border" />

        {/* Operating Systems */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <HardDrive className="w-6 h-6 text-accent-500" />
            <h2 className="font-heading font-bold text-2xl text-text-50">
              Sistemas Operacionais
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operatingSystems.map((os) => (
              <Card
                key={os.nome}
                className="bg-background-900 border-border hover:border-accent-500/30 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-background-800">
                      <os.icon
                        className="w-8 h-8"
                        style={{ color: os.color }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading font-bold text-text-50">
                          {os.nome}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-xs border-border text-text-400"
                        >
                          v{os.versao}
                        </Badge>
                      </div>
                      <p className="text-primary-400 text-sm mb-2">{os.uso}</p>
                      <p className="text-text-400 text-sm">{os.descricao}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12 bg-border" />

        {/* Terminal Setup */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-accent-500" />
            <h2 className="font-heading font-bold text-2xl text-text-50">
              Terminal
            </h2>
          </div>

          <Card className="bg-background-900 border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-text-400 text-sm mb-1">Shell</p>
                  <p className="text-text-50 font-mono">{terminalSetup.shell}</p>
                </div>
                <div>
                  <p className="text-text-400 text-sm mb-1">Tema</p>
                  <p className="text-text-50 font-mono">{terminalSetup.tema}</p>
                </div>
                <div>
                  <p className="text-text-400 text-sm mb-1">Terminal</p>
                  <p className="text-text-50 font-mono">
                    {terminalSetup.terminal}
                  </p>
                </div>
                <div>
                  <p className="text-text-400 text-sm mb-1">Plugins</p>
                  <div className="flex flex-wrap gap-1">
                    {terminalSetup.plugins.map((plugin) => (
                      <Badge
                        key={plugin}
                        variant="secondary"
                        className="bg-background-800 text-text-300 text-xs"
                      >
                        {plugin}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12 bg-border" />

        {/* Software */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-6 h-6 text-accent-500" />
            <h2 className="font-heading font-bold text-2xl text-text-50">
              Software
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {software.map((category) => (
              <Card
                key={category.categoria}
                className="bg-background-900 border-border"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-text-50 text-lg">
                    {category.categoria}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.nome} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-text-400" />
                        <div>
                          <p className="text-text-50 text-sm font-medium">
                            {item.nome}
                          </p>
                          <p className="text-text-400 text-xs">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
