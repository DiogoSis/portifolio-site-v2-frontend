/**
 * Tipos para o sistema de chat RAG
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  sources?: DocumentSource[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface DocumentSource {
  fileName: string;
  filePath: string;
  content: string;
  similarity: number;
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

export interface ChatActions {
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  setError: (error: string | null) => void;
}

export type ChatStore = ChatState & ChatActions;
