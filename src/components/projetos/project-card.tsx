"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project as ApiProject } from "@/lib/api-types";

// Interface adaptada para uso no componente
export interface Project extends Omit<ApiProject, 'id'> {
  id: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewArchitecture?: (project: Project) => void;
}

export function ProjectCard({
  project,
  index,
  onViewArchitecture,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-accent-500/30 transition-all h-full flex flex-col group">
        {/* Project Image/Preview */}
        {project.imagesUrl && project.imagesUrl.length > 0 && (
          <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-background-900/80" />
            <img
              src={project.imagesUrl[0]}
              alt={project.projectName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <CardContent className="p-4 sm:p-6 flex-1">
          {/* Focus Badge */}
          <Badge
            variant="secondary"
            className="mb-4 bg-accent-500/10 text-accent-500 border-0"
          >
            {project.categoryLocal}
          </Badge>

          {/* Title & Description */}
          <h3 className="font-heading font-bold text-text-50 text-lg sm:text-xl mb-2 group-hover:text-accent-500 transition-colors">
            {project.projectName}
          </h3>
          {(project.typePerformance || project[" typePerformance" as keyof typeof project]) && (
            <p className="text-text-400 text-xs sm:text-sm mb-2">
              <span className="text-accent-500 font-medium">
                {project.typePerformance || project[" typePerformance" as keyof typeof project]}
              </span>
            </p>
          )}
          <p className="text-text-400 text-xs sm:text-sm mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologiesUsed.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-[10px] sm:text-xs text-text-400 border-border px-1.5 py-0.5"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-6 pt-0 flex flex-wrap gap-2">
          {/* View Architecture Button */}
          {project.imagesUrl && project.imagesUrl.length > 0 && (
            <Button
              variant="default"
              size="sm"
              className="bg-accent-500 text-background-950 hover:bg-accent-400 hover:glow-accent text-xs sm:text-sm"
              onClick={() => onViewArchitecture?.(project)}
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden xs:inline">Ver </span>Imagens
            </Button>
          )}

          {/* Future: Adicionar linkSite e linkGithub na API se necessário */}
          {project.linkGithub && (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-text-400 hover:text-text-50 hover:bg-background-800 text-xs sm:text-sm"
            >
              <a
                href={project.linkGithub}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                GitHub
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
