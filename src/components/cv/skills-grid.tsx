"use client";

import { motion } from "framer-motion";
import { Code, Globe, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CVSkills } from "@/types/cv";

interface SkillsGridProps {
  skills: CVSkills;
}

const categoryIcons: Record<string, any> = {
  Frontend: Code,
  Backend: Code,
  "Cloud & DevOps": Globe,
  "Ferramentas & Metodologias": Lightbulb,
};

const proficiencyColors: Record<string, string> = {
  Native: "bg-accent-500/20 text-accent-500 border-accent-500/30",
  Fluent: "bg-primary-400/20 text-primary-400 border-primary-400/30",
  Advanced: "bg-primary-400/20 text-primary-400 border-primary-400/30",
  Intermediate: "bg-text-400/20 text-text-400 border-text-400/30",
  Basic: "bg-text-400/10 text-text-400 border-text-400/20",
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <div className="space-y-6">
      {/* Technical Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skills.technical.map((category, idx) => {
          const Icon = categoryIcons[category.category] || Code;
          
          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card className="bg-background-900 border-border h-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-accent-500/10">
                      <Icon className="w-5 h-5 text-accent-500" />
                    </div>
                    <h3 className="font-heading font-bold text-text-50 text-base">
                      {category.category}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item, itemIdx) => (
                      <Badge
                        key={itemIdx}
                        variant="secondary"
                        className="bg-background-800 text-text-400 border-0 text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Languages */}
      {skills.languages && skills.languages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="bg-background-900 border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-400/10">
                  <Globe className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="font-heading font-bold text-text-50 text-base">
                  Idiomas
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {skills.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-background-800 px-3 py-2 rounded-lg"
                  >
                    <span className="text-text-50 font-semibold text-sm">
                      {lang.language}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-xs ${proficiencyColors[lang.proficiency] || proficiencyColors.Basic}`}
                    >
                      {lang.proficiency}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Soft Skills */}
      {skills.soft && skills.soft.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="bg-background-900 border-border">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-500/10">
                  <Lightbulb className="w-5 h-5 text-accent-500" />
                </div>
                <h3 className="font-heading font-bold text-text-50 text-base">
                  Soft Skills
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-accent-500/10 text-accent-500 border-0 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
