'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { User, Bot, FileText } from 'lucide-react';
import type { ChatMessage } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-accent-500/20 text-accent-500'
            : 'bg-background-800/50 text-accent-500'
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* Conteúdo */}
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl backdrop-blur-sm ${
            isUser
              ? 'bg-accent-500/10 text-white border border-accent-500/20'
              : 'bg-background-800/50 text-gray-200 border border-background-700/50'
          }`}
        >
          {message.isStreaming ? (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Pensando...</span>
            </div>
          ) : (
            <ReactMarkdown
              className="prose prose-invert prose-sm max-w-none prose-p:my-2 prose-code:text-accent-500"
              components={{
                p: ({ children }) => <p className="my-1">{children}</p>,
                code: ({ children }) => (
                  <code className="bg-background-900/50 px-1.5 py-0.5 rounded text-accent-500">
                    {children}
                  </code>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Fontes (se houver) */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.sources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background-800/30 border border-background-700/30 text-xs text-gray-400"
              >
                <FileText size={12} />
                <span>{source.fileName}</span>
                <span className="text-accent-500">
                  {Math.round(source.similarity * 100)}%
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <span className="text-xs text-gray-500 px-1">
          {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}
