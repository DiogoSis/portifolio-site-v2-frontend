// @ts-nocheck
/* eslint-disable */
/**
 * Componente PDF para geração de currículo ATS-friendly
 * @ts-nocheck usado devido a incompatibilidades de tipo conhecidas entre @react-pdf/renderer e React 19
 */
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Registrar fontes com suporte UTF-8 para caracteres portugueses (ã, ç, ê, õ, etc.)
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

// Estilos ATS-friendly com hierarquia clara e contraste alto
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Roboto",
    fontWeight: 400,
    lineHeight: 1.4,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  
  // Header
  header: {
    marginBottom: 16,
    borderBottom: "2pt solid #000000",
    paddingBottom: 10,
  },
  
  name: {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 10,
  },
  
  title: {
    fontSize: 13,
    fontWeight: 400,
    color: "#333333",
    marginBottom: 10,
  },
  
  contactInfo: {
    marginTop: 8,
    marginBottom: 6,
  },
  
  contactItem: {
    fontSize: 9,
    marginBottom: 2,
  },
  
  contactLabel: {
    fontWeight: 700,
  },
  
  links: {
    marginTop: 4,
  },
  
  link: {
    fontSize: 9,
    color: "#0066CC",
    textDecoration: "none",
    marginBottom: 2,
  },
  
  linkLabel: {
    fontWeight: 700,
  },
  
  // Sections
  section: {
    marginTop: 10,
    marginBottom: 8,
  },
  
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #000000",
    paddingBottom: 3,
    marginBottom: 6,
  },
  
  // Summary
  summary: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 4,
  },
  
  // Experience
  experienceItem: {
    marginBottom: 10,
  },
  
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  
  positionCompany: {
    flex: 1,
  },
  
  position: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  
  company: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 2,
  },
  
  dateLocation: {
    fontSize: 9,
    color: "#666666",
    textAlign: "right",
  },
  
  bulletList: {
    marginTop: 4,
    marginLeft: 12,
  },
  
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  
  bullet: {
    width: 10,
    fontSize: 10,
  },
  
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  
  // Education
  educationItem: {
    marginBottom: 8,
  },
  
  degree: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 2,
  },
  
  institution: {
    fontSize: 10,
    color: "#333333",
  },
  
  // Skills
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  
  skillCategory: {
    marginBottom: 8,
    width: "48%",
  },
  
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 3,
  },
  
  skillsList: {
    fontSize: 9,
    lineHeight: 1.4,
  },
  
  // Projects
  projectItem: {
    marginBottom: 10,
  },
  
  projectName: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 2,
  },
  
  projectDescription: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 3,
  },
  
  projectTech: {
    fontSize: 8,
    color: "#666666",
    marginTop: 2,
  },
  
  // Certifications
  certificationItem: {
    marginBottom: 6,
  },
  
  certificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  
  certificationInfo: {
    flex: 1,
    paddingRight: 10,
  },
  
  certificationName: {
    fontSize: 9,
    fontWeight: 700,
    marginBottom: 1,
  },
  
  certificationIssuer: {
    fontSize: 8,
    color: "#666666",
    lineHeight: 1.3,
  },
  
  certificationDate: {
    fontSize: 8,
    color: "#666666",
    minWidth: 70,
    textAlign: "right",
  },
  
  // Achievements
  achievementItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  
  achievementBullet: {
    width: 10,
    fontSize: 10,
  },
  
  achievementText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  
  // Additional Knowledge
  additionalKnowledgeItem: {
    fontSize: 9,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  
  // Soft Skills
  softSkillItem: {
    fontSize: 9,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  
  // Languages
  languagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 6,
  },
  
  languageItem: {
    fontSize: 9,
  },
  
  languageName: {
    fontWeight: 700,
  },
});

interface PDFDocumentProps {
  data: CVData;
}

export function CVPDFDocument({ data }: PDFDocumentProps) {
  const formatDate = (date: string) => {
    if (date === "present") return "Presente";
    if (date.includes("expected")) return date.replace("expected ", "Previsão ");
    const [year, month] = date.split("-");
    if (!month) return year;
    const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];
    return `${months[parseInt(month) - 1]}/${year}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.title}>{data.personalInfo.title}</Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email: </Text>
              {data.personalInfo.email}
            </Text>
            <Text style={styles.contactItem}>
              <Text style={styles.contactLabel}>Telefone: </Text>
              {data.personalInfo.phone}
            </Text>
            {data.personalInfo.location.street && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Endereço: </Text>
                {data.personalInfo.location.street}, {data.personalInfo.location.city} / {data.personalInfo.location.zipCode} - {data.personalInfo.location.state}
              </Text>
            )}
            {data.personalInfo.links.linkedin && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>LinkedIn: </Text>
                <Link src={data.personalInfo.links.linkedin}>
                  {data.personalInfo.links.linkedin.replace('https://', '').replace('http://', '').replace('www.', '')}
                </Link>
              </Text>
            )}
            {data.personalInfo.links.github && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>GitHub: </Text>
                <Link src={data.personalInfo.links.github}>
                  {data.personalInfo.links.github.replace('https://', '').replace('http://', '').replace('www.', '')}
                </Link>
              </Text>
            )}
            {data.personalInfo.links.portfolio && (
              <Text style={styles.contactItem}>
                <Text style={styles.contactLabel}>Site: </Text>
                <Link src={data.personalInfo.links.portfolio}>
                  {data.personalInfo.links.portfolio.replace('https://', '').replace('http://', '').replace('www.', '')}
                </Link>
              </Text>
            )}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo Profissional</Text>
          <Text style={styles.summary}>{data.summary.text}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experiência Profissional</Text>
          {data.experience.map((exp) => (
            <View key={exp.id} style={styles.experienceItem}>
              <View style={styles.experienceHeader}>
                <View style={styles.positionCompany}>
                  <Text style={styles.position}>{exp.position}</Text>
                  <Text style={styles.company}>{exp.company}</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </Text>
                  {exp.location && <Text>{exp.location}</Text>}
                </View>
              </View>
              
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <View style={styles.bulletList}>
                  {exp.responsibilities.map((resp, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>{resp}</Text>
                    </View>
                  ))}
                </View>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <View style={styles.bulletList}>
                  {exp.achievements.map((achievement, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bullet}>✓</Text>
                      <Text style={styles.bulletText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.educationItem}>
              <View style={styles.experienceHeader}>
                <View style={styles.positionCompany}>
                  <Text style={styles.degree}>
                    {edu.degree} - {edu.field}
                  </Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                </View>
                <View style={styles.dateLocation}>
                  <Text>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </Text>
                  {edu.location && <Text>{edu.location}</Text>}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Certifications */}
        {data.preferences.includeCertifications && 
         data.certifications.items.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificações e Cursos</Text>
            {data.certifications.items
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
              })
              .slice(0, data.preferences.maxCertificationsCount || 14)
              .map((cert) => (
                <View key={cert.id} style={styles.certificationItem}>
                  <View style={styles.certificationHeader}>
                    <View style={styles.certificationInfo}>
                      <Text style={styles.certificationName}>{cert.name}</Text>
                      <Text style={styles.certificationIssuer}>
                        {cert.issuer}
                        {cert.credentialId && ` • ID: ${cert.credentialId}`}
                      </Text>
                    </View>
                    <Text style={styles.certificationDate}>
                      {formatDate(cert.date)}
                    </Text>
                  </View>
                </View>
              ))}
          </View>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Realizações</Text>
            {data.achievements.map((achievement, idx) => (
              <View key={idx} style={styles.achievementItem}>
                <Text style={styles.achievementBullet}>•</Text>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades Técnicas</Text>
          <View style={styles.skillsGrid}>
            {data.skills.technical.map((category) => (
              <View key={category.category} style={styles.skillCategory}>
                <Text style={styles.skillCategoryTitle}>{category.category}:</Text>
                <Text style={styles.skillsList}>{category.items.join(", ")}</Text>
              </View>
            ))}
          </View>
          
          {data.skills.languages && data.skills.languages.length > 0 && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.skillCategoryTitle}>Idiomas:</Text>
              <View style={styles.languagesContainer}>
                {data.skills.languages.map((lang, idx) => (
                  <Text key={idx} style={styles.languageItem}>
                    <Text style={styles.languageName}>{lang.language}</Text> - {lang.proficiency}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Additional Knowledge */}
        {data.additionalKnowledge && data.additionalKnowledge.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conhecimentos Extras</Text>
            {data.additionalKnowledge.map((knowledge, idx) => (
              <Text key={idx} style={styles.additionalKnowledgeItem}>
                • {knowledge}
              </Text>
            ))}
          </View>
        )}

        {/* Soft Skills */}
        {data.skills.soft && data.skills.soft.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades Comportamentais</Text>
            {data.skills.soft.map((skill, idx) => (
              <Text key={idx} style={styles.softSkillItem}>
                • {skill}
              </Text>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
