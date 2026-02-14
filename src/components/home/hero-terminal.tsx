"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { prompt: "$ ", text: "whoami", delay: 0 },
  { prompt: "", text: "Diogo Luna - Tech Lead & Software Engineer", delay: 1.5 },
  { prompt: "$ ", text: "cat skills.txt", delay: 3 },
  {
    prompt: "",
    text: "Node.js | React | Docker | AWS | Linux | Python",
    delay: 4.5,
  },
  { prompt: "$ ", text: "echo $CURRENT_FOCUS", delay: 6 },
  { prompt: "", text: "Migrando serviços legacy para arquitetura Cloud Native", delay: 7.5 },
];

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    const line = terminalLines[visibleLines];
    const fullText = line.prompt + line.text;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setCurrentText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setVisibleLines((prev) => prev + 1);
          setCurrentText("");
        }, 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-2xl"
    >
      {/* Terminal Header */}
      <div className="bg-background-900 rounded-t-lg px-4 py-3 flex items-center gap-2 border border-border border-b-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-text-400 text-sm font-mono ml-2">
          diogo@portfolio:~
        </span>
      </div>

      {/* Terminal Body */}
      <div className="bg-background-950 rounded-b-lg p-4 border border-border border-t-0 font-mono text-sm min-h-[200px]">
        {/* Already typed lines */}
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <div key={index} className="mb-1">
            <span className="text-accent-500">{line.prompt}</span>
            <span className={line.prompt ? "text-text-50" : "text-text-400"}>
              {line.text}
            </span>
          </div>
        ))}

        {/* Currently typing line */}
        {visibleLines < terminalLines.length && (
          <div className="flex items-center">
            <span className="text-accent-500">
              {currentText.startsWith("$") ? "" : terminalLines[visibleLines].prompt}
            </span>
            <span className={terminalLines[visibleLines].prompt ? "text-text-50" : "text-text-400"}>
              {currentText.replace(terminalLines[visibleLines].prompt, "")}
            </span>
            <span className="text-accent-500 animate-cursor-blink ml-0.5">▋</span>
          </div>
        )}

        {/* Final cursor */}
        {!isTyping && (
          <div className="flex items-center mt-1">
            <span className="text-accent-500">$ </span>
            <span className="text-accent-500 animate-cursor-blink">▋</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
