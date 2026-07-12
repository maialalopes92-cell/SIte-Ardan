import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Eye,
  FileText,
  Calendar,
  Hammer,
  CheckCircle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { PROCESS_STEPS } from "../data";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  const getIcon = (name: string, isActive: boolean) => {
    const className = `w-7 h-7 transition-colors duration-300 ${
      isActive ? "text-slate-950" : "text-slate-500"
    }`;
    switch (name) {
      case "Eye":
        return <Eye className={className} />;
      case "FileText":
        return <FileText className={className} />;
      case "Calendar":
        return <Calendar className={className} />;
      case "Hammer":
        return <Hammer className={className} />;
      case "CheckCircle":
        return <CheckCircle className={className} />;
      default:
        return <Eye className={className} />;
    }
  };

  return (
    <section id="como-trabalhamos" className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl opacity-40 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
            Metodologia
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Como Trabalhamos
          </h2>
          <p className="text-slate-600 font-sans">
            Criamos uma jornada estruturada e livre de estresse para você acompanhar sua construção ou reforma com clareza e previsibilidade total.
          </p>
        </div>

        {/* Stepper Header (Desktop view) */}
        <div className="hidden md:flex justify-between items-center relative mb-12 max-w-5xl mx-auto">
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-100 -translate-y-1/2 z-0" />
          <div
            className="absolute left-0 top-1/2 h-1 bg-brand-primary -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
          />

          {/* Steps buttons */}
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            const isCompleted = idx < activeStep;

            return (
              <button
                id={`step-indicator-${step.number}`}
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none`}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20"
                      : isCompleted
                      ? "bg-brand-primary/20 border-brand-primary text-brand-deep"
                      : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                  }`}
                >
                  <span className="text-lg font-bold font-display">
                    {step.number}
                  </span>
                </div>
                <span
                  className={`mt-3 text-xs font-semibold tracking-tight transition-colors duration-300 ${
                    isActive
                      ? "text-slate-900 font-bold"
                      : "text-slate-500 group-hover:text-slate-800"
                  }`}
                >
                  {step.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile View Indicators (Compact row) */}
        <div className="flex md:hidden justify-between items-center mb-8 max-w-sm mx-auto">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                id={`step-indicator-mobile-${step.number}`}
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold border ${
                  isActive
                    ? "bg-brand-primary border-brand-primary text-white scale-110 shadow-md"
                    : "bg-slate-50 border-slate-200 text-slate-400"
                }`}
              >
                {step.number}
              </button>
            );
          })}
        </div>

        {/* Detailed Interactive Step Panel */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 md:p-12 shadow-md border border-slate-100 max-w-5xl mx-auto min-h-[300px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-12 gap-8 items-center w-full"
            >
              {/* Icon & Visual Label */}
              <div className="md:col-span-4 flex flex-col items-center text-center md:items-start md:text-left space-y-4">
                <div className="bg-brand-primary/10 p-5 rounded-2xl text-slate-950 shadow-inner inline-block">
                  {getIcon(PROCESS_STEPS[activeStep].iconName, true)}
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                    Etapa {PROCESS_STEPS[activeStep].number} de 5
                  </span>
                  <h4 className="text-xl font-bold font-display text-slate-900 leading-tight">
                    {PROCESS_STEPS[activeStep].title}
                  </h4>
                  <span className="text-xs font-semibold text-brand-primary bg-brand-primary/10 px-2.5 py-1 rounded-full inline-block mt-2 font-sans">
                    {PROCESS_STEPS[activeStep].subtitle}
                  </span>
                </div>
              </div>

              {/* Description Copy */}
              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                {/* Micro highlights per step */}
                <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-2 text-slate-500 text-xs font-sans">
                    <ShieldAlert className="w-4 h-4 text-emerald-500" />
                    <span>Execução organizada, limpa e acompanhada</span>
                  </div>
                  
                  {activeStep < PROCESS_STEPS.length - 1 ? (
                    <button
                      id="step-next-btn"
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="inline-flex items-center space-x-1 text-xs font-bold text-brand-primary hover:text-brand-deep transition-colors cursor-pointer"
                    >
                      <span>Ver Próxima Etapa</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600">
                      Metodologia focada na sua satisfação!
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
