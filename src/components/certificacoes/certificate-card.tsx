"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, GraduationCap, Cloud, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Certificate as ApiCertificate } from "@/lib/api-types";

// Interface adaptada para uso no componente
export interface Certificate extends Omit<ApiCertificate, 'id'> {
  id: string;
}

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
}

const categoryConfig: Record<string, {
  label: string;
  icon: any;
  color: string;
  bgColor: string;
}> = {
  Cloud: {
    label: "Cloud",
    icon: Cloud,
    color: "text-accent-500",
    bgColor: "bg-accent-500/10",
  },
  Dev: {
    label: "Desenvolvimento",
    icon: Code,
    color: "text-accent-600",
    bgColor: "bg-accent-600/10",
  },
  Academico: {
    label: "Acadêmico",
    icon: GraduationCap,
    color: "text-primary-400",
    bgColor: "bg-primary-400/10",
  },
  // Fallback padrão
  default: {
    label: "Certificação",
    icon: Award,
    color: "text-text-400",
    bgColor: "bg-text-400/10",
  },
};

export function CertificateCard({ certificate, index }: CertificateCardProps) {
  const config = categoryConfig[certificate.categoryCode] || categoryConfig.default;
  const { label, icon: CategoryIcon, color, bgColor } = config;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-accent-500/30 transition-all h-full group">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Badge/Icon */}
            <div className={`p-2 sm:p-3 rounded-lg ${bgColor} shrink-0`}>
              {certificate.imageUrl ? (
                <img
                  src={certificate.imageUrl}
                  alt={certificate.courseName}
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                />
              ) : (
                <Award className={`w-5 h-5 sm:w-6 sm:h-6 ${color}`} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              {/* Category Badge */}
              <Badge
                variant="secondary"
                className={`mb-2 ${bgColor} ${color} border-0 text-xs`}
              >
                <CategoryIcon className="w-3 h-3 mr-1" />
                {label}
              </Badge>

              {/* Title */}
              <h3 className="font-heading font-bold text-text-50 text-base sm:text-lg mb-1 group-hover:text-accent-500 transition-colors line-clamp-2">
                {certificate.courseName}
              </h3>

              {/* Date Range */}
              <p className="text-text-400 text-xs sm:text-sm mb-2">
                {certificate.startedAt} - {certificate.finishedAt}
              </p>

              {/* Date */}
              <p className="text-text-400 text-xs font-mono hidden sm:block">
                Concluído em {certificate.finishedAt}
              </p>

              {/* Credential Link */}
              {certificate.certificateUrl && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-accent-500 hover:text-accent-400 hover:bg-accent-500/10 p-0 h-auto"
                >
                  <a
                    href={certificate.certificateUrl}
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
