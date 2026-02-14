"use client";

import { motion } from "framer-motion";
import { GraduationCap, ExternalLink, Calendar, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Formation as ApiFormation } from "@/lib/api-types";

// Interface adaptada para uso no componente
export interface Formation extends Omit<ApiFormation, 'id'> {
  id: string;
}

interface FormationCardProps {
  formation: Formation;
  index: number;
}

export function FormationCard({ formation, index }: FormationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-primary-400/30 transition-all h-full group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Icon */}
            <div className="p-2 sm:p-3 rounded-lg bg-primary-400/10 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Area Badge */}
              <Badge
                variant="secondary"
                className="mb-2 bg-primary-400/10 text-primary-400 border-0 text-xs"
              >
                {formation.area}
              </Badge>

              {/* Title */}
              <h3 className="font-heading font-bold text-text-50 text-base sm:text-lg mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                {formation.name}
              </h3>

              {/* Conclusion Date */}
              <p className="text-text-400 text-xs sm:text-sm mb-3 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Conclusão: {formation.conclusion}
              </p>

              {/* Subjects */}
              {formation.materias && formation.materias.length > 0 && (
                <div className="mb-4">
                  <p className="text-text-400 text-xs font-semibold mb-2 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    Matérias ({formation.materias.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {formation.materias.slice(0, 6).map((materia, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[10px] sm:text-xs text-text-400 border-border px-1.5 py-0.5"
                      >
                        {materia}
                      </Badge>
                    ))}
                    {formation.materias.length > 6 && (
                      <Badge
                        variant="outline"
                        className="text-[10px] sm:text-xs text-text-400 border-border px-1.5 py-0.5"
                      >
                        +{formation.materias.length - 6} mais
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Certificate Link */}
              {formation.certificate && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-primary-400 hover:text-primary-300 hover:bg-primary-400/10 p-0 h-auto"
                >
                  <a
                    href={formation.certificate}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Ver certificado
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
