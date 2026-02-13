"use client";

import { ProjectCard, Project } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
  onViewArchitecture?: (project: Project) => void;
}

export function ProjectGrid({ projects, onViewArchitecture }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          onViewArchitecture={onViewArchitecture}
        />
      ))}
    </div>
  );
}
