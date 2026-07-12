import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Trophy } from "lucide-react";
import { COMPANY_INFO } from "../data";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

const HERO_IMAGES = [
  {
    src: "/images/ardan-obra-estrutura.png",
    alt: "Equipe Grupo Ardan em obra estrutural",
  },
  {
    src: "/images/ardan-eletrica-quadro.png",
    alt: "Profissional Grupo Ardan executando instalação elétrica",
  },
  {
    src: "/images/ardan-split-instalacao.png",
    alt: "Profissional Grupo Ardan instalando ar-condicionado split",
  },
  {
    src: "/images/ardan-condensadora-manutencao.png",
    alt: "Profissional Grupo Ardan fazendo manutenção em condensadora",
  },
  {
    src: "/images/ardan-assentamento-piso.png",
    alt: "Profissional Grupo Ardan assentando piso",
  },
  {
    src: "/images/ardan-drywall-instalacao.png",
    alt: "Profissional Grupo Ardan instalando drywall",
  },
];

export default function Hero({ onNavigate }: HeroProps) {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const imageTimer = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % HERO_IMAGES.length);
    }, 4200);

    return () => window.clearInterval(imageTimer);
  }, []);

  return (
    <section
      id="inicio"
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 bg-gradient-to-b from-slate-50 via-slate-100 to-white overflow-hidden"
    >
      {/* Decorative Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none hidden lg:block">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#334155" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-brand-primary/10 text-brand-deep px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase border border-brand-primary/20"
            >
              <Trophy className="w-3.5 h-3.5 text-brand-primary" />
              <span>Solução Completa da Alvenaria ao Acabamento</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight leading-[1.1]"
            >
              Construção e reforma com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
                soluções completas
              </span>{" "}
              para sua obra
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed"
            >
              {COMPANY_INFO.subTagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-orcamento-btn"
                onClick={() => onNavigate("orcamento")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Solicitar Orçamento</span>
                <ArrowUpRight className="w-4 h-4 text-brand-primary" />
              </button>

              <button
                id="hero-servicos-btn"
                onClick={() => onNavigate("servicos")}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-4 rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Conhecer Serviços</span>
              </button>
            </motion.div>

            {/* Slogan Complementary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-4 flex items-center justify-center lg:justify-start space-x-2 text-sm font-medium text-slate-700"
            >
              <CheckCircle2 className="w-5 h-5 text-brand-primary flex-shrink-0" />
              <span className="italic">{COMPANY_INFO.slogan}</span>
            </motion.div>
          </div>

          {/* Visual Showcase (Obra Real mock / high quality construction image) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
            >
              <div className="relative h-[320px] sm:h-[400px]">
                {HERO_IMAGES.map((image, index) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                      index === activeImage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />

              <div className="absolute top-4 right-4 flex gap-1.5">
                {HERO_IMAGES.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    aria-label={`Mostrar imagem ${index + 1}`}
                    onClick={() => setActiveImage(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeImage
                        ? "w-6 bg-white"
                        : "w-2 bg-white/60 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

              {/* Float Quality Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 flex items-center space-x-3">
                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">
                    Garantia e Segurança
                  </span>
                  <span className="block text-xs text-slate-600 font-sans">
                    Obra limpa, organizada e com seguro total.
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div id="hero-stats" className="mt-16 lg:mt-24 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y-2 sm:divide-y-0 lg:divide-x divide-slate-100">
            {COMPANY_INFO.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`pt-4 sm:pt-0 lg:px-6 text-center ${
                  idx === 0 ? "pt-0" : ""
                }`}
              >
                <span className="block text-3xl sm:text-4xl font-display font-extrabold text-slate-900">
                  {stat.value}
                </span>
                <span className="block mt-1 text-xs sm:text-sm font-medium text-slate-500 font-sans">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
