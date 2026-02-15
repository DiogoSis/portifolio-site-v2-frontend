'use client';

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTerminal } from "@/components/home/hero-terminal";
import { TechStackGrid } from "@/components/home/tech-stack-grid";
import { CurrentFocusCard } from "@/components/home/current-focus-card";
import { useChat } from "@/lib/hooks/use-chat";

export default function Home() {
  const { openChat } = useChat();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-4rem)] flex items-center py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-accent-500 font-mono text-sm">
                  {"// Olá, eu sou"}
                </p>
                <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-text-50 leading-tight">
                  Diogo Luna
                </h1>
                <h2 className="font-heading text-2xl md:text-3xl text-primary-400">
                  Tech Lead & Software Engineer
                </h2>
              </div>

              <p className="text-text-400 text-lg max-w-xl leading-relaxed">
                Engenharia de Software & DevOps. Construindo infraestrutura
                escalável e sistemas resilientes com foco em{" "}
                <span className="text-accent-500">alta disponibilidade</span> e{" "}
                <span className="text-accent-500">performance</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent-500 text-background-950 hover:bg-accent-400 hover:glow-accent font-semibold"
                >
                  <Link href="/projetos">
                    Ver Projetos
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  onClick={openChat}
                  variant="outline"
                  size="lg"
                  className="border-text-700 text-text-300 hover:bg-background-800 hover:text-text-50"
                >
                  <MessageSquare className="mr-2 w-4 h-4" />
                  Chat com IA
                </Button>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="flex justify-center lg:justify-end">
              <HeroTerminal />
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-12 bg-background-900/50">
        <div className="container mx-auto px-4">
          <h2 className="font-heading font-bold text-2xl text-text-50 mb-6">
            Foco Atual
          </h2>
          <CurrentFocusCard />
        </div>
      </section>

      {/* Tech Stack */}
      <TechStackGrid />
    </div>
  );
}
