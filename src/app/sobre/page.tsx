"use client";

import { TimelineVertical, TimelineItem } from "@/components/sobre/timeline-vertical";
import { SoftSkillsBadges } from "@/components/sobre/soft-skills-badges";
import { User, Target, Heart } from "lucide-react";

const timelineItems: TimelineItem[] = [
  {
    id: "1",
    periodo: "2025 - Presente",
    cargo: "Tech Lead",
    empresa: "Segmedic",
    foco: "Liderança técnica de squad, arquitetura de microserviços, mentoria de desenvolvedores e definição de roadmap tecnológico.",
    tipo: "work",
    isCurrent: true,
  },
  {
    id: "2",
    periodo: "2024 - 2025",
    cargo: "Desenvolvedor FullStack Pleno",
    empresa: "Segmedic",
    foco: "Desenvolvimento de APIs escaláveis, implementação de CI/CD, migração para cloud AWS e otimização de performance.",
    tipo: "work",
  },
    {
    id: "3",
    periodo: "2023 - 2027",
    cargo: "Sistemas de Informação",
    empresa: "Estácio de Sá",
    foco: "Retorno ao curso Bacharelado Sistemas de Informação na universidade.",
    tipo: "education",
  },
  {
    id: "4",
    periodo: "2023 - 2024",
    cargo: "Fullstack Developer Junior",
    empresa: "Segmedic",
    foco: "Desenvolvimento de aplicações web com React e Node.js, integração de sistemas e automação de processos.",
    tipo: "work",
  },
  {
    id: "5",
    periodo: "2018 - 2020",
    cargo: "Sistemas de Informação",
    empresa: "Universidade FEUC",
    foco: "Inicio dos estudo em Sistemas de Informação com foco em engenharia de software e arquitetura de sistemas.",
    tipo: "education",
  },
];

const softSkills = [
  "Liderança Técnica",
  "Mentoria",
  "Comunicação",
  "Resolução de Problemas",
  "Pensamento Estratégico",
  "Gestão de Projetos",
  "Code Review",
  "Arquitetura de Software",
  "DevOps Culture",
];

export default function SobrePage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-accent-500 font-mono text-sm mb-4">
            {"// Sobre mim"}
          </p>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-50 mb-6">
            De Dev a Tech Lead
          </h1>
          <p className="text-text-400 text-lg leading-relaxed">
            Uma jornada de crescimento contínuo, focada em resolver problemas
            complexos e construir equipes de alta performance.
          </p>
        </div>

        {/* Bio Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-background-900 border border-border">
              <div className="p-3 rounded-lg bg-accent-500/10 w-fit mb-4">
                <User className="w-6 h-6 text-accent-500" />
              </div>
              <h3 className="font-heading font-bold text-text-50 mb-2">
                Quem sou
              </h3>
              <p className="text-text-400 text-sm">
                Engenheiro de Software com mais de 3 anos de experiência,
                especializado em arquitetura de sistemas distribuídos e práticas
                DevOps.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-background-900 border border-border">
              <div className="p-3 rounded-lg bg-primary-400/10 w-fit mb-4">
                <Target className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="font-heading font-bold text-text-50 mb-2">
                O que faço
              </h3>
              <p className="text-text-400 text-sm">
                Lidero equipe técnica, defino arquiteturas escaláveis e
                implemento práticas de engenharia que aceleram a entrega de
                valor.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-background-900 border border-border">
              <div className="p-3 rounded-lg bg-accent-600/10 w-fit mb-4">
                <Heart className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="font-heading font-bold text-text-50 mb-2">
                O que amo
              </h3>
              <p className="text-text-400 text-sm">
                Resolver problemas complexos, mentorar desenvolvedores e
                transformar requisitos de negócio em soluções elegantes.
              </p>
            </div>
          </div>
        </section>

        {/* Soft Skills */}
        <section className="mb-16">
          <h2 className="font-heading font-bold text-2xl text-text-50 mb-6">
            Soft Skills
          </h2>
          <SoftSkillsBadges skills={softSkills} />
        </section>

        {/* Timeline */}
        <section>
          <h2 className="font-heading font-bold text-2xl text-text-50 mb-8">
            Trajetória
          </h2>
          <TimelineVertical items={timelineItems} />
        </section>
      </div>
    </div>
  );
}
