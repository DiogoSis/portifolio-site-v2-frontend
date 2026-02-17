/**
 * Tipos para estrutura de dados do currículo
 * Formato ATS-friendly para parsing por sistemas de recrutamento
 */

export interface CVMetadata {
  version: string;
  lastUpdated: string; // ISO8601 date
  locale: "pt-BR" | "en-US";
}

export interface CVLocation {
  street?: string;
  city: string;
  state: string;
  zipCode?: string;
  country: string;
}

export interface CVLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  other?: string[];
}

export interface CVPersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: CVLocation;
  links: CVLinks;
}

export interface CVSummary {
  text: string;
  keywords?: string[]; // Para SEO/ATS
}

export interface CVExperience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string; // YYYY-MM
  endDate: string | "present"; // YYYY-MM ou "present"
  current: boolean;
  responsibilities: string[];
  achievements?: string[]; // Resultados mensuráveis
  technologies?: string[];
}

export interface CVEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string; // YYYY-MM
  endDate: string; // YYYY-MM ou "present" ou "expected YYYY"
  location?: string;
  gpa?: string;
  highlights?: string[];
}

export interface CVSkillCategory {
  category: string;
  items: string[];
}

export interface CVLanguage {
  language: string;
  proficiency: "Native" | "Fluent" | "Advanced" | "Intermediate" | "Basic";
}

export interface CVSkills {
  technical: CVSkillCategory[];
  languages: CVLanguage[];
  soft?: string[];
}

export interface CVCertification {
  id: string;
  name: string;
  issuer: string;
  date: string; // YYYY-MM
  expiryDate?: string; // YYYY-MM
  credentialId?: string;
  credentialUrl?: string;
  category?: string;
}

export interface CVCertifications {
  source: "api" | "static";
  apiEndpoint?: string;
  items: CVCertification[];
}

export interface CVProject {
  id: string;
  name: string;
  description: string;
  role?: string;
  technologies: string[];
  url?: string;
  repository?: string;
  highlights?: string[];
}

export interface CVProjects {
  source: "api" | "static";
  apiEndpoint?: string;
  featured?: string[]; // IDs de projetos em destaque
  items: CVProject[];
}

export interface CVPreferences {
  sectionsOrder: string[];
  includeProjects: boolean;
  includeCertifications: boolean;
  maxProjectsCount?: number;
  maxCertificationsCount?: number;
  theme: "professional" | "modern" | "minimal";
}

export interface CVData {
  metadata: CVMetadata;
  personalInfo: CVPersonalInfo;
  summary: CVSummary;
  experience: CVExperience[];
  education: CVEducation[];
  certifications: CVCertifications;
  achievements?: string[]; // Realizações e conquistas profissionais
  skills: CVSkills;
  additionalKnowledge?: string[]; // APIs e ferramentas específicas
  projects?: CVProjects;
  preferences: CVPreferences;
}
