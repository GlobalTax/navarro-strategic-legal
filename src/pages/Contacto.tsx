import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contacto = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    mensaje: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto contigo en breve.",
    });
    setFormData({ nombre: "", email: "", telefono: "", empresa: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Contacto</h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Estamos aquí para escucharte y ayudarte
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 border-border">
              <h2 className="text-3xl font-serif font-bold mb-6">Agenda una consulta</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Nombre completo*</label>
                  <Input 
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email*</label>
                  <Input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="juan@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Teléfono</label>
                  <Input 
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="+34 600 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Empresa</label>
                  <Input 
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Mensaje*</label>
                  <Textarea 
                    required
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-foreground">
                  Enviar mensaje
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-6">Información de contacto</h2>
                <p className="text-muted-foreground mb-8">
                  Estamos ubicados en el corazón de Madrid, pero trabajamos con clientes 
                  en todo el territorio nacional e internacional.
                </p>
              </div>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Teléfono</h3>
                    <a href="tel:+34900000000" className="text-muted-foreground hover:text-accent transition-colors">
                      +34 900 000 000
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@navarrolegal.es" className="text-muted-foreground hover:text-accent transition-colors">
                      info@navarrolegal.es
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Dirección</h3>
                    <p className="text-muted-foreground">
                      Calle Serrano 123, 5º<br />
                      28006 Madrid, España
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-secondary/30 border-border">
                <h3 className="font-semibold mb-2">Horario de atención</h3>
                <p className="text-muted-foreground">
                  Lunes a Viernes: 9:00 - 19:00<br />
                  Sábados y Domingos: Cerrado
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  * Disponibilidad para reuniones fuera de horario con cita previa
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacto;
