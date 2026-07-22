export interface Service {
  id: string;
  iconName: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  imageUrl: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  area: string;
  duration: string;
  location: string;
  details: string[];
}

export interface ProcessStep {
  number: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface ServicePage {
  serviceId: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  shortName: string;
  intro: string;
  imageUrl: string;
  formService: string;
  keywords: string[];
  highlights: string[];
  inclusions: string[];
  localText: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export interface BudgetRequest {
  serviceType: string;
  estimatedArea: string;
  description: string;
  location: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  files: File[];
}
