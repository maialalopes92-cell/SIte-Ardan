import { motion } from "motion/react";
import { Check, Shield, Users, Clock, Flame } from "lucide-react";
import { COMPANY_INFO } from "../data";

export default function About() {
  const values = [
    {
      icon: <Shield className="w-5 h-5 text-brand-primary" />,
      title: "Organização e Limpeza",
      desc: "Prezamos por um canteiro organizado de verdade. Protegemos elevadores, portas, pisos e limpamos o local diariamente.",
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-primary" />,
      title: "Cumprimento de Prazos",
      desc: "Trabalhamos com cronogramas realistas e atualizados semanalmente. Você recebe relatórios constantes por fotos e vídeos.",
    },
    {
      icon: <Users className="w-5 h-5 text-brand-primary" />,
      title: "Equipe Sob Supervisão",
      desc: "Nossos profissionais são experientes, treinados, uniformizados e trabalham sob a coordenação direta do nosso mestre de obras.",
    },
    {
      icon: <Flame className="w-5 h-5 text-brand-primary" />,
      title: "Transparência nos Custos",
      desc: "Garantimos um orçamento detalhado por escrito. Sem sustos, sem reajustes imprevistos e com justificativas para cada item.",
    },
  ];

  return (
    <section id="quem-somos" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src="/images/hvac-split-installation.png"
                    alt="Profissional instalando ar-condicionado split"
                    className="rounded-xl object-cover h-48 w-full shadow-md"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80"
                    alt="Medição e Planejamento"
                    className="rounded-xl object-cover h-64 w-full shadow-md"
                  />
                </motion.div>
              </div>
              <div className="space-y-4 pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80"
                    alt="Acabamentos de Obra"
                    className="rounded-xl object-cover h-64 w-full shadow-md"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80"
                    alt="Sala decorada"
                    className="rounded-xl object-cover h-48 w-full shadow-md"
                  />
                </motion.div>
              </div>
            </div>

            {/* Decorative background circle */}
            <div className="absolute -z-10 -left-6 -bottom-6 w-48 h-48 bg-brand-primary/5 rounded-full" />
          </div>

          {/* Text content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
                Sobre Nós
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
                Construindo sonhos com rigor técnico, pontualidade e transparência
              </h2>
            </div>

            <p className="text-slate-600 font-sans leading-relaxed">
              O <strong>Grupo Ardan</strong> nasceu com o propósito de redefinir o mercado de construção civil e reformas. Sabemos que uma obra pode ser sinônimo de estresse, por isso, estruturamos nossos processos para oferecer a você total paz de espírito.
            </p>
            
            <p className="text-slate-600 font-sans leading-relaxed">
              Diferente de equipes informais, atuamos com planejamento físico detalhado, controle de qualidade rígido e comunicação fluida. Reunimos sob o mesmo teto eletricistas, encanadores, gesseiros, pintores e pedreiros especializados, proporcionando soluções realmente integradas e de fino acabamento.
            </p>

            {/* Core Values Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {values.map((val, idx) => (
                <div key={idx} className="flex space-x-3 items-start">
                  <div className="bg-brand-primary/10 p-2 rounded-lg text-brand-deep flex-shrink-0 mt-0.5">
                    {val.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 font-display">
                      {val.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-sans leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
