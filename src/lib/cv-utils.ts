import React from "react";
import { pdf } from "@react-pdf/renderer";
import { CVPDFDocument } from "@/components/cv/pdf-document";
import { CVData } from "@/types/cv";

/**
 * Gera e faz o download do currículo em formato PDF
 * @param data - Dados do currículo
 * @param filename - Nome do arquivo (opcional)
 * @returns Promise que resolve quando o download é iniciado
 */
export async function generateAndDownloadCV(
  data: CVData,
  filename: string = "Diogo_Luna_CV.pdf"
): Promise<void> {
  try {
    // Cria o documento PDF usando @react-pdf/renderer
    // @ts-ignore - Type mismatch between React 19 and @react-pdf/renderer
    const blob = await pdf(React.createElement(CVPDFDocument, { data })).toBlob();

    // Cria uma URL temporária para o blob
    const url = URL.createObjectURL(blob);

    // Cria um elemento <a> temporário para iniciar o download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    // Adiciona ao DOM, clica e remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Libera a URL do blob após um curto delay
    // para garantir que o download foi iniciado
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw new Error("Não foi possível gerar o PDF. Tente novamente.");
  }
}

/**
 * Gera o PDF e retorna o blob (útil para preview)
 * @param data - Dados do currículo
 * @returns Promise com o blob do PDF
 */
export async function generateCVBlob(data: CVData): Promise<Blob> {
  try {
    // @ts-ignore - Type mismatch between React 19 and @react-pdf/renderer
    const blob = await pdf(React.createElement(CVPDFDocument, { data })).toBlob();
    return blob;
  } catch (error) {
    console.error("Erro ao gerar PDF blob:", error);
    throw new Error("Não foi possível gerar o PDF.");
  }
}

/**
 * Formata uma data do formato YYYY-MM para texto legível
 * @param date - Data no formato YYYY-MM ou "present"
 * @param locale - Locale para formatação (padrão: pt-BR)
 * @returns Data formatada
 */
export function formatCVDate(
  date: string,
  locale: "pt-BR" | "en-US" = "pt-BR"
): string {
  if (date === "present") {
    return locale === "pt-BR" ? "Presente" : "Present";
  }

  if (date.includes("expected")) {
    const year = date.replace("expected ", "");
    return locale === "pt-BR" ? `Previsão ${year}` : `Expected ${year}`;
  }

  const [year, month] = date.split("-");
  
  if (!month) {
    return year;
  }

  const monthsPtBR = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  const monthsEnUS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const months = locale === "pt-BR" ? monthsPtBR : monthsEnUS;
  const monthIndex = parseInt(month) - 1;

  return `${months[monthIndex]} ${year}`;
}

/**
 * Calcula a duração entre duas datas
 * @param startDate - Data de início (YYYY-MM)
 * @param endDate - Data de fim (YYYY-MM ou "present")
 * @param locale - Locale para formatação (padrão: pt-BR)
 * @returns Duração formatada (ex: "2 anos e 3 meses")
 */
export function calculateDuration(
  startDate: string,
  endDate: string,
  locale: "pt-BR" | "en-US" = "pt-BR"
): string {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  
  let endYear: number;
  let endMonth: number;

  if (endDate === "present") {
    const now = new Date();
    endYear = now.getFullYear();
    endMonth = now.getMonth() + 1;
  } else {
    [endYear, endMonth] = endDate.split("-").map(Number);
  }

  let years = endYear - startYear;
  let months = endMonth - startMonth;

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts: string[] = [];

  if (years > 0) {
    if (locale === "pt-BR") {
      parts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
    } else {
      parts.push(`${years} ${years === 1 ? "year" : "years"}`);
    }
  }

  if (months > 0) {
    if (locale === "pt-BR") {
      parts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    } else {
      parts.push(`${months} ${months === 1 ? "month" : "months"}`);
    }
  }

  if (parts.length === 0) {
    return locale === "pt-BR" ? "Menos de 1 mês" : "Less than 1 month";
  }

  return parts.join(locale === "pt-BR" ? " e " : " and ");
}
