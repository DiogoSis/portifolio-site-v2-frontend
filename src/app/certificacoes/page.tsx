"use client";

import { useState, useEffect } from "react";
import { CertificateCard, Certificate } from "@/components/certificacoes/certificate-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Cloud, Code, LayoutGrid, Loader2 } from "lucide-react";
import { apiService } from "@/lib/api-service";
import { Certificate as ApiCertificate } from "@/lib/api-types";

const categories = [
  { value: "todos", label: "Todos", icon: LayoutGrid },
  { value: "Academico", label: "Acadêmico", icon: GraduationCap },
  { value: "Cloud", label: "Cloud", icon: Cloud },
  { value: "Dev", label: "Desenvolvimento", icon: Code },
];

export default function CertificacoesPage() {
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredCertificates =
    selectedCategory === "todos"
      ? certificates
      : certificates.filter((c) => c.categoryCode === selectedCategory);

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent-500" />
          <p className="text-text-400">Carregando certificados...</p>
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

        {/* Filter Tabs */}
        <Tabs
          defaultValue="todos"
          className="mb-6 sm:mb-8"
          onValueChange={setSelectedCategory}
        >
          <TabsList className="bg-background-900 border border-border h-auto gap-1 p-1 w-full sm:w-auto">
            {categories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className="data-[state=active]:bg-accent-500 data-[state=active]:text-background-950 text-text-400 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 flex-1 sm:flex-initial"
              >
                <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{category.label}</span>
                <span className="xs:hidden">{category.label.substring(0, 3)}</span>
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
          <div className="text-center p-4 sm:p-6 rounded-lg bg-background-900 border border-border">
            <p className="font-heading font-bold text-2xl sm:text-3xl text-accent-500">
              {certificates.filter((c) => c.categoryCode === "Cloud").length}
            </p>
            <p className="text-text-400 text-xs sm:text-sm">Certificações Cloud</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg bg-background-900 border border-border">
            <p className="font-heading font-bold text-2xl sm:text-3xl text-accent-500">
              {certificates.filter((c) => c.categoryCode === "Dev").length}
            </p>
            <p className="text-text-400 text-xs sm:text-sm">Certificações Dev</p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg bg-background-900 border border-border">
            <p className="font-heading font-bold text-2xl sm:text-3xl text-accent-500">
              8+
            </p>
            <p className="text-text-400 text-sm">Anos de Experiência</p>
          </div>
        </div>
      </div>
    </div>
  );
}
