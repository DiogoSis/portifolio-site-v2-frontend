'use client';

import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative flex items-end gap-2 p-4 bg-background-900/80 backdrop-blur-md border-t border-background-800/50">
      {/* Textarea */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Pergunte algo sobre meu portfólio..."
        className="flex-1 px-4 py-3 bg-background-800/50 border border-background-700/50 rounded-2xl text-white placeholder-gray-500 resize-none focus:outline-none focus:border-accent-500/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        rows={1}
        style={{
          minHeight: '48px',
          maxHeight: '120px',
        }}
      />

      {/* Botão Enviar */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent-500 text-background-900 rounded-xl hover:bg-accent-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent-500"
      >
        <Send size={20} />
      </motion.button>
    </div>
  );
}
