"use client";

import { useState, useEffect } from "react";
import { Metadata } from "next";
import { ProjectGrid } from "@/components/projetos/project-grid";
import { Project } from "@/components/projetos/project-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { apiService } from "@/lib/api-service";

export default function ProjetosPage() {
  const [selectedFocus, setSelectedFocus] = useState("Todos");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [focusCategories, setFocusCategories] = useState<string[]>(["Todos"]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const data = await apiService.getProjects();
        
        // Converte os projetos da API para o formato esperado
        const formattedProjects: Project[] = data.map((proj) => ({
          ...proj,
          id: proj.id.toString(),
        }));
        
        setProjects(formattedProjects);
        
        // Extrai categorias únicas dos projetos
        const uniqueCategories = ["Todos", ...new Set(data.map(p => p.categoryLocal))];
        setFocusCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
        setError("Não foi possível carregar os projetos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const filteredProjects =
    selectedFocus === "Todos"
      ? projects
      : projects.filter((p) => p.categoryLocal === selectedFocus);

  const handleViewArchitecture = (project: Project) => {
    // TODO: Abrir modal com diagrama ou navegar para página de detalhes
    console.log("Ver arquitetura:", project.projectName);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
          <p className="text-text-400">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-accent-500 hover:text-accent-400 underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <p className="text-accent-500 font-mono text-xs sm:text-sm mb-3 sm:mb-4">
            {"// Projetos"}
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-50 mb-4 sm:mb-6">
            Estudos de Caso
          </h1>
          <p className="text-text-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Projetos focados em arquitetura e solução. Aqui você encontra
            diagramas, decisões técnicas e lições aprendidas — não apenas
            screenshots.
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="Todos" className="mb-6 sm:mb-8" onValueChange={setSelectedFocus}>
          <TabsList className="bg-background-900 border border-border flex-wrap h-auto gap-1 p-1">
            {focusCategories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-accent-500 data-[state=active]:text-background-950 text-text-400 text-xs sm:text-sm px-2 sm:px-3"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Projects Grid */}
        <ProjectGrid
          projects={filteredProjects}
          onViewArchitecture={handleViewArchitecture}
        />

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-400">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
