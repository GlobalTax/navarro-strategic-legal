import ServicePageLayout from "@/components/ServicePageLayout";
import { Building2, Shield, Users, Briefcase, FileCheck, TrendingUp } from "lucide-react";

const MercantilNew = () => {
  return (
    <ServicePageLayout
      // Hero
      heroIcon={Building2}
      heroTitle="Derecho Mercantil"
      heroSubtitle="Asesoramiento integral para empresas: constitución, gobernanza y operaciones societarias"
      
      // Overview
      overviewTitle="Expertos en derecho corporativo"
      overviewDescription={[
        "En Navarro acompañamos a empresas de todos los tamaños en sus decisiones corporativas más importantes. Desde la constitución hasta la disolución, pasando por fusiones, escisiones y transformaciones societarias.",
        "Diseñamos estructuras de gobierno corporativo sólidas, redactamos contratos estratégicos y gestionamos conflictos societarios con visión práctica y enfoque en soluciones. Tu socio legal en el día a día y en los momentos críticos de tu empresa."
      ]}
      overviewIcon={FileCheck}
      services={[
        "Constitución y puesta en marcha de sociedades",
        "Gobernanza corporativa y compliance",
        "Fusiones, escisiones y transformaciones",
        "Operaciones de capital (ampliaciones y reducciones)",
        "Protocolos familiares y pactos de socios",
        "Contratos mercantiles complejos",
        "Resolución de conflictos societarios",
        "Disolución y liquidación de sociedades",
        "Joint ventures y alianzas estratégicas",
        "Responsabilidad de administradores"
      ]}
      
      // Benefits
      benefits={[
        {
          icon: Shield,
          title: "Protección legal",
          description: "Estructuras corporativas sólidas que protegen a socios y administradores ante contingencias"
        },
        {
          icon: Users,
          title: "Prevención de conflictos",
          description: "Pactos y protocolos claros que evitan disputas entre socios y garantizan estabilidad"
        },
        {
          icon: Briefcase,
          title: "Agilidad operativa",
          description: "Respuesta rápida en operaciones urgentes con disponibilidad y experiencia contrastada"
        },
        {
          icon: TrendingUp,
          title: "Crecimiento seguro",
          description: "Acompañamiento legal en cada fase de evolución y expansión de tu empresa"
        }
      ]}
      
      // Process
      processSteps={[
        {
          number: "01",
          title: "Diagnóstico",
          description: "Analizamos la estructura societaria actual, identificamos riesgos y oportunidades de mejora"
        },
        {
          number: "02",
          title: "Diseño de solución",
          description: "Proponemos la estructura óptima o la operación más eficiente para tus objetivos empresariales"
        },
        {
          number: "03",
          title: "Ejecución",
          description: "Gestionamos todos los trámites: documentación, registros, notarías y coordinación con terceros"
        },
        {
          number: "04",
          title: "Seguimiento",
          description: "Mantenemos la estructura actualizada y te asesoramos en el cumplimiento de obligaciones"
        }
      ]}
      
      // FAQ
      faqs={[
        {
          question: "¿Qué tipo de sociedad es más conveniente para mi negocio?",
          answer: "Depende de múltiples factores: número de socios, capital disponible, tipo de actividad, responsabilidad deseada y proyección fiscal. Las SL son las más habituales por su flexibilidad y capital mínimo (3.000€). Las SA requieren más capital (60.000€) pero facilitan entrada de inversores. También existen opciones como SL de formación sucesiva, sociedades profesionales o cooperativas. Analizamos tu caso concreto para recomendarte la estructura óptima."
        },
        {
          question: "¿Es obligatorio tener un pacto de socios?",
          answer: "No es obligatorio legalmente, pero es altamente recomendable cuando hay varios socios. El pacto regula situaciones no contempladas en estatutos: reparto de dividendos, toma de decisiones estratégicas, entrada y salida de socios, resolución de conflictos, cláusulas de permanencia y no competencia. Un buen pacto previene disputas costosas y protege los intereses de todos. Es especialmente crítico en empresas familiares."
        },
        {
          question: "¿Cuándo conviene realizar una fusión o escisión?",
          answer: "Las fusiones son útiles para consolidar grupos, eliminar duplicidades, mejorar la estructura de financiación o facilitar una venta posterior. Las escisiones permiten separar líneas de negocio, preparar ventas parciales, gestionar riesgos o planificar sucesiones. Ambas operaciones tienen ventajas fiscales importantes pero requieren análisis detallado de viabilidad, valoración correcta y cumplimiento riguroso del procedimiento legal."
        },
        {
          question: "¿Qué responsabilidad tienen los administradores?",
          answer: "Los administradores responden por daños causados por actos contrarios a la ley o los estatutos, y por incumplimiento de sus deberes con la diligencia de un ordenado empresario. Esta responsabilidad puede ser frente a la sociedad, los socios o terceros, e incluso puede ser personal (no limitada al capital social) en casos graves. Es fundamental conocer las obligaciones, documentar decisiones correctamente y contar con seguros específicos de responsabilidad civil."
        },
        {
          question: "¿Cómo resolver conflictos entre socios sin destruir la empresa?",
          answer: "La prevención es clave: pactos claros desde el inicio. Si surge el conflicto, recomendamos mediación profesional antes de acudir a tribunales. Las vías de solución incluyen: compra de participaciones del socio disidente (a valor razonable determinado por experto), liquidación parcial, separación amistosa con reparto de activos, o en último caso, disolución judicial. Actuamos como mediadores o representantes según el caso, priorizando la continuidad del negocio cuando es viable."
        }
      ]}
      
      // CTA
      ctaTitle="¿Necesitas asesoramiento societario?"
      ctaSubtitle="Agenda una consulta con nuestro equipo de derecho mercantil"
      ctaText="Solicita una consulta"
    />
  );
};

export default MercantilNew;
