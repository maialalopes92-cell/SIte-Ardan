import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { COMPANY_INFO } from "../data";

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: "Início" },
    { id: "quem-somos", label: "Quem Somos" },
    { id: "servicos", label: "Serviços" },
    { id: "como-trabalhamos", label: "Como Trabalhamos" },
    { id: "portfolio", label: "Serviços em Destaque" },
    { id: "orcamento", label: "Solicite um Orçamento" },
    { id: "contato", label: "Contato" },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="navbar-container"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick("inicio")}
            className="flex items-center text-left group"
            aria-label="Ir para o início"
          >
            <img
              src="/logo-grupo-ardan.svg"
              alt={COMPANY_INFO.name}
              className="h-16 w-auto max-w-[218px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-20 sm:max-w-[270px] lg:h-18 lg:max-w-[250px]"
            />
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                id={`desktop-nav-${item.id}`}
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-brand-primary font-semibold"
                    : scrolled
                    ? "text-slate-600 hover:text-brand-primary"
                    : "text-slate-800 hover:text-brand-primary lg:text-slate-700 lg:hover:text-brand-primary"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA Button */}
          <div className="hidden sm:block">
            <a
              id="desktop-whatsapp-cta"
              href={COMPANY_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm px-4 py-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${
                scrolled ? "text-slate-700" : "text-slate-900"
              } hover:text-brand-primary focus:outline-none transition-colors`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        className={`lg:hidden fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-white shadow-xl flex flex-col justify-between py-6 px-6 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "100%", height: "calc(100vh - 100%)" }}
      >
        <div className="flex flex-col space-y-4 mt-4">
          {navItems.map((item) => (
            <button
              id={`mobile-nav-${item.id}`}
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-left py-2 px-3 rounded-lg text-base font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-slate-100 text-brand-primary font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-brand-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          <a
            id="mobile-whatsapp-cta"
            href={COMPANY_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl shadow-md transition-colors"
          >
            <Phone className="w-5 h-5 fill-white" />
            <span>Chamar no WhatsApp</span>
          </a>
          <div className="text-center text-xs text-slate-500 font-mono">
            Atendimento Rápido e Seguro
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          id="mobile-drawer-overlay"
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          style={{ top: "100%" }}
        />
      )}
    </nav>
  );
}
