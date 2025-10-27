import ServicePageLayout from "@/components/ServicePageLayout";
import { TrendingUp, Target, Shield, Users, FileCheck, Briefcase } from "lucide-react";

const MANew = () => {
  return (
    <ServicePageLayout
      // Hero
      heroIcon={TrendingUp}
      heroTitle="Operaciones M&A"
      heroSubtitle="Asesoramiento integral en fusiones, adquisiciones y operaciones de crecimiento empresarial"
      
      // Overview
      overviewTitle="Expertos en transacciones complejas"
      overviewDescription={[
        "En Navarro acompañamos a empresas, fondos de inversión y empresarios en sus operaciones más estratégicas: compras, ventas, fusiones y alianzas. Gestionamos el proceso completo desde la valoración inicial hasta el cierre definitivo, coordinando aspectos legales, fiscales, laborales y financieros.",
        "Con experiencia en más de 150 operaciones M&A completadas, conocemos cada fase del proceso, anticipamos problemas, negociamos con firmeza y ejecutamos con precisión. Protegemos tus intereses en cada etapa y maximizamos el valor de la transacción. Tu partner estratégico en operaciones de alto impacto."
      ]}
      overviewIcon={Briefcase}
      services={[
        "Asesoramiento estratégico en M&A",
        "Valoración de empresas y due diligence",
        "Negociación de términos y estructuración",
        "Redacción de LOI, MOU y contratos definitivos",
        "Due diligence legal, fiscal y laboral",
        "Gestión de contingencias y warranties",
        "Coordinación con asesores financieros",
        "Obtención de autorizaciones regulatorias",
        "Financiación de adquisiciones",
        "Integración post-cierre"
      ]}
      
      // Benefits
      benefits={[
        {
          icon: Target,
          title: "Visión 360°",
          description: "Coordinamos todas las dimensiones: legal, fiscal, laboral y financiera en una sola operación"
        },
        {
          icon: Shield,
          title: "Mitigación de riesgos",
          description: "Due diligence exhaustiva que identifica contingencias ocultas antes del cierre definitivo"
        },
        {
          icon: Users,
          title: "Equipo multidisciplinar",
          description: "Especialistas en cada área trabajando coordinadamente bajo un responsable único"
        },
        {
          icon: FileCheck,
          title: "Eficiencia probada",
          description: "Procesos optimizados que aceleran cierres sin comprometer seguridad jurídica"
        }
      ]}
      
      // Process
      processSteps={[
        {
          number: "01",
          title: "Estrategia y preparación",
          description: "Definimos objetivos, valoramos empresa, preparamos documentación y identificamos targets potenciales"
        },
        {
          number: "02",
          title: "Negociación y LOI",
          description: "Contacto con contrapartes, negociación de términos básicos y firma de carta de intenciones"
        },
        {
          number: "03",
          title: "Due diligence",
          description: "Análisis exhaustivo legal, fiscal, laboral y financiero para identificar riesgos y contingencias"
        },
        {
          number: "04",
          title: "Cierre y post-cierre",
          description: "Negociación final, firma de contratos, gestión de autorizaciones y acompañamiento en integración"
        }
      ]}
      
      // FAQ
      faqs={[
        {
          question: "¿Cuánto tiempo suele durar una operación M&A?",
          answer: "Depende de la complejidad, pero el timeline típico es: preparación (1-2 meses), negociación y LOI (1-2 meses), due diligence (2-3 meses), negociación final y cierre (1-2 meses). En total, entre 5-9 meses desde el inicio hasta el cierre. Operaciones sencillas entre partes conocidas pueden acortarse a 3-4 meses, mientras que transacciones internacionales o con múltiples bidders pueden extenderse hasta 12-18 meses."
        },
        {
          question: "¿Qué es exactamente un due diligence y por qué es tan importante?",
          answer: "Es un análisis exhaustivo de la empresa objetivo para identificar riesgos ocultos antes de comprar. Revisamos contratos, litigios, contingencias fiscales, situación laboral, propiedad intelectual, cumplimiento normativo, etc. Es crucial porque descubre problemas que pueden reducir el precio, incluirse como garantías en el contrato, o incluso hacer que abandones la operación. Comprar sin due diligence es como comprar una casa sin inspección: puedes descubrir vicios ocultos graves cuando ya es tarde."
        },
        {
          question: "¿Cómo se valora una empresa en una operación M&A?",
          answer: "Se utilizan varios métodos: múltiplos de EBITDA (el más común, comparando con operaciones similares), descuento de flujos de caja futuros, valor patrimonial ajustado, y múltiplos de ventas. No hay un método único correcto; depende del sector, tamaño, y circunstancias. La valoración es parte negociación, parte ciencia. Un buen asesor conoce rangos de mercado por sector y argumenta tu posición con datos objetivos."
        },
        {
          question: "¿Qué son las warranties y por qué son importantes?",
          answer: "Son declaraciones y garantías que el vendedor hace sobre la situación de la empresa: ausencia de litigios ocultos, correcta situación fiscal y laboral, propiedad de activos, etc. Si resultan falsas, el comprador puede reclamar indemnización. Negociar correctamente las warranties es fundamental: como comprador, quieres cobertura amplia y larga; como vendedor, limitarla en alcance, tiempo y cantidad. Los seguros de warranties (W&I) están ganando popularidad para facilitar cierres."
        },
        {
          question: "¿Cuándo conviene vender mi empresa y cuándo es mejor esperar?",
          answer: "El timing es crítico. Conviene vender cuando: la empresa está en buen momento (múltiplos más altos), el sector es atractivo para compradores, hay varios interesados (subasta competitiva), has preparado bien los números y resuelto contingencias, o personalmente estás listo para salir. Espera si: puedes mejorar márgenes significativamente en 1-2 años, hay litigios o contingencias pendientes que reducen valor, el mercado está deprimido, o aún no has implementado tu plan estratégico. Te ayudamos a evaluar objetivamente."
        }
      ]}
      
      // CTA
      ctaTitle="¿Estás considerando una operación M&A?"
      ctaSubtitle="Agenda una consulta confidencial con nuestro equipo de M&A"
      ctaText="Solicita una reunión"
    />
  );
};

export default MANew;
