// Tipos para a API do Portfolio

export interface Certificate {
  id: number;
  categoryCode: string;
  certificateUrl: string;
  courseName: string;
  finishedAt: string;
  imageUrl: string;
  startedAt: string;
}

export interface Formation {
  id: number;
  name: string;
  area: string;
  certificate: string;
  conclusion: string;
  materias: string[];
}

export interface Project {
  id: number;
  projectName: string;
  description: string;
  categoryLocal: string;
  typePerformance?: string; // Campo com possível espaço na API
  " typePerformance"?: string; // Campo com espaço extra da API
  imagesUrl: string[];
  technologiesUsed: string[];
  // Campos opcionais que podem ser adicionados futuramente na API
  linkGithub?: string;
  linkSite?: string;
}
