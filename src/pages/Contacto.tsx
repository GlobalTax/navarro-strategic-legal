import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import SuccessAnimation from "@/components/SuccessAnimation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, MapPin } from "lucide-react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    mensaje: ""
  });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ nombre: "", email: "", empresa: "", mensaje: "" });
    setPrivacyConsent(false);
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container-custom max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground">
            ¿Hablamos de tu empresa?
          </h1>
          <p className="text-lg text-muted-foreground">
            Cuéntanos tu situación y te responderemos en menos de 24 horas
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-20 bg-background">
        <div className="container-custom max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-6 text-foreground">
                Envíanos tu consulta
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2 text-foreground">
                    Nombre completo*
                  </label>
                  <Input 
                    id="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="María García"
                    className="bg-background border-border"
                  />
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                    Email*
                  </label>
                  <Input 
                    id="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="maria@empresa.com"
                    className="bg-background border-border"
                  />
                </div>
                
                {/* Empresa */}
                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium mb-2 text-foreground">
                    Empresa*
                  </label>
                  <Input 
                    id="empresa"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    placeholder="Nombre de tu empresa"
                    className="bg-background border-border"
                  />
                </div>
                
                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium mb-2 text-foreground">
                    Mensaje*
                  </label>
                  <Textarea 
                    id="mensaje"
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={6}
                    className="bg-background border-border resize-none"
                  />
                </div>
                
                {/* Privacy Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox 
                    id="privacy"
                    checked={privacyConsent}
                    onCheckedChange={(checked) => setPrivacyConsent(checked as boolean)}
                    required
                  />
                  <label 
                    htmlFor="privacy" 
                    className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                  >
                    He leído y acepto la{" "}
                    <Link 
                      to="/legal/privacidad" 
                      className="text-accent hover:underline"
                      target="_blank"
                    >
                      política de privacidad
                    </Link>
                    *
                  </label>
                </div>
                
                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !privacyConsent}
                  className="w-full bg-foreground hover:bg-foreground/90 text-background h-12 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </Button>
              </form>
            </div>
            
            {/* Right: Map + Info */}
            <div>
              <div className="space-y-8">
                {/* Map */}
                <div className="w-full h-[300px] rounded-2xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.2134567890123!2d2.1532!3d41.3874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDIzJzE0LjYiTiAywrAwOScxMS41IkU!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación oficina Navarro Barcelona"
                  />
                </div>
                
                {/* Contact Info */}
                <div className="space-y-4 px-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Dirección</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Passeig de Gràcia 100, 3º<br />
                        08008 Barcelona, España
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Teléfono</p>
                      <a 
                        href="tel:+34933000000" 
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        +34 933 000 000
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Email</p>
                      <a 
                        href="mailto:info@navarrolegal.es" 
                        className="text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@navarrolegal.es
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container-custom max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © Navarro 2025 · {" "}
              <Link 
                to="/legal/aviso-legal" 
                className="hover:text-accent transition-colors"
              >
                Aviso Legal
              </Link>
              {" "}· {" "}
              <Link 
                to="/legal/privacidad" 
                className="hover:text-accent transition-colors"
              >
                Privacidad
              </Link>
              {" "}· {" "}
              <Link 
                to="/legal/cookies" 
                className="hover:text-accent transition-colors"
              >
                Cookies
              </Link>
            </p>
          </div>
        </div>
      </footer>

      <SuccessAnimation show={showSuccess} onComplete={handleSuccessComplete} />
    </div>
  );
};

export default Contacto;
