import { Certificate, Formation, Project } from "./api-types";

const BASE_URL = 
  process.env.NEXT_PUBLIC_API_BASE_URL || 
  "https://ofqpkinf8j.execute-api.us-east-1.amazonaws.com";

const API_SITE_KEY = process.env.NEXT_PUBLIC_API_SITE_KEY || "";

class ApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string = BASE_URL, apiKey: string = API_SITE_KEY) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    
    // Debug: log para verificar se a API key está sendo carregada
    if (typeof window !== 'undefined') {
      console.log('🔑 API Key carregada:', this.apiKey ? '✅ Sim' : '❌ Não');
      console.log('🌐 Base URL:', this.baseUrl);
    }
  }

  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Adiciona x-api-key se disponível
      if (this.apiKey) {
        headers["x-api-key"] = this.apiKey;
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "GET",
        headers,
        // Adiciona cache control para Next.js
        next: { revalidate: 3600 }, // Revalida a cada 1 hora
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const result = await response.json();
      
      // A API retorna { data: [...] } então precisamos extrair o data
      return result.data || result;
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Busca todos os certificados
   */
  async getCertificates(): Promise<Certificate[]> {
    return this.fetchData<Certificate[]>("/certificates");
  }

  /**
   * Busca um certificado específico por ID
   */
  async getCertificateById(id: number): Promise<Certificate> {
    return this.fetchData<Certificate>(`/certificates/${id}`);
  }

  /**
   * Busca todas as formações
   */
  async getFormations(): Promise<Formation[]> {
    return this.fetchData<Formation[]>("/formations");
  }

  /**
   * Busca uma formação específica por ID
   */
  async getFormationById(id: number): Promise<Formation> {
    return this.fetchData<Formation>(`/formations/${id}`);
  }

  /**
   * Busca todos os projetos
   */
  async getProjects(): Promise<Project[]> {
    return this.fetchData<Project[]>("/projects");
  }

  /**
   * Busca um projeto específico por ID
   */
  async getProjectById(id: number): Promise<Project> {
    return this.fetchData<Project>(`/projects/${id}`);
  }
}

// Exporta uma instância singleton do serviço
export const apiService = new ApiService();
