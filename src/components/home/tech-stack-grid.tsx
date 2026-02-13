"use client";

import { motion } from "framer-motion";
import {
  SiNodedotjs,
  SiReact,
  SiDocker,
  SiAmazonwebservices,
  SiLinux,
  SiPython,
  SiTypescript,
  SiPostgresql,
  SiGit,
  SiKubernetes,
  SiTerraform,
  SiNginx,
} from "react-icons/si";

const technologies = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
  { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export function TechStackGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading font-bold text-3xl text-text-50 mb-4">
            Tech Stack
          </h2>
          <p className="text-text-400 max-w-2xl mx-auto">
            Ferramentas e tecnologias que utilizo para construir sistemas
            escaláveis e resilientes.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-4xl mx-auto"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background-900 border border-border hover:border-accent-500/50 transition-all group cursor-pointer"
            >
              <tech.icon
                className="w-10 h-10 transition-colors"
                style={{ color: tech.color }}
              />
              <span className="text-text-400 text-xs font-medium group-hover:text-text-50 transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
