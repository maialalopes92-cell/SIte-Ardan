import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Maximize2,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

interface PortfolioProps {
  onSelectProjectForBudget: (projectTitle: string) => void;
}

export default function Portfolio({ onSelectProjectForBudget }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ["Todos", "Alvenaria", "Instalações", "Acabamentos", "Drywall", "Ar-condicionado", "Manutenção"];

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === "Todos") return true;
    return proj.category === activeFilter;
  });

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
  };

  const handleQuoteClick = (title: string) => {
    setSelectedProject(null);
    onSelectProjectForBudget(title);
  };

  return (
    <section id="portfolio" className="py-20 lg:py-28 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
            Frentes de Atendimento
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Serviços em Destaque
          </h2>
          <p className="text-slate-600 font-sans">
            Enquanto o portfólio real é atualizado com obras autorizadas pelos clientes, reunimos aqui as principais frentes de serviço que o Grupo Ardan atende com mão de obra especializada.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto">
          {categories.map((cat) => (
            <button
              id={`portfolio-filter-${cat.toLowerCase()}`}
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full"
              >
                {/* Thumbnail */}
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" />
                  
                  {/* Floating tags */}
                  <span className="absolute top-4 left-4 bg-slate-900/95 backdrop-blur-sm text-brand-primary text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1.5 rounded-full shadow-md">
                    {project.category}
                  </span>

                  <button
                    id={`portfolio-zoom-btn-${project.id}`}
                    onClick={() => handleProjectSelect(project)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl text-slate-900 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 cursor-pointer hover:bg-white"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Content body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-400 text-xs font-mono space-x-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{project.location}</span>
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900 leading-snug group-hover:text-brand-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400">ESCOPO</span>
                      <span className="block text-slate-800">{project.area}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono text-slate-400">PRAZO</span>
                      <span className="block text-slate-800">{project.duration}</span>
                    </div>
                    <button
                      id={`portfolio-details-trigger-${project.id}`}
                      onClick={() => handleProjectSelect(project)}
                      className="text-brand-primary hover:text-brand-deep inline-flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Ver detalhes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox / Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 border border-slate-100"
            >
              <button
                id="portfolio-modal-close"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 bg-slate-900/60 hover:bg-slate-900/80 text-white p-2.5 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-12">
                {/* Image Section */}
                <div className="md:col-span-6 relative h-64 md:h-auto bg-slate-950">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10 pointer-events-none" />
                </div>

                {/* Info Content Section */}
                <div className="md:col-span-6 p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-bold bg-brand-primary/10 px-2.5 py-1 rounded-full">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-slate-900 mt-3">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-2 font-sans leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Metragem / Local info */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-slate-100">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                        Atendimento
                      </span>
                      <span className="block text-xs font-semibold text-slate-700 font-sans mt-0.5 truncate">
                        {selectedProject.location}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                        Escopo
                      </span>
                      <span className="block text-xs font-semibold text-slate-700 font-sans mt-0.5">
                        {selectedProject.area}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                        Prazo
                      </span>
                      <span className="block text-xs font-semibold text-slate-700 font-sans mt-0.5">
                        {selectedProject.duration}
                      </span>
                    </div>
                  </div>

                  {/* Details highlights */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
                      <span>O que pode incluir</span>
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-600 font-sans">
                      {selectedProject.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-brand-primary font-bold mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      id="portfolio-similar-quote-btn"
                      onClick={() => handleQuoteClick(selectedProject.title)}
                      className="w-full inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-5 py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
                    >
                      <span>Solicitar Orçamento</span>
                      <ArrowRight className="w-4 h-4 text-brand-primary" />
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
