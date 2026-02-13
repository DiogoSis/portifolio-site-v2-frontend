"use client";

import { motion } from "framer-motion";
import { Activity, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CurrentFocusCardProps {
  title?: string;
  description?: string;
  status?: "active" | "planning" | "completed";
}

export function CurrentFocusCard({
  title = "Migração Cloud Native",
  description = "Migrando serviços legacy para arquitetura serverless na AWS com foco em escalabilidade e redução de custos.",
  status = "active",
}: CurrentFocusCardProps) {
  const statusConfig = {
    active: {
      label: "Em progresso",
      color: "text-accent-500",
      bgColor: "bg-accent-500/10",
      icon: Activity,
    },
    planning: {
      label: "Planejando",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      icon: Clock,
    },
    completed: {
      label: "Concluído",
      color: "text-primary-400",
      bgColor: "bg-primary-400/10",
      icon: Activity,
    },
  };

  const { label, color, bgColor, icon: StatusIcon } = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-background-900 border-border hover:border-accent-500/30 transition-all">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <StatusIcon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-heading font-bold text-text-50">{title}</h3>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${bgColor} ${color}`}
                >
                  {label}
                </span>
              </div>
              <p className="text-text-400 text-sm">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
