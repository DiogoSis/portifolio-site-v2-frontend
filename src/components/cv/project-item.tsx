"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CVProject } from "@/types/cv";

interface ProjectItemProps {
  project: CVProject;
  index: number;
}

export function ProjectItem({ project, index }: ProjectItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-background-900 border-border hover:border-accent-500/30 transition-all h-full">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 rounded-lg bg-accent-500/10 shrink-0">
              <FolderGit2 className="w-5 h-5 text-accent-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-text-50 text-base sm:text-lg mb-1">
                {project.name}
              </h3>
              {project.role && (
                <p className="text-primary-400 text-sm font-medium mb-2">
                  {project.role}
                </p>
              )}
            </div>
          </div>

          <p className="text-text-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="space-y-1 mb-4">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-text-400 text-xs">
                  <span className="text-accent-500 mt-0.5">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, idx) => (
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

          {/* Links */}
          <div className="flex flex-wrap gap-2">
            {project.repository && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-accent-500 hover:text-accent-400 hover:bg-accent-500/10 h-auto py-1 px-2"
              >
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  <span className="text-xs">Código</span>
                </a>
              </Button>
            )}
            {project.url && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-primary-400 hover:text-primary-300 hover:bg-primary-400/10 h-auto py-1 px-2"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-xs">Ver site</span>
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
