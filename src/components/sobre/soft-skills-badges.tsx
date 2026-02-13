"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SoftSkillsBadgesProps {
  skills: string[];
}

export function SoftSkillsBadges({ skills }: SoftSkillsBadgesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap gap-2"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Badge
            variant="secondary"
            className="bg-background-800 text-text-300 border-border hover:bg-background-700 hover:text-accent-500 transition-colors cursor-default"
          >
            {skill}
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
}
