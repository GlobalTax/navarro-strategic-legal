import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQ[];
}

const ServiceFAQ = ({ faqs }: ServiceFAQProps) => {
  return (
    <section className="section-spacing bg-secondary/30">
      <div className="container-custom">
        <h2 className="text-4xl font-serif font-bold text-center mb-12 text-[#1A1A1A]">
          Preguntas frecuentes
        </h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="multiple" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-lg font-semibold text-[#1A1A1A] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;
