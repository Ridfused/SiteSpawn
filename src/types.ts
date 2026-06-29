export interface QuoteSubmission {
  id: string;
  name: string;
  businessName: string;
  email: string;
  message: string;
  selectedService?: string;
  selectedIndustry?: string;
  estimatedBudget?: string;
  timestamp: string;
}

export interface Review {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  timestamp: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  liveUrl: string;
  githubUrl: string;
  techStack: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface IndustryItem {
  name: string;
  icon: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}
