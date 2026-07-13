import { Instagram, Facebook, ArrowUp, Phone, Mail, MapPin } from "lucide-react";
import { COMPANY_INFO } from "../data";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    onNavigate("inicio");
  };

  return (
    <footer className="bg-brand-950 text-white pt-16 pb-8 relative overflow-hidden border-t border-slate-800">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="#ffffff" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand block (Cols: 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex rounded-lg bg-white p-3 shadow-sm">
              <img
                src="/logo-grupo-ardan.svg"
                alt={COMPANY_INFO.name}
                className="h-24 w-auto max-w-[300px] object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              Mão de obra especializada em construção, reformas, instalações e acabamentos. Cuidamos da execução com transparência, capricho e respeito aos prazos combinados.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                id="footer-social-instagram"
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-brand-primary hover:text-white p-2.5 rounded-full text-slate-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                id="footer-social-facebook"
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-brand-primary hover:text-white p-2.5 rounded-full text-slate-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links block (Cols: 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Links Rápidos
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300 font-sans">
              <li>
                <button
                  id="footer-link-inicio"
                  onClick={() => onNavigate("inicio")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Início
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate("quem-somos")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Quem Somos
                </button>
              </li>
              <li>
                <button
                  id="footer-link-services"
                  onClick={() => onNavigate("servicos")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button
                  id="footer-link-how"
                  onClick={() => onNavigate("como-trabalhamos")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Como Trabalhamos
                </button>
              </li>
              <li>
                <button
                  id="footer-link-portfolio"
                  onClick={() => onNavigate("portfolio")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Portfólio
                </button>
              </li>
              <li>
                <button
                  id="footer-link-budget"
                  onClick={() => onNavigate("orcamento")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Orçamento
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate("contato")}
                  className="hover:text-brand-primary transition-colors text-left"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details summary block (Cols: 5) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Contato & Cobertura
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-300 font-sans">
              <li className="flex items-start space-x-2.5">
                <Phone className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <a
                  id="footer-contact-phone"
                  href={COMPANY_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-primary transition-colors"
                >
                  {COMPANY_INFO.phoneFormatted} (Atendimento via WhatsApp)
                </a>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span className="break-all">{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom credits & scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div>
            <span>© {currentYear} {COMPANY_INFO.name}. Todos os direitos reservados. </span>
            <span className="block sm:inline mt-1 sm:mt-0 text-slate-600 font-mono">
              CNPJ: 44.863.123/0001-21
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              id="footer-scroll-top-btn"
              onClick={handleScrollTop}
              className="bg-slate-900 hover:bg-brand-primary hover:text-white p-2.5 rounded-xl text-slate-400 transition-all border border-slate-800 hover:border-brand-primary cursor-pointer flex items-center space-x-1 font-semibold"
              aria-label="Voltar para o topo"
            >
              <span>Voltar ao Topo</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
