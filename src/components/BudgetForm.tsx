import { useState, useEffect, useRef, ChangeEvent, DragEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FileUp,
  Send,
  Trash2,
  CheckCircle2,
  Phone,
  Sparkles,
  Loader2,
  Info,
} from "lucide-react";
import { COMPANY_INFO } from "../data";
import { createBudgetRequest } from "../lib/supabase";
import { sendBudgetEmail } from "../lib/email";

interface BudgetFormProps {
  prefilledService: string;
}

export default function BudgetForm({ prefilledService }: BudgetFormProps) {
  const [serviceType, setServiceType] = useState(prefilledService || "Reforma Residencial");
  const [area, setArea] = useState<number>(80);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prefilledService) {
      setServiceType(prefilledService);
    }
  }, [prefilledService]);

  const serviceOptions = [
    "Alvenaria",
    "Reforma Residencial",
    "Reforma Comercial",
    "Instalações",
    "Instalação de Ar-Condicionado",
    "Manutenção Preventiva & Corretiva",
    "Acabamentos",
    "Gesso & Drywall",
    "Outro",
  ];

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files: File[]) => {
    // Only accept image or PDF files up to 10MB
    const validFiles = files.filter((file) => {
      const isValidType =
        file.type.startsWith("image/") || file.type === "application/pdf";
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      return isValidType && isValidSize;
    });

    setUploadedFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Generate pre-formatted message for WhatsApp
  const generateWhatsAppText = () => {
    const formattedDesc = description ? `\n- Detalhes: ${description}` : "";
    const formattedFiles =
      uploadedFiles.length > 0
        ? `\n- Anexos enviados: ${uploadedFiles.length} foto(s)/planta(s)`
        : "";
    return `Olá Grupo Ardan! Encontrei o site e gostaria de solicitar um orçamento.
- Serviço desejado: ${serviceType}
- Área aproximada: ${area} m²
- Local da obra: ${location || "Não informado"}
- Nome do cliente: ${name}${formattedDesc}${formattedFiles}
- Contato: ${phone || "Não informado"} (E-mail: ${email || "Não informado"})`;
  };

  const generateWhatsAppMessage = () => {
    return `https://wa.me/${COMPANY_INFO.phoneRaw.replace(/\D/g, "")}?text=${encodeURIComponent(generateWhatsAppText())}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Por favor, informe seu Nome e Telefone para contato.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const budgetRequest = await createBudgetRequest({
        serviceType,
        estimatedAreaM2: area,
        location,
        clientName: name,
        clientEmail: email,
        clientPhone: phone,
        description,
        whatsappMessage: generateWhatsAppText(),
        files: uploadedFiles,
      });

      try {
        await sendBudgetEmail({
          requestId: budgetRequest.id,
          serviceType,
          estimatedAreaM2: area,
          location,
          clientName: name,
          clientEmail: email,
          clientPhone: phone,
          description,
          whatsappMessage: generateWhatsAppText(),
          files: uploadedFiles,
        });
      } catch (emailError) {
        console.warn("Solicitação salva, mas o email não foi enviado.", emailError);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar sua solicitação agora."
      );
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setDescription("");
    setLocation("");
    setUploadedFiles([]);
    setSubmitError("");
    setIsSubmitted(false);
  };

  return (
    <section id="orcamento" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono tracking-wider uppercase text-brand-primary font-bold">
            Cotação Online
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Solicite um Orçamento
          </h2>
          <p className="text-slate-600 font-sans">
            Preencha os dados abaixo para receber uma estimativa ou agendar sua visita técnica gratuita. É simples, rápido e sem compromisso.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Form container */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="budget-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Service Selector Grid */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-800 font-display">
                      Qual serviço você precisa?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {serviceOptions.map((opt) => (
                        <button
                          id={`service-opt-${opt.toLowerCase().replace(/\s/g, "-")}`}
                          key={opt}
                          type="button"
                          onClick={() => setServiceType(opt)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all duration-300 text-center ${
                            serviceType === opt
                              ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                              : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-950"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Range Slider for Metragem */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                      <label className="font-display">Área estimada da obra/reforma</label>
                      <span className="text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full font-mono text-xs">
                        {area} m²
                      </span>
                    </div>
                    <input
                      id="budget-area-slider"
                      type="range"
                      min="10"
                      max="500"
                      step="5"
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Mín: 10m² (Banheiro/Varanda)</span>
                      <span>Méd: 150m²</span>
                      <span>Máx: 500m²+</span>
                    </div>
                  </div>

                  {/* Form fields layout */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Location field */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Cidade / Bairro (Atendemos SP e ABC)
                      </label>
                      <input
                        id="budget-location-input"
                        type="text"
                        placeholder="Ex: Vila Mariana, São Paulo"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-slate-400 transition-colors"
                      />
                    </div>

                    {/* Client Name field */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Seu Nome *
                      </label>
                      <input
                        id="budget-name-input"
                        type="text"
                        required
                        placeholder="Ex: João Silva"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-slate-400 transition-colors"
                      />
                    </div>

                    {/* Contact Phone field */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        WhatsApp / Celular *
                      </label>
                      <input
                        id="budget-phone-input"
                        type="tel"
                        required
                        placeholder="Ex: (11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-slate-400 transition-colors"
                      />
                    </div>

                    {/* Contact Email field */}
                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        E-mail de contato
                      </label>
                      <input
                        id="budget-email-input"
                        type="email"
                        placeholder="Ex: joao@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-slate-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Scope details */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Descrição rápida das necessidades (Opcional)
                    </label>
                    <textarea
                      id="budget-desc-textarea"
                      rows={3}
                      placeholder="Ex: Preciso nivelar o piso da varanda para integrar com a sala, assentar porcelanato de 90x90cm e refazer a elétrica com novas tomadas."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-sm focus:outline-none focus:border-slate-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Drag and drop File Upload */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Anexe plantas, projetos ou fotos do local (Opcional)
                    </label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
                        isDragOver
                          ? "border-brand-primary bg-brand-primary/5 scale-[1.01]"
                          : "border-slate-200 bg-slate-50 hover:bg-slate-100/70"
                      }`}
                    >
                      <input
                        id="budget-file-input"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        accept="image/*,application/pdf"
                        className="hidden"
                      />
                      <FileUp className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <span className="block text-sm font-semibold text-slate-700">
                        Arraste arquivos aqui ou clique para selecionar
                      </span>
                      <span className="block text-xs text-slate-400 mt-1">
                        Formatos aceitos: JPG, PNG, PDF (Máx 10MB por arquivo)
                      </span>
                    </div>

                    {/* Previews */}
                    {uploadedFiles.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        {uploadedFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl flex items-center justify-between text-xs"
                          >
                            <span className="font-mono text-slate-600 truncate max-w-[150px]">
                              {file.name}
                            </span>
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] text-slate-400 font-mono">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </span>
                              <button
                                id={`remove-file-${idx}`}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(idx);
                                }}
                                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-slate-100"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      Não conseguimos salvar sua solicitação agora. Confira as permissões de envio no Supabase e tente novamente.
                      <span className="block pt-1 text-xs text-red-500">{submitError}</span>
                    </div>
                  )}

                  {/* Submission buttons row */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      id="budget-submit-email"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-600 text-white font-bold py-3.5 px-6 rounded-xl shadow-md cursor-pointer transition-all w-full sm:flex-1"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processando Proposta...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Enviar Dados do Orçamento</span>
                        </>
                      )}
                    </button>

                    <a
                      id="budget-submit-whatsapp"
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors w-full sm:flex-1 text-center"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Falar via WhatsApp</span>
                    </a>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="budget-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-emerald-50 border border-emerald-200/50 rounded-3xl p-8 text-center space-y-6"
                >
                  <div className="bg-emerald-100 p-4 rounded-full text-emerald-600 inline-block">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-slate-900">
                      Pedido Recebido com Sucesso!
                    </h3>
                    <p className="text-sm text-slate-600 font-sans max-w-md mx-auto">
                      Obrigado pelo contato, <strong>{name}</strong>! Seus detalhes de orçamento para <strong>{serviceType}</strong> foram enviados à nossa equipe de atendimento.
                    </p>
                  </div>
                  <div className="p-4 bg-white/80 rounded-2xl border border-emerald-100 max-w-sm mx-auto text-left space-y-2 text-xs text-slate-500 font-sans">
                    <span className="block font-bold text-slate-700">Resumo da Solicitação:</span>
                    <span className="block">• Serviço: {serviceType}</span>
                    <span className="block">• Área: {area}m²</span>
                    <span className="block">• Localização: {location || "Não especificado"}</span>
                    {uploadedFiles.length > 0 && (
                      <span className="block">• Plantas anexadas: {uploadedFiles.length}</span>
                    )}
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      id="success-whatsapp-link"
                      href={generateWhatsAppMessage()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl transition-colors"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Agilizar no WhatsApp</span>
                    </a>
                    <button
                      id="success-new-quote"
                      onClick={resetForm}
                      className="text-slate-600 hover:text-slate-900 font-semibold text-sm py-3 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      Fazer Outra Solicitação
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quotation draft card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-brand-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6">
                <div className="flex items-center space-x-2 text-brand-primary font-mono text-xs uppercase tracking-wider font-bold">
                  <Sparkles className="w-4 h-4" />
                  <span>Rascunho do Pedido</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Serviço Escolhido
                    </span>
                    <span className="block text-lg font-display font-semibold text-white mt-0.5">
                      {serviceType}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Área da Obra
                    </span>
                    <span className="block text-lg font-display font-semibold text-brand-primary mt-0.5">
                      {area} m²
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Local de Atendimento
                    </span>
                    <span className="block text-sm font-sans text-slate-200 mt-0.5">
                      {location || "Informe no formulário"}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                      Seus Contatos
                    </span>
                    <div className="space-y-0.5 mt-0.5 text-xs text-slate-300 font-sans">
                      <span className="block truncate">Nome: {name || "---"}</span>
                      <span className="block">Tel: {phone || "---"}</span>
                      <span className="block truncate">Email: {email || "---"}</span>
                    </div>
                  </div>
                </div>

                {/* Estimate guideline indicator */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <div className="flex items-start space-x-2 text-xs text-slate-400 font-sans bg-slate-900/55 p-3 rounded-xl border border-slate-800">
                    <Info className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-300">Visita técnica inclusa:</span>
                      <span className="block">Ao enviar o formulário, combinaremos uma visita gratuita para conferir o local, entender o serviço e orientar o próximo passo.</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Grupo Ardan • Mão de Obra Especializada
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
