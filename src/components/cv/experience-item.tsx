"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CVExperience } from "@/types/cv";

interface ExperienceItemProps {
  experience: CVExperience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const formatDate = (date: string) => {
    if (date === "present") return "Presente";
    const [year, month] = date.split("-");
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-accent-500/30 transition-all">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 rounded-lg bg-accent-500/10 shrink-0">
                  <Briefcase className="w-5 h-5 text-accent-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-text-50 text-lg mb-1">
                    {experience.position}
                  </h3>
                  <p className="text-primary-400 font-semibold text-base">
                    {experience.company}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm text-text-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="font-mono">
                  {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                </span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Responsibilities */}
          {experience.responsibilities && experience.responsibilities.length > 0 && (
            <div className="mb-4">
              <h4 className="text-text-50 font-semibold text-sm mb-2">
                Responsabilidades:
              </h4>
              <ul className="space-y-2">
                {experience.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-text-400 text-sm">
                    <span className="text-accent-500 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-text-50 font-semibold text-sm mb-2">
                Conquistas:
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-primary-400 text-sm">
                    <span className="text-accent-500 mt-1">✓</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-background-800 text-text-400 border-0 text-xs"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
