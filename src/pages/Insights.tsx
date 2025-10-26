import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

const Insights = () => {
  const articles = [
    {
      title: "Novedades fiscales 2024: Impacto en empresas familiares",
      category: "Fiscal",
      date: "15 marzo 2024",
      excerpt: "Análisis exhaustivo de las últimas reformas fiscales y su impacto en la planificación patrimonial de grupos familiares.",
      readTime: "8 min"
    },
    {
      title: "Claves para una sucesión empresarial exitosa",
      category: "Empresa Familiar",
      date: "28 febrero 2024",
      excerpt: "Guía práctica para estructurar un proceso de sucesión que preserve el valor de la empresa y la armonía familiar.",
      readTime: "10 min"
    },
    {
      title: "Optimización de estructuras societarias en operaciones M&A",
      category: "Mercantil",
      date: "12 febrero 2024",
      excerpt: "Estrategias legales y fiscales para maximizar el valor en operaciones de fusión y adquisición.",
      readTime: "12 min"
    },
    {
      title: "Nuevas obligaciones en compliance laboral",
      category: "Laboral",
      date: "30 enero 2024",
      excerpt: "Principales cambios normativos en materia laboral y cómo adaptar tu empresa al nuevo marco regulatorio.",
      readTime: "6 min"
    },
    {
      title: "Protocolos familiares: Más allá del documento legal",
      category: "Empresa Familiar",
      date: "18 enero 2024",
      excerpt: "Cómo diseñar e implementar un protocolo familiar efectivo que sea realmente útil para tu organización.",
      readTime: "9 min"
    },
    {
      title: "Fiscalidad internacional: Planificación para grupos multinacionales",
      category: "Fiscal",
      date: "5 enero 2024",
      excerpt: "Estrategias de planificación fiscal internacional en el nuevo entorno regulatorio global.",
      readTime: "15 min"
    }
  ];

  const categories = ["Todos", "Fiscal", "Mercantil", "Laboral", "Empresa Familiar", "M&A"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Insights</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Conocimiento actualizado para la toma de decisiones estratégicas
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-secondary/30 sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 transition-all text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card key={index} className="p-6 border-border hover:shadow-lg transition-all duration-300 group flex flex-col">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{article.date}</span>
                  </div>
                  <span>{article.readTime} de lectura</span>
                </div>
                <Link 
                  to="#"
                  className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all"
                >
                  Leer artículo
                  <ArrowRight size={16} />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <Card className="p-12 text-center bg-primary text-primary-foreground border-0">
            <h2 className="text-4xl font-serif font-bold mb-4">
              Mantente informado
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Recibe nuestros insights mensuales directamente en tu email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className="flex-1 px-6 py-3 rounded-full text-foreground"
              />
              <button className="bg-accent hover:bg-accent/90 text-foreground px-8 py-3 rounded-full font-medium transition-all whitespace-nowrap">
                Suscribirme
              </button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Insights;
