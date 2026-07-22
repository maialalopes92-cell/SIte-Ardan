import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Hammer,
  Home,
  Briefcase,
  Zap,
  Sparkles,
  Layers,
  Snowflake,
  Sun,
  Wrench,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { SERVICES, SERVICE_PAGES } from "../data";
import { Service } from "../types";

interface ServicesProps {
  onSelectServiceForBudget: (serviceTitle: string) => void;
}

export default function Services({ onSelectServiceForBudget }: ServicesProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const getIcon = (name: string) => {
    const className = "w-6 h-6";
    switch (name) {
      case "Hammer":
        return <Hammer className={className} />;
      case "Home":
        return <Home className={className} />;
      case "Briefcase":
        return <Briefcase className={className} />;
      case "Zap":
        return <Zap className={className} />;
      case "Sun":
        return <Sun className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "Layers":
        return <Layers className={className} />;
      case "Snowflake":
        return <Snowflake className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      default:
        return <Hammer className={className} />;
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  const handleRequestQuote = (title: string) => {
    setSelectedService(null);
    onSelectServiceForBudget(title);
  };

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
            Especialidades
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Nossos Serviços
          </h2>
          <p className="text-slate-600 font-sans">
            Dominamos etapas de obra, reforma e instalações técnicas. Reunimos profissionais qualificados sob coordenação organizada para entregar qualidade do começo ao fim.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const servicePages = SERVICE_PAGES.filter((page) => page.serviceId === service.id);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col justify-between group"
              >
                <div>
                  {/* Image placeholder wrapper */}
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-6 bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-xl text-brand-primary shadow-md">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-slate-500 font-sans leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id={`services-more-btn-${service.id}`}
                    onClick={() => handleServiceSelect(service)}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-primary hover:text-brand-deep transition-colors group/btn cursor-pointer"
                  >
                    <span>Saiba mais detalhes</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {servicePages.slice(0, service.id === "instalacoes" ? 2 : 1).map((page) => (
                    <a
                      key={page.path}
                      href={page.path}
                      className="inline-flex items-center rounded-full border border-brand-primary/20 px-3 py-1.5 text-xs font-bold text-brand-dark transition hover:border-brand-primary hover:text-brand-primary"
                    >
                      {service.id === "instalacoes" ? page.shortName : "Ver página"}
                    </a>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Banner CTA */}
        <div className="mt-16 bg-brand-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 mix-blend-overlay">
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-brand-primary rounded-full blur-3xl" />
          </div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-xs font-mono tracking-wider uppercase text-brand-secondary font-bold">
              Diferencial Grupo Ardan
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              Procurando um serviço sob medida que não encontrou aqui?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Trabalhamos com mão de obra especializada para demandas específicas de construção, reforma, instalações, energia solar e acabamentos. Conte com uma equipe prática, organizada e pronta para executar o serviço com qualidade.
            </p>
            <button
              id="services-custom-cta-btn"
              onClick={() => handleRequestQuote("Outro Serviço Customizado")}
              className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              <span>Solicitar Orçamento Personalizado</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Details Dialog Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border border-slate-100"
            >
              {/* Header Close button */}
              <button
                id="service-modal-close"
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Banner inside modal */}
              <div className="relative h-48 sm:h-64 bg-slate-100">
                <img
                  src={selectedService.imageUrl}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white flex items-center space-x-4">
                  <div className="bg-brand-primary p-3 rounded-xl text-white shadow-md">
                    {getIcon(selectedService.iconName)}
                  </div>
                  <div>
                    <span className="text-xs font-mono tracking-wider uppercase text-brand-accent font-bold">
                      Especialidade Técnica
                    </span>
                    <h3 className="text-xl sm:text-2xl font-display font-bold">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                    Descrição do Serviço
                  </h4>
                  <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                    {selectedService.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
                    O que está incluído no escopo padrão:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2 text-sm text-slate-600 font-sans"
                      >
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="block text-xs font-mono text-slate-400">
                      Cote este serviço agora
                    </span>
                    <span className="block text-sm font-semibold text-slate-700">
                      Envie os detalhes da sua metragem
                    </span>
                  </div>
                  
                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      id="modal-budget-cta"
                      onClick={() => handleRequestQuote(selectedService.title)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      <span>Solicitar Orçamento</span>
                      <ArrowRight className="w-4 h-4 text-brand-primary" />
                    </button>
                    
                    <button
                      id="modal-back-btn"
                      onClick={() => setSelectedService(null)}
                      className="flex-1 sm:flex-none text-slate-500 hover:text-slate-700 font-semibold text-sm px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      Voltar
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
