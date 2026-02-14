"use client";

import { useState, useEffect, useMemo } from "react";
import { CertificateCard, Certificate } from "@/components/certificacoes/certificate-card";
import { FormationCard, Formation } from "@/components/certificacoes/formation-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Cloud, Code, LayoutGrid, Loader2, Award, LucideIcon } from "lucide-react";
import { apiService } from "@/lib/api-service";
import { Certificate as ApiCertificate } from "@/lib/api-types";

// Mapeamento de ícones para categorias conhecidas
const categoryIcons: Record<string, LucideIcon> = {
  "Acadêmico": GraduationCap,
  "Cloud": Cloud,
  "Desenvolvimento": Code,
  "Dev": Code,
  "Cloud Computing": Cloud,
  // Ícone padrão para categorias não mapeadas
  "default": Award,
};

export default function CertificacoesPage() {
  const [selectedFormationArea, setSelectedFormationArea] = useState("todos");
  const [selectedCertificateCategory, setSelectedCertificateCategory] = useState("todos");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [formations, setFormations] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFormations, setLoadingFormations] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [errorFormations, setErrorFormations] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        setLoading(true);
        const data = await apiService.getCertificates();
        // Converte os certificados da API para o formato esperado
        const formattedCertificates: Certificate[] = data.map((cert) => ({
          ...cert,
          id: cert.id.toString(),
        }));
        setCertificates(formattedCertificates);
        setError(null);
      } catch (err) {
        console.error("Erro ao carregar certificados:", err);
        setError("Não foi possível carregar os certificados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, []);

  useEffect(() => {
    async function fetchFormations() {
      try {
        setLoadingFormations(true);
        const data = await apiService.getFormations();
        const formattedFormations: Formation[] = data.map((form) => ({
          ...form,
          id: form.id.toString(),
        }));
        setFormations(formattedFormations);
        setErrorFormations(null);
      } catch (err) {
        console.error("Erro ao carregar formações:", err);
        setErrorFormations("Não foi possível carregar as formações.");
      } finally {
        setLoadingFormations(false);
      }
    }

    fetchFormations();
  }, []);

  // Extrai áreas únicas das formações
  const formationAreas = useMemo(() => {
    const uniqueAreas = Array.from(
      new Set(
        formations
          .map((formation) => formation.area)
          .filter((area) => area && area.trim() !== "")
      )
    ).sort();

    return [
      { value: "todos", label: "Todas", icon: LayoutGrid },
      ...uniqueAreas.map((area) => ({
        value: area,
        label: area,
        icon: GraduationCap,
      })),
    ];
  }, [formations]);

  // Extrai categorias únicas dos certificados
  const certificateCategories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        certificates
          .map((cert) => cert.categoryCode)
          .filter((code) => code && code.trim() !== "")
      )
    ).sort();

    return [
      { value: "todos", label: "Todos", icon: LayoutGrid },
      ...uniqueCategories.map((categoryCode) => ({
        value: categoryCode,
        label: categoryCode,
        icon: categoryIcons[categoryCode] || categoryIcons["default"],
      })),
    ];
  }, [certificates]);

  // Filtra formações por área
  const filteredFormations =
    selectedFormationArea === "todos"
      ? formations
      : formations.filter((f) => f.area === selectedFormationArea);

  // Filtra certificados por categoria
  const filteredCertificates =
    selectedCertificateCategory === "todos"
      ? certificates
      : certificates.filter((c) => c.categoryCode === selectedCertificateCategory);

  // Calcula estatísticas por categoria de certificados
  const certificateStats = useMemo(() => {
    const stats: Record<string, number> = {};
    certificates.forEach((cert) => {
      const category = cert.categoryCode || "Outros";
      stats[category] = (stats[category] || 0) + 1;
    });
    return Object.entries(stats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);
  }, [certificates]);

  // Aguarda a montagem no cliente antes de renderizar para evitar hydration mismatch
  if (!isMounted || loading || loadingFormations) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
          <p className="text-text-400">Carregando certificações e formações...</p>
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
            {"// Certificações"}
          </p>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-50 mb-4 sm:mb-6">
            Diplomas & Certificados
          </h1>
          <p className="text-text-400 text-sm sm:text-base md:text-lg leading-relaxed">
            Diplomas, certificados de cloud e cursos de desenvolvimento que
            validam minhas competências técnicas.
          </p>
        </div>

        {/* Formations Section */}
        <section className="mb-12 sm:mb-16">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-50 mb-4 sm:mb-6">
            Formações
          </h2>
          
          {loadingFormations ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-accent-500" />
                <p className="text-text-400 text-sm sm:text-base">Carregando formações...</p>
              </div>
            </div>
          ) : errorFormations ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-sm sm:text-base">{errorFormations}</p>
            </div>
          ) : (
            <>
              {/* Filter Tabs for Formations */}
              <Tabs
                value={selectedFormationArea}
                onValueChange={setSelectedFormationArea}
                className="mb-6 sm:mb-8"
              >
                <TabsList className="bg-background-900 border border-border h-auto gap-1 p-1 w-full sm:w-auto flex-wrap">
                  {formationAreas.map((area) => (
                    <TabsTrigger
                      key={area.value}
                      value={area.value}
                      className="data-[state=active]:bg-primary-400 data-[state=active]:text-background-950 text-text-400 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
                    >
                      <area.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{area.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Formations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredFormations.map((formation, index) => (
                  <FormationCard
                    key={formation.id}
                    formation={formation}
                    index={index}
                  />
                ))}
              </div>

              {/* Empty State for Formations */}
              {filteredFormations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-text-400 text-sm sm:text-base">
                    Nenhuma formação encontrada nesta área.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        <div className="border-t border-border mb-8 sm:mb-12"></div>

        {/* Certificates Section */}
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-50 mb-6 sm:mb-8">
          Certificados
        </h2>

        {/* Filter Tabs */}
        <Tabs
          value={selectedCertificateCategory}
          onValueChange={setSelectedCertificateCategory}
          className="mb-6 sm:mb-8"
        >
          <TabsList className="bg-background-900 border border-border h-auto gap-1 p-1 w-full sm:w-auto flex-wrap">
            {certificateCategories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="data-[state=active]:bg-accent-500 data-[state=active]:text-background-950 text-text-400 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3"
              >
                <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredCertificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-400 text-sm sm:text-base">
              Nenhuma certificação encontrada nesta categoria.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <div className="text-center p-4 sm:p-6 rounded-lg bg-background-900 border border-border">
            <p className="font-heading font-bold text-2xl sm:text-3xl text-accent-500">
              {certificates.length}
            </p>
            <p className="text-text-400 text-xs sm:text-sm">Total de Certificações</p>
          </div>
          {certificateStats.map(([categoryCode, count]) => (
            <div
              key={categoryCode}
              className="text-center p-4 sm:p-6 rounded-lg bg-background-900 border border-border"
            >
              <p className="font-heading font-bold text-2xl sm:text-3xl text-accent-500">
                {count}
              </p>
              <p className="text-text-400 text-xs sm:text-sm">
                {categoryCode}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
