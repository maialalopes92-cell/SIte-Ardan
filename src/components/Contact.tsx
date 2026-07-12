import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { FAQS, COMPANY_INFO } from "../data";

export default function Contact() {
  const [copiedText, setCopiedText] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactCards = [
    {
      icon: <Phone className="w-5 h-5 text-brand-primary" />,
      title: "Telefone & WhatsApp",
      value: COMPANY_INFO.phoneFormatted,
      copyValue: COMPANY_INFO.phoneRaw,
      actionLabel: "Chamar",
      isLink: true,
      href: COMPANY_INFO.whatsappLink,
    },
    {
      icon: <Mail className="w-5 h-5 text-brand-primary" />,
      title: "E-mail Geral",
      value: COMPANY_INFO.email,
      copyValue: COMPANY_INFO.email,
      actionLabel: "Copiar",
      isLink: false,
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand-primary" />,
      title: "Área de Atendimento",
      value: COMPANY_INFO.address,
      copyValue: COMPANY_INFO.address,
      actionLabel: "Ver Área",
      isLink: true,
      href: "https://maps.google.com/?q=São+Paulo+Brasil",
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-primary" />,
      title: "Horário de Trabalho",
      value: COMPANY_INFO.workingHours,
      copyValue: COMPANY_INFO.workingHours,
      actionLabel: "Copiar",
      isLink: false,
    },
  ];

  return (
    <section id="contato" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
            Canais de Atendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Fale Conosco
          </h2>
          <p className="text-slate-600 font-sans">
            Estamos prontos para atender você. Tire suas dúvidas, solicite visitas presenciais ou nos envie o projeto de seu arquiteto para cotação.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Contact Cards & Map Card */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-display font-bold text-slate-900">
              Informações de Contato
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="bg-brand-primary/10 p-2.5 rounded-xl w-fit">
                      {card.icon}
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-slate-400 font-bold uppercase tracking-wide">
                        {card.title}
                      </span>
                      <span className="block text-sm font-sans font-semibold text-slate-800 mt-1">
                        {card.value}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
                    {card.isLink ? (
                      <a
                        id={`contact-card-link-${idx}`}
                        href={card.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-bold text-brand-primary hover:text-brand-deep cursor-pointer"
                      >
                        <span>{card.actionLabel}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        id={`contact-card-copy-${idx}`}
                        onClick={() => copyToClipboard(card.copyValue, card.title)}
                        className="inline-flex items-center space-x-1 text-xs font-bold text-brand-primary hover:text-brand-deep cursor-pointer"
                      >
                        {copiedText === card.title ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-600">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <span>{card.actionLabel}</span>
                            <Copy className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Simulated interactive Map Card */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span className="text-sm font-bold text-slate-800 font-display">
                    Nossa Localização & Cobertura
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                  SÃO PAULO & ABC
                </span>
              </div>
              
              {/* Styled Mock Map Container */}
              <div className="relative h-44 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center text-center">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                  alt="Mapa de São Paulo"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px]" />
                
                {/* Pin accent */}
                <div className="relative z-10 space-y-2">
                  <div className="bg-brand-primary p-2.5 rounded-full shadow-lg text-white inline-block animate-bounce">
                    <MapPin className="w-5 h-5 fill-slate-950" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm py-1 px-3 rounded-lg shadow-md text-xs font-semibold text-slate-800 font-sans">
                    Atendemos toda a Capital, Grande ABC e Região Metropolitana!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ List */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-brand-primary" />
              <h3 className="text-xl font-display font-bold text-slate-900">
                Dúvidas Frequentes (FAQ)
              </h3>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm hover:border-slate-300 transition-colors duration-300"
                  >
                    <button
                      id={`faq-btn-${index}`}
                      onClick={() => toggleFaq(index)}
                      className="w-full text-left p-5 flex justify-between items-center font-display font-semibold text-slate-800 text-sm sm:text-base focus:outline-none cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-brand-primary flex-shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-4" />
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed border-t border-slate-50">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
