'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { ChatInterface } from './chat-interface';
import { useChat } from '@/lib/hooks/use-chat';

/**
 * Botão flutuante para abrir o chat
 * Posição fixa no canto inferior direito
 */
export function ChatBubble() {
  const { isOpen, toggleChat, closeChat } = useChat();

  return (
    <>
      {/* Botão Flutuante */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 w-14 h-14 bg-accent-500 hover:bg-accent-400 text-background-900 rounded-full shadow-2xl flex items-center justify-center transition-colors z-50"
        aria-label="Abrir chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de notificação (opcional) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background-900 rounded-full"
          />
        )}
      </motion.button>

      {/* Interface do Chat */}
      <ChatInterface isOpen={isOpen} onClose={closeChat} />
    </>
  );
}
