'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Trash2 } from 'lucide-react';
import { useChat } from '@/lib/hooks/use-chat';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatInterface({ isOpen, onClose }: ChatInterfaceProps) {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-4 right-4 w-full max-w-md h-[600px] bg-background-900/95 backdrop-blur-xl border border-background-800/50 rounded-3xl shadow-2xl flex flex-col z-50 lg:bottom-8 lg:right-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-background-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-accent-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Chat do Portfólio</h3>
                  <p className="text-xs text-gray-400">Pergunte sobre mim</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearMessages}
                    className="p-2 text-gray-400 hover:text-accent-500 transition-colors"
                    title="Limpar conversa"
                  >
                    <Trash2 size={18} />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-accent-500/10 flex items-center justify-center mb-4">
                    <MessageCircle size={32} className="text-accent-500" />
                  </div>
                  <h4 className="text-white font-medium mb-2">
                    Olá! Como posso ajudar?
                  </h4>
                  <p className="text-sm text-gray-400 mb-6">
                    Pergunte sobre minha experiência, projetos, stack tecnológica ou
                    qualquer coisa relacionada ao meu portfólio.
                  </p>

                  {/* Sugestões */}
                  <div className="space-y-2 w-full">
                    <button
                      onClick={() => sendMessage('Qual é sua experiência profissional?')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-300 bg-background-800/50 hover:bg-background-800 border border-background-700/50 hover:border-accent-500/30 rounded-xl transition-colors"
                    >
                      Qual é sua experiência profissional?
                    </button>
                    <button
                      onClick={() => sendMessage('Quais tecnologias você domina?')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-300 bg-background-800/50 hover:bg-background-800 border border-background-700/50 hover:border-accent-500/30 rounded-xl transition-colors"
                    >
                      Quais tecnologias você domina?
                    </button>
                    <button
                      onClick={() => sendMessage('Me conte sobre seus projetos recentes')}
                      className="w-full px-4 py-2 text-sm text-left text-gray-300 bg-background-800/50 hover:bg-background-800 border border-background-700/50 hover:border-accent-500/30 rounded-xl transition-colors"
                    >
                      Me conte sobre seus projetos recentes
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
