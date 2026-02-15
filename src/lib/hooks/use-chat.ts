'use client';

import { create } from 'zustand';
import type { ChatMessage, ChatState, DocumentSource } from '@/types/chat';

interface ChatActions {
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  setError: (error: string | null) => void;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

type ChatStore = ChatState & ChatActions & { isOpen: boolean };

/**
 * Hook Zustand para gerenciar estado do chat
 */
export const useChatStore = create<ChatStore>((set, get) => ({
  // Estado inicial
  messages: [],
  isLoading: false,
  error: null,
  conversationId: null,
  isOpen: false,

  // Ação: enviar mensagem
  sendMessage: async (message: string) => {
    const trimmedMessage = message.trim();
    
    if (!trimmedMessage) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedMessage,
      timestamp: Date.now(),
    };

    // Adiciona mensagem do usuário
    set((state) => ({
      messages: [...state.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    // Cria mensagem placeholder do assistant
    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    set((state) => ({
      messages: [...state.messages, assistantMessage],
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: trimmedMessage,
          conversationId: get().conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Atualiza mensagem do assistant com resposta completa
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: data.answer,
                sources: data.sources,
                isStreaming: false,
              }
            : msg
        ),
        conversationId: data.conversationId,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== assistantMessageId),
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      }));
    }
  },

  // Ação: limpar mensagens
  clearMessages: () => {
    set({
      messages: [],
      conversationId: null,
      error: null,
    });
  },

  // Ação: definir erro
  setError: (error: string | null) => {
    set({ error });
  },

  // Ação: abrir chat
  openChat: () => {
    set({ isOpen: true });
  },

  // Ação: fechar chat
  closeChat: () => {
    set({ isOpen: false });
  },

  // Ação: alternar chat
  toggleChat: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

/**
 * Hook público para usar o chat
 */
export function useChat() {
  const { 
    messages, 
    isLoading, 
    error, 
    isOpen, 
    sendMessage, 
    clearMessages, 
    setError,
    openChat,
    closeChat,
    toggleChat,
  } = useChatStore();

  return {
    messages,
    isLoading,
    error,
    isOpen,
    sendMessage,
    clearMessages,
    setError,
    openChat,
    closeChat,
    toggleChat,
  };
}
