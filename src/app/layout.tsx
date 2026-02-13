import type { Metadata } from "next";
import { Inter, Noto_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diogo Luna | Tech Lead & DevOps Engineer",
  description:
    "Engenharia de Software & DevOps. Construindo infraestrutura escalável e sistemas resilientes.",
  keywords: [
    "Tech Lead",
    "DevOps",
    "Software Engineer",
    "AWS",
    "Docker",
    "Node.js",
    "React",
  ],
  authors: [{ name: "Diogo Luna" }],
  openGraph: {
    title: "Diogo Luna | Tech Lead & DevOps Engineer",
    description:
      "Engenharia de Software & DevOps. Construindo infraestrutura escalável e sistemas resilientes.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${notoSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
