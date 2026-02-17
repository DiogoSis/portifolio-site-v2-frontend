"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CVSectionProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  delay?: number;
}

export function CVSection({ title, children, icon, delay = 0 }: CVSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-8 sm:mb-12"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6 pb-2 border-b border-border">
        {icon && <div className="text-accent-500">{icon}</div>}
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-text-50 uppercase">
          {title}
        </h2>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {children}
      </div>
    </motion.section>
  );
}
