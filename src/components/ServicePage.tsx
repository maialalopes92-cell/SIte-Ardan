import { useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
} from "lucide-react";
import Navbar from "./Navbar";
import BudgetForm from "./BudgetForm";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import { COMPANY_INFO } from "../data";
import { ServicePage as ServicePageType } from "../types";

interface ServicePageProps {
  page: ServicePageType;
}

const SITE_URL = "https://grupoardan.com.br";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
}

export default function ServicePage({ page }: ServicePageProps) {
  const canonicalUrl = `${SITE_URL}${page.path}`;
  const absoluteImage = page.imageUrl.startsWith("http")
    ? page.imageUrl
    : `${SITE_URL}${page.imageUrl}`;
  const whatsappText = encodeURIComponent(
    `Olá Grupo Ardan! Vim pela página de ${page.shortName} e gostaria de solicitar um orçamento.`
  );
  const whatsappHref = `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${whatsappText}`;

  useEffect(() => {
    document.title = page.title;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: page.metaDescription,
    });
    upsertMeta('meta[name="keywords"]', {
      name: "keywords",
      content: page.keywords.join(", "),
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: page.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: page.metaDescription,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: absoluteImage,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: page.title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: page.metaDescription,
    });
    upsertCanonical(canonicalUrl);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "HomeAndConstructionBusiness",
          "@id": `${SITE_URL}/#empresa`,
          name: "Grupo Ardan",
          url: SITE_URL,
          telephone: COMPANY_INFO.phone,
          email: COMPANY_INFO.email,
          image: `${SITE_URL}/logo.png`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          areaServed: [
            "São Paulo",
            "Grande ABC",
            "Região Metropolitana de São Paulo",
          ],
        },
        {
          "@type": "Service",
          "@id": `${canonicalUrl}#servico`,
          name: page.h1,
          serviceType: page.shortName,
          description: page.metaDescription,
          url: canonicalUrl,
          provider: {
            "@id": `${SITE_URL}/#empresa`,
          },
          areaServed: [
            "São Paulo",
            "Grande ABC",
            "Região Metropolitana de São Paulo",
          ],
        },
        {
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#perguntas`,
          mainEntity: page.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Início",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: page.shortName,
              item: canonicalUrl,
            },
          ],
        },
      ],
    };

    document.getElementById("service-page-schema")?.remove();
    const script = document.createElement("script");
    script.id = "service-page-schema";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.getElementById("service-page-schema")?.remove();
    };
  }, [absoluteImage, canonicalUrl, page]);

  const handleNavigate = (sectionId: string) => {
    window.location.href = sectionId === "inicio" ? "/" : `/#${sectionId}`;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-950 selection:bg-brand-primary selection:text-white">
      <Navbar activeSection="servicos" onNavigate={handleNavigate} />

      <main>
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
          <div className="absolute inset-0 bg-grid opacity-70" aria-hidden="true" />
          <div className="container relative mx-auto px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                  <Search className="h-4 w-4" />
                  Serviço especializado
                </span>

                <h1 className="max-w-4xl text-4xl font-black leading-tight text-brand-dark md:text-5xl lg:text-6xl">
                  {page.h1}
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
                  {page.intro}
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#orcamento-servico"
                    className="inline-flex items-center justify-center gap-3 rounded-lg bg-brand-dark px-7 py-4 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-brand-primary"
                  >
                    Solicitar orçamento
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-7 py-4 text-base font-bold text-brand-dark shadow-sm transition hover:-translate-y-0.5 hover:border-brand-primary hover:text-brand-primary"
                  >
                    <Phone className="h-5 w-5" />
                    Falar no WhatsApp
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
                  {page.keywords.slice(0, 5).map((keyword) => (
                    <span key={keyword} className="rounded-full bg-white px-4 py-2 shadow-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative"
              >
                <div className="overflow-hidden rounded-[2rem] border-8 border-white bg-white shadow-2xl">
                  <img
                    src={page.imageUrl}
                    alt={page.h1}
                    className="h-[360px] w-full object-cover md:h-[480px]"
                  />
                </div>
                <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-white p-5 shadow-xl">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <ShieldCheck className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">
                        Atendimento Grupo Ardan
                      </p>
                      <p className="text-sm font-semibold text-slate-600">
                        Mão de obra organizada, caprichosa e com comunicação clara.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <span className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-brand-primary">
                  O que você pode solicitar
                </span>
                <h2 className="mt-3 text-3xl font-black text-brand-dark md:text-4xl">
                  Atendimento direto para sua necessidade
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  {page.localText}
                </p>
                <div className="mt-6 flex items-center gap-3 text-slate-600">
                  <MapPin className="h-5 w-5 text-brand-primary" />
                  <span>São Paulo, Grande ABC e Região Metropolitana</span>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {page.highlights.map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                    <CheckCircle2 className="mb-4 h-7 w-7 text-brand-primary" />
                    <p className="font-bold text-brand-dark">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-black text-brand-dark">Serviços incluídos</h2>
                <div className="mt-6 space-y-4">
                  {page.inclusions.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />
                      <p className="text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-brand-dark">Dúvidas frequentes</h2>
                <div className="mt-6 space-y-4">
                  {page.faqs.map((faq) => (
                    <details key={faq.question} className="rounded-lg border border-slate-200 bg-white p-5">
                      <summary className="cursor-pointer font-bold text-brand-dark">
                        {faq.question}
                      </summary>
                      <p className="mt-3 leading-relaxed text-slate-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="orcamento-servico">
          <BudgetForm prefilledService={page.formService} />
        </section>
      </main>

      <Footer onNavigate={handleNavigate} />
      <FloatingWhatsApp />
    </div>
  );
}
