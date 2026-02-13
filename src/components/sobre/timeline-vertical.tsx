"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

export interface TimelineItem {
  id: string;
  periodo: string;
  cargo: string;
  empresa: string;
  foco: string;
  tipo: "work" | "education";
  isCurrent?: boolean;
}

interface TimelineVerticalProps {
  items: TimelineItem[];
}

export function TimelineVertical({ items }: TimelineVerticalProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background-950 border-2 border-accent-500 -translate-x-1/2 z-10">
              {item.isCurrent && (
                <div className="absolute inset-0 rounded-full bg-accent-500 animate-pulse-glow" />
              )}
            </div>

            {/* Content */}
            <div
              className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                index % 2 === 0 ? "md:text-right" : ""
              }`}
            >
              <div
                className={`p-6 rounded-lg bg-background-900 border border-border hover:border-accent-500/30 transition-all ${
                  item.isCurrent ? "border-accent-500/50" : ""
                }`}
              >
                {/* Header */}
                <div
                  className={`flex items-center gap-2 mb-2 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      item.tipo === "work"
                        ? "bg-accent-500/10 text-accent-500"
                        : "bg-primary-400/10 text-primary-400"
                    }`}
                  >
                    {item.tipo === "work" ? (
                      <Briefcase className="w-4 h-4" />
                    ) : (
                      <GraduationCap className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-text-400 text-sm font-mono">
                    {item.periodo}
                  </span>
                  {item.isCurrent && (
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-500">
                      Atual
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-text-50 text-lg mb-1">
                  {item.cargo}
                </h3>
                <p className="text-primary-400 text-sm font-medium mb-2">
                  {item.empresa}
                </p>

                {/* Description */}
                <p className="text-text-400 text-sm">{item.foco}</p>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-[calc(50%-2rem)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
