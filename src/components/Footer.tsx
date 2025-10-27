import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Column */}
          <div>
            <img 
              src="/navarro_tax_legal.svg" 
              alt="Navarro Tax & Legal" 
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-6">
              Asesoramiento estratégico y legal de alto nivel para empresas y grupos familiares.
              Soluciones integrales con visión de futuro.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <a href="tel:+34900000000" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={16} />
                <span>+34 900 000 000</span>
              </a>
              <a href="mailto:info@navarrolegal.es" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={16} />
                <span>info@navarrolegal.es</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Areas Column */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Áreas de práctica</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/servicios/fiscal" className="hover:text-accent transition-colors">
                  Derecho Fiscal
                </Link>
              </li>
              <li>
                <Link to="/servicios/mercantil" className="hover:text-accent transition-colors">
                  Derecho Mercantil
                </Link>
              </li>
              <li>
                <Link to="/servicios/laboral" className="hover:text-accent transition-colors">
                  Laboral & Contabilidad
                </Link>
              </li>
              <li>
                <Link to="/servicios/ma" className="hover:text-accent transition-colors">
                  Operaciones M&A
                </Link>
              </li>
              <li>
                <Link to="/empresa-familiar" className="hover:text-accent transition-colors">
                  Empresa Familiar
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/equipo" className="hover:text-accent transition-colors">
                  Nuestro equipo
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-accent transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
            <h4 className="font-serif font-semibold text-lg mb-4 mt-8">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal/aviso-legal" className="hover:text-accent transition-colors">
                  Aviso legal
                </Link>
              </li>
              <li>
                <Link to="/legal/privacidad" className="hover:text-accent transition-colors">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="hover:text-accent transition-colors">
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Navarro Legal. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
