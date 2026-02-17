"use client";

import { useState } from "react";
import { Download, Loader2, Briefcase, GraduationCap, Code, FolderGit2, Award, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVSection } from "@/components/cv/cv-section";
import { ExperienceItem } from "@/components/cv/experience-item";
import { EducationItem } from "@/components/cv/education-item";
import { SkillsGrid } from "@/components/cv/skills-grid";
import { ProjectItem } from "@/components/cv/project-item";
import { CertificationItem } from "@/components/cv/certification-item";
import { generateAndDownloadCV } from "@/lib/cv-utils";
import cvData from "@/data/cv.json";
import { CVData } from "@/types/cv";

export default function CVPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const data = cvData as CVData;

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      await generateAndDownloadCV(data, "Diogo_Luna_CV.pdf");
    } catch (error) {
      console.error("Erro ao fazer download do CV:", error);
      alert("Não foi possível gerar o PDF. Por favor, tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Filtra projetos em destaque (se existirem)
  const featuredProjects = data.projects?.items
    ? data.projects.items.filter((project) =>
        data.projects?.featured?.includes(project.id)
      ).slice(0, data.preferences.maxProjectsCount || 3)
    : [];

  // Filtra certificações limitadas
  const limitedCertifications = data.certifications.items.slice(
    0,
    data.preferences.maxCertificationsCount || 5
  );

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
            <div className="flex-1">
              <p className="text-accent-500 font-mono text-sm mb-4">
                {"// Currículo"}
              </p>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-text-50 mb-4">
                Curriculum
              </h1>
              <p className="text-text-400 text-lg leading-relaxed">
                Currículo profissional em formato ATS-friendly. Compatível com
                sistemas de recrutamento automatizados.
              </p>
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={isGenerating}
              size="lg"
              className="bg-accent-500 text-background-950 hover:bg-accent-400 font-semibold shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Gerando PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>

          {/* Personal Info Card */}
          <div className="bg-background-900 border border-border rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 rounded-lg bg-accent-500/10">
                <User className="w-6 h-6 text-accent-500" />
              </div>
              <div className="flex-1">
                <h2 className="font-heading font-bold text-2xl text-text-50 mb-2">
                  {data.personalInfo.fullName}
                </h2>
                <p className="text-primary-400 text-lg font-semibold mb-3">
                  {data.personalInfo.title}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-text-400 text-sm mb-3">
                  <div>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href={`mailto:${data.personalInfo.email}`}
                      className="text-accent-500 hover:text-accent-400"
                    >
                      {data.personalInfo.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold">Telefone:</span>{" "}
                    {data.personalInfo.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Localização:</span>{" "}
                    {data.personalInfo.location.city}, {data.personalInfo.location.state}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {data.personalInfo.links.linkedin && (
                    <a
                      href={data.personalInfo.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-400 hover:text-primary-300 underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {data.personalInfo.links.github && (
                    <a
                      href={data.personalInfo.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-400 hover:text-primary-300 underline"
                    >
                      GitHub
                    </a>
                  )}
                  {data.personalInfo.links.portfolio && (
                    <a
                      href={data.personalInfo.links.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-400 hover:text-primary-300 underline"
                    >
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <CVSection title="Resumo Profissional" icon={<User className="w-6 h-6" />} delay={0.1}>
          <div className="bg-background-900 border border-border rounded-lg p-6">
            <p className="text-text-400 text-base leading-relaxed">
              {data.summary.text}
            </p>
          </div>
        </CVSection>

        {/* Experience Section */}
        <CVSection
          title="Experiência Profissional"
          icon={<Briefcase className="w-6 h-6" />}
          delay={0.2}
        >
          {data.experience.map((exp, index) => (
            <ExperienceItem key={exp.id} experience={exp} index={index} />
          ))}
        </CVSection>

        {/* Education Section */}
        <CVSection
          title="Formação Acadêmica"
          icon={<GraduationCap className="w-6 h-6" />}
          delay={0.3}
        >
          {data.education.map((edu, index) => (
            <EducationItem key={edu.id} education={edu} index={index} />
          ))}
        </CVSection>

        {/* Certifications Section */}
        {data.preferences.includeCertifications && limitedCertifications.length > 0 && (
          <CVSection
            title="Certificações e Cursos"
            icon={<Award className="w-6 h-6" />}
            delay={0.4}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {limitedCertifications.map((cert, index) => (
                <CertificationItem
                  key={cert.id}
                  certification={cert}
                  index={index}
                />
              ))}
            </div>
          </CVSection>
        )}

        {/* Achievements Section */}
        {data.achievements && data.achievements.length > 0 && (
          <CVSection
            title="Realizações"
            icon={<Award className="w-6 h-6" />}
            delay={0.5}
          >
            <div className="bg-background-900 border border-border rounded-lg p-6">
              <ul className="space-y-2">
                {data.achievements.map((achievement, index) => (
                  <li key={index} className="text-text-400 text-sm leading-relaxed flex">
                    <span className="text-accent-500 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CVSection>
        )}

        {/* Skills Section */}
        <CVSection title="Habilidades Técnicas" icon={<Code className="w-6 h-6" />} delay={0.6}>
          <SkillsGrid skills={data.skills} />
        </CVSection>

        {/* Additional Knowledge Section */}
        {data.additionalKnowledge && data.additionalKnowledge.length > 0 && (
          <CVSection
            title="Conhecimentos Extras"
            icon={<Code className="w-6 h-6" />}
            delay={0.7}
          >
            <div className="bg-background-900 border border-border rounded-lg p-6">
              <ul className="space-y-2">
                {data.additionalKnowledge.map((knowledge, index) => (
                  <li key={index} className="text-text-400 text-sm leading-relaxed">
                    • {knowledge}
                  </li>
                ))}
              </ul>
            </div>
          </CVSection>
        )}

        {/* Soft Skills Section */}
        {data.skills.soft && data.skills.soft.length > 0 && (
          <CVSection
            title="Habilidades Comportamentais"
            icon={<User className="w-6 h-6" />}
            delay={0.8}
          >
            <div className="bg-background-900 border border-border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data.skills.soft.map((skill, index) => (
                  <div key={index} className="flex items-center text-text-400 text-sm">
                    <span className="text-accent-500 mr-2">•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </CVSection>
        )}

        {/* Footer Info */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-text-400 text-sm">
            Última atualização:{" "}
            {new Date(data.metadata.lastUpdated).toLocaleDateString("pt-BR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-text-400 text-xs mt-2">
            Versão {data.metadata.version} • Formato ATS-friendly
          </p>
        </div>
      </div>
    </div>
  );
}
