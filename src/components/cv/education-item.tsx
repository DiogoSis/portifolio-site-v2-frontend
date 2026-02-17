"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CVEducation } from "@/types/cv";

interface EducationItemProps {
  education: CVEducation;
  index: number;
}

export function EducationItem({ education, index }: EducationItemProps) {
  const formatDate = (date: string) => {
    if (date.includes("expected")) return date.replace("expected ", "Previsão ");
    if (date === "present") return "Presente";
    const [year, month] = date.split("-");
    if (!month) return year;
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-primary-400/30 transition-all">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary-400/10 shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-text-50 text-lg mb-1">
                    {education.degree}
                  </h3>
                  <p className="text-primary-400 font-semibold text-base mb-1">
                    {education.field}
                  </p>
                  <p className="text-text-400 text-sm">
                    {education.institution}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-text-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-mono">
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </span>
              </div>
              {education.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{education.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* GPA */}
          {education.gpa && (
            <div className="mb-3">
              <Badge variant="secondary" className="bg-primary-400/10 text-primary-400 border-0">
                GPA: {education.gpa}
              </Badge>
            </div>
          )}

          {/* Highlights */}
          {education.highlights && education.highlights.length > 0 && (
            <ul className="space-y-2">
              {education.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-text-400 text-sm">
                  <span className="text-primary-400 mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
