import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "../data";

export default function FloatingWhatsApp() {
  return (
    <a
      id="floating-whatsapp"
      href={COMPANY_INFO.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Grupo Ardan pelo WhatsApp"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-white shadow-2xl shadow-emerald-900/25 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-300 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-500/40 animate-ping" />
      <MessageCircle className="h-6 w-6 fill-white" />
      <span className="hidden text-sm font-bold sm:inline">WhatsApp</span>
    </a>
  );
}
