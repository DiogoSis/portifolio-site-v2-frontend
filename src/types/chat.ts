/**
 * Tipos compartilhados para o sistema de chat
 */

export interface DocumentSource {
  fileName: string;
  filePath: string;
  content: string;
  similarity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sources?: DocumentSource[];
  isStreaming?: boolean;
}

export interface ChatRequest {
  question: string;
  conversationId?: string;
}

export interface ChatResponse {
  answer: string;
  sources: DocumentSource[];
  conversationId: string;
  timestamp: number;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  conversationId: string | null;
}
