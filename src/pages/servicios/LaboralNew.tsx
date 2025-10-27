import ServicePageLayout from "@/components/ServicePageLayout";
import { Users, Shield, FileCheck, TrendingUp, Clock, AlertCircle } from "lucide-react";

const LaboralNew = () => {
  return (
    <ServicePageLayout
      // Hero
      heroIcon={Users}
      heroTitle="Laboral & Contabilidad"
      heroSubtitle="Gestión integral de recursos humanos y contabilidad para empresas de todos los tamaños"
      
      // Overview
      overviewTitle="Tu departamento laboral y contable externo"
      overviewDescription={[
        "En Navarro ofrecemos una solución completa para la gestión de personal y contabilidad de tu empresa. Nos convertimos en tu departamento de RRHH y contabilidad, permitiéndote concentrarte en el core de tu negocio mientras nosotros nos ocupamos de nóminas, contratos, Seguridad Social, impuestos y cumplimiento normativo.",
        "Combinamos tecnología avanzada con trato personalizado. Garantizamos cumplimiento total de obligaciones legales, optimización de costes laborales y contables, y respuesta inmediata ante inspecciones o contingencias. Más de 200 empresas confían en nosotros su gestión laboral y contable."
      ]}
      overviewIcon={FileCheck}
      services={[
        "Gestión de nóminas y seguros sociales",
        "Contratación y relaciones laborales",
        "Despidos y finiquitos",
        "Negociación colectiva y convenios",
        "Prevención de riesgos laborales",
        "Inspecciones de trabajo",
        "Contabilidad financiera y fiscal",
        "Cierre contable y cuentas anuales",
        "Libros oficiales y legalización",
        "Asesoramiento contable estratégico"
      ]}
      
      // Benefits
      benefits={[
        {
          icon: Shield,
          title: "Cumplimiento garantizado",
          description: "Cero riesgos de sanciones por errores en nóminas, cotizaciones o presentación de impuestos"
        },
        {
          icon: TrendingUp,
          title: "Ahorro real",
          description: "Reducción de costes frente a mantener departamento propio, sin perder calidad ni control"
        },
        {
          icon: Clock,
          title: "Gestión ágil",
          description: "Portal cliente para consultas instantáneas, nóminas online y documentación siempre disponible"
        },
        {
          icon: AlertCircle,
          title: "Respaldo total",
          description: "Acompañamiento en inspecciones, conflictos laborales y auditorías con especialistas experimentados"
        }
      ]}
      
      // Process
      processSteps={[
        {
          number: "01",
          title: "Diagnóstico inicial",
          description: "Analizamos tu situación laboral y contable actual, identificamos mejoras y riesgos a corregir"
        },
        {
          number: "02",
          title: "Migración y setup",
          description: "Importamos datos, configuramos sistemas, formalizamos contratos y establecemos procesos de comunicación"
        },
        {
          number: "03",
          title: "Gestión recurrente",
          description: "Procesamos nóminas, declaraciones, contabilidad mensual con calendario claro y entregas puntuales"
        },
        {
          number: "04",
          title: "Asesoramiento continuo",
          description: "Resolución de consultas, actualizaciones normativas y propuestas de optimización proactivas"
        }
      ]}
      
      // FAQ
      faqs={[
        {
          question: "¿Qué incluye exactamente el servicio de gestión laboral?",
          answer: "Incluye todo lo necesario para la gestión de tu plantilla: elaboración de contratos, altas y bajas en Seguridad Social, cálculo y confección de nóminas mensuales, liquidaciones de IRPF y cotizaciones, gestión de incapacidades temporales, elaboración de finiquitos, certificados de empresa, y representación ante inspecciones de trabajo. También asesoramiento en contratación, despidos y conflictos laborales. Acceso a portal web para consulta de nóminas y documentación."
        },
        {
          question: "¿Es más económico externalizar que tener personal propio?",
          answer: "En la mayoría de casos, sí. Un empleado de RRHH/contabilidad a tiempo completo cuesta 30-40K€/año más cargas sociales, mientras que nuestro servicio cuesta una fracción (desde 150€/mes según volumen). Además, evitas sustituciones por vacaciones o bajas, actualizaciones formativas, software especializado y costes de rescisión. Ganas en flexibilidad, conocimiento experto actualizado y escalabilidad según tu crecimiento."
        },
        {
          question: "¿Qué pasa si hay una inspección de trabajo o Seguridad Social?",
          answer: "Te acompañamos desde el primer momento. Preparamos toda la documentación requerida, comparecemos contigo ante los inspectores, defendemos tu posición con alegaciones técnicas fundamentadas, y negociamos acuerdos si procede. Nuestra experiencia en cientos de inspecciones nos permite anticipar requerimientos, minimizar riesgos y resolver la mayoría de casos sin sanciones. Si hubiera error imputable a nuestra gestión, asumimos la responsabilidad."
        },
        {
          question: "¿Cómo funciona la contabilidad? ¿Qué tengo que hacer yo?",
          answer: "Tú nos envías facturas y justificantes mensualmente (muchos clientes lo hacen por foto o escaneado). Nosotros contabilizamos, cuadramos bancos, calculamos impuestos, presentamos declaraciones y elaboramos balances. Tienes acceso online a tu contabilidad actualizada 24/7. Al cierre del ejercicio, preparamos cuentas anuales, las legalizamos y te asesoramos en decisiones fiscales y financieras. Simplificamos al máximo tu carga administrativa."
        },
        {
          question: "¿Puedo cambiarme de gestoría sin problemas?",
          answer: "Absolutamente. El cambio es más sencillo de lo que parece: nosotros solicitamos traspaso de documentación a tu gestoría actual (están obligados a entregarla), migramos datos, y desde el mes siguiente ya gestionamos todo. No hay permanencia obligatoria con nosotros: si no estás satisfecho, puedes irte con preaviso de 30 días y entregamos toda tu documentación ordenada. Confiamos en retener clientes por la calidad del servicio, no por ataduras contractuales."
        }
      ]}
      
      // CTA
      ctaTitle="¿Listo para simplificar tu gestión laboral y contable?"
      ctaSubtitle="Agenda una llamada y te explicamos cómo podemos ayudarte"
      ctaText="Solicita información"
    />
  );
};

export default LaboralNew;
