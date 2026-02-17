"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CVCertification } from "@/types/cv";

interface CertificationItemProps {
  certification: CVCertification;
  index: number;
}

export function CertificationItem({ certification, index }: CertificationItemProps) {
  const formatDate = (date: string) => {
    const [year, month] = date.split("-");
    if (!month) return year;
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="bg-background-900 border-border hover:border-primary-400/30 transition-all">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-400/10 shrink-0">
              <Award className="w-4 h-4 text-primary-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h4 className="font-heading font-bold text-text-50 text-sm leading-tight">
                  {certification.name}
                </h4>
                {certification.category && (
                  <Badge
                    variant="secondary"
                    className="bg-primary-400/10 text-primary-400 border-0 text-xs shrink-0"
                  >
                    {certification.category}
                  </Badge>
                )}
              </div>
              
              <p className="text-text-400 text-xs mb-2">
                {certification.issuer}
              </p>
              
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1 text-text-400 text-xs">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono">{formatDate(certification.date)}</span>
                </div>
                
                {certification.expiryDate && (
                  <div className="text-xs text-text-400">
                    Expira: {formatDate(certification.expiryDate)}
                  </div>
                )}
              </div>

              {certification.credentialId && (
                <p className="text-text-400 text-xs font-mono mb-2">
                  ID: {certification.credentialId}
                </p>
              )}

              {certification.credentialUrl && (
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-primary-400 hover:text-primary-300 hover:bg-primary-400/10 h-auto py-1 px-0"
                >
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="text-xs">Ver credencial</span>
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
