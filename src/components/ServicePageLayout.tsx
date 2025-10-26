import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import ServiceHero from "@/components/ServiceHero";
import ServiceOverview from "@/components/ServiceOverview";
import KeyBenefits from "@/components/KeyBenefits";
import ProcessTimeline from "@/components/ProcessTimeline";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServiceCTABlock from "@/components/ServiceCTABlock";
import StickyCTA from "@/components/StickyCTA";

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface ServicePageLayoutProps {
  // Hero
  heroIcon: LucideIcon;
  heroTitle: string;
  heroSubtitle: string;
  
  // Overview
  overviewTitle: string;
  overviewDescription: string[];
  overviewIcon: LucideIcon;
  services: string[];
  
  // Benefits
  benefits: Benefit[];
  
  // Process
  processSteps: ProcessStep[];
  
  // FAQ
  faqs: FAQ[];
  
  // CTA customization (optional)
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  
  // Additional content (optional)
  children?: ReactNode;
}

const ServicePageLayout = ({
  heroIcon,
  heroTitle,
  heroSubtitle,
  overviewTitle,
  overviewDescription,
  overviewIcon,
  services,
  benefits,
  processSteps,
  faqs,
  ctaTitle,
  ctaSubtitle,
  ctaText,
  ctaLink = "/contacto",
  children,
}: ServicePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgressBar />
      <Navigation />
      
      <ServiceHero
        icon={heroIcon}
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaLink={ctaLink}
      />
      
      <ServiceOverview
        title={overviewTitle}
        description={overviewDescription}
        icon={overviewIcon}
        services={services}
      />
      
      <KeyBenefits benefits={benefits} />
      
      <ProcessTimeline steps={processSteps} />
      
      {children}
      
      <ServiceFAQ faqs={faqs} />
      
      <ServiceCTABlock
        title={ctaTitle}
        subtitle={ctaSubtitle}
        ctaText={ctaText}
        ctaLink={ctaLink}
      />
      
      <Footer />
      <MobileCTA />
      <StickyCTA link={ctaLink} />
    </div>
  );
};

export default ServicePageLayout;
