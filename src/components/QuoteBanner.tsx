interface QuoteBannerProps {
  quote: string;
  author?: string;
}

const QuoteBanner = ({ quote, author }: QuoteBannerProps) => {
  return (
    <section className="min-h-[40vh] flex items-center justify-center py-20 bg-secondary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-1 bg-accent mx-auto mb-8" />
          <blockquote className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight mb-6">
            "{quote}"
          </blockquote>
          {author && (
            <p className="text-lg text-muted-foreground font-medium">— {author}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteBanner;
