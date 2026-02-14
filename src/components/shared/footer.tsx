import Link from "next/link";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/DiogoSis",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/diogosis",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:diogodeassis777@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/certificacoes", label: "Certificações" },
  { href: "/setup", label: "Setup" },
  { href: "/status", label: "Status" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background-950 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-accent-500 font-mono text-lg">{">"}</span>
              <span className="font-heading font-bold text-lg text-text-50 group-hover:text-accent-500 transition-colors">
                diogo.luna
              </span>
              <span className="text-accent-500 animate-cursor-blink">_</span>
            </Link>
            <p className="text-text-400 text-sm max-w-xs">
              Tech Lead & Software Engineer. Construindo infraestrutura escalável
              e sistemas resilientes.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-text-50 mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-400 text-sm hover:text-accent-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-text-50 mb-4">
              Contato
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-400 hover:text-accent-500 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Style Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Terminal Command */}
            <div className="font-mono text-sm text-text-400 flex items-center gap-2">
              <span className="text-accent-500">diogo@server</span>
              <span className="text-text-700">:</span>
              <span className="text-primary-400">~</span>
              <span className="text-text-700">$</span>
              <span className="ml-1">exit</span>
              <span className="text-accent-500 animate-cursor-blink">▋</span>
            </div>

            {/* Copyright */}
            <p className="text-text-400 text-sm flex items-center gap-1">
              © {currentYear} Diogo Luna. Feito com
              <Heart className="w-4 h-4 text-accent-500 fill-accent-500" />
              no Brasil.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
