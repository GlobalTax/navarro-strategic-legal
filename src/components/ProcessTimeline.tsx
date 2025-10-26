interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

const ProcessTimeline = ({ steps }: ProcessTimelineProps) => {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <h2 className="text-4xl font-serif font-bold text-center mb-16 text-[#1A1A1A]">
          Nuestro proceso
        </h2>
        
        {/* Desktop: Horizontal layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
          {/* Connection line */}
          <div className="absolute top-7 left-0 right-0 h-[2px] border-t-2 border-dashed border-accent opacity-30" 
               style={{ width: 'calc(100% - 4rem)', marginLeft: '2rem' }} />
          
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="step-badge mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1A1A]">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet: Vertical layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="step-badge">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-[2px] h-full bg-accent opacity-30 mx-auto mt-4" style={{ minHeight: '3rem' }} />
                )}
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-semibold mb-2 text-[#1A1A1A]">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
