import ServicePageLayout from "@/components/ServicePageLayout";
import { Shield, Target, Clock, TrendingUp, Scale, FileText } from "lucide-react";

const FiscalNew = () => {
  return (
    <ServicePageLayout
      // Hero
      heroIcon={Scale}
      heroTitle="Derecho Fiscal"
      heroSubtitle="Planificación fiscal estratégica y optimización tributaria para empresas y patrimonios"
      
      // Overview
      overviewTitle="Experiencia fiscal integral"
      overviewDescription={[
        "En Navarro ofrecemos asesoramiento fiscal estratégico que va más allá del cumplimiento normativo. Diseñamos soluciones fiscales eficientes que protegen tu patrimonio y optimizan la carga tributaria de forma totalmente legal.",
        "Nuestro equipo cuenta con amplia experiencia en fiscalidad nacional e internacional, operaciones complejas y resolución de conflictos con la administración tributaria. Anticipamos riesgos y aprovechamos oportunidades en un entorno fiscal en constante cambio."
      ]}
      overviewIcon={FileText}
      services={[
        "Planificación fiscal nacional e internacional",
        "Estructuración de grupos de sociedades",
        "Operaciones de reorganización empresarial",
        "Fiscalidad de operaciones M&A",
        "Precios de transferencia",
        "Inspecciones y procedimientos tributarios",
        "Recursos y reclamaciones administrativas",
        "Fiscalidad de no residentes e inversión extranjera",
        "Planificación patrimonial y sucesoria",
        "Tax compliance y reporting"
      ]}
      
      // Benefits
      benefits={[
        {
          icon: Shield,
          title: "Seguridad jurídica",
          description: "Cumplimiento normativo garantizado en cada estrategia fiscal con respaldo documental completo"
        },
        {
          icon: Target,
          title: "Optimización fiscal",
          description: "Estructuras eficientes que minimizan la carga tributaria dentro del marco legal vigente"
        },
        {
          icon: Clock,
          title: "Respuesta inmediata",
          description: "Disponibilidad en momentos críticos como inspecciones o deadlines tributarios"
        },
        {
          icon: TrendingUp,
          title: "Visión estratégica",
          description: "Integramos la planificación fiscal con tus objetivos de negocio y crecimiento"
        }
      ]}
      
      // Process
      processSteps={[
        {
          number: "01",
          title: "Análisis fiscal",
          description: "Evaluamos tu situación tributaria actual, identificamos riesgos y oportunidades de optimización"
        },
        {
          number: "02",
          title: "Estrategia personalizada",
          description: "Diseñamos una solución fiscal a medida alineada con tus objetivos empresariales y patrimoniales"
        },
        {
          number: "03",
          title: "Implementación",
          description: "Ejecutamos la estrategia con seguimiento continuo y documentación exhaustiva"
        },
        {
          number: "04",
          title: "Monitorización",
          description: "Revisamos y ajustamos la planificación ante cambios normativos o en tu situación"
        }
      ]}
      
      // FAQ
      faqs={[
        {
          question: "¿Cuándo es el momento adecuado para realizar una planificación fiscal?",
          answer: "La planificación fiscal debe ser proactiva, no reactiva. El momento ideal es antes de realizar operaciones significativas (fusiones, adquisiciones, reestructuraciones), al inicio del ejercicio fiscal, o cuando se producen cambios importantes en la normativa. Anticiparse permite aprovechar oportunidades legales de optimización que desaparecen una vez realizadas las operaciones."
        },
        {
          question: "¿Qué diferencia hay entre elusión y evasión fiscal?",
          answer: "La evasión fiscal es ilegal e implica ocultar ingresos o información a Hacienda. La elusión o planificación fiscal es perfectamente legal y consiste en estructurar tus operaciones de la forma más eficiente fiscalmente dentro del marco normativo. En Navarro solo trabajamos con estrategias de planificación fiscal legítima con sustancia económica real."
        },
        {
          question: "¿Cómo protegerse ante una inspección tributaria?",
          answer: "La mejor protección es la prevención: mantener una documentación exhaustiva, justificación económica de todas las operaciones, y un tax compliance riguroso. Si ya estás siendo inspeccionado, es fundamental contar con asesoramiento especializado desde el primer momento para defender tus intereses, presentar alegaciones fundamentadas y negociar acuerdos cuando proceda."
        },
        {
          question: "¿Qué ventajas tiene la fiscalidad de grupos de sociedades?",
          answer: "Los grupos de sociedades pueden acogerse al régimen de consolidación fiscal, que permite compensar pérdidas de unas sociedades con beneficios de otras, diferir tributación en operaciones internas, y optimizar la estructura de financiación. Requiere cumplir requisitos específicos y una gestión fiscal coordinada del grupo."
        },
        {
          question: "¿Es posible recuperar impuestos pagados en exceso?",
          answer: "Sí, mediante la rectificación de autoliquidaciones o la solicitud de devolución de ingresos indebidos. El plazo general es de 4 años desde el día siguiente a la finalización del plazo de presentación de la declaración. Es importante actuar dentro de plazo y contar con documentación sólida que justifique la devolución solicitada."
        }
      ]}
      
      // CTA
      ctaTitle="¿Necesitas optimizar tu fiscalidad?"
      ctaSubtitle="Agenda una consulta estratégica con nuestro equipo fiscal"
      ctaText="Solicita una consulta"
    />
  );
};

export default FiscalNew;
