import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import HowWeWork from "./components/HowWeWork";
import Portfolio from "./components/Portfolio";
import BudgetForm from "./components/BudgetForm";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export default function App() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [prefilledService, setPrefilledService] = useState("Reforma Residencial");

  // Coordinate smooth navigation and update state
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -80; // Navbar height offset
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // Pre-fill a requested service category and scroll down to the form
  const handleSelectServiceForBudget = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setTimeout(() => {
      handleNavigate("orcamento");
    }, 100);
  };

  // Scroll spy to highlight navbar items dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "inicio",
        "quem-somos",
        "servicos",
        "como-trabalhamos",
        "portfolio",
        "orcamento",
        "contato",
      ];
      
      const scrollPosition = window.scrollY + 120; // safe threshold

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-brand-primary selection:text-white">
      {/* Dynamic Header */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Structured Content Sections */}
      <main className="relative">
        <Hero onNavigate={handleNavigate} />
        
        <About />
        
        <Services onSelectServiceForBudget={handleSelectServiceForBudget} />
        
        <HowWeWork />
        
        <Portfolio onSelectProjectForBudget={handleSelectServiceForBudget} />
        
        <BudgetForm prefilledService={prefilledService} />
        
        <Contact />
      </main>

      {/* Dynamic Footer */}
      <Footer onNavigate={handleNavigate} />

      <FloatingWhatsApp />
    </div>
  );
}
