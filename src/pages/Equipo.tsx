import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import TeamMemberCard, { TeamMember } from "@/components/TeamMemberCard";
import TeamMemberModal from "@/components/TeamMemberModal";
import TeamSearch from "@/components/TeamSearch";
import TeamFilters from "@/components/TeamFilters";
import { Card } from "@/components/ui/card";
import { SearchX } from "lucide-react";

const Equipo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArea, setActiveArea] = useState("Todas");
  const [activeSeniority, setActiveSeniority] = useState("Todos");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "María Navarro",
      role: "Socia Fundadora",
      seniority: "Socio",
      areas: ["Fiscal", "M&A"],
      email: "maria.navarro@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "25+ años de experiencia en planificación fiscal internacional y operaciones corporativas complejas. Experta en estructuración de holdings y optimización fiscal transfronteriza.",
      fullBio: "María Navarro lidera el área de Derecho Fiscal y M&A con más de 25 años de experiencia en los mejores despachos internacionales. Especializada en planificación fiscal estratégica para grupos multinacionales y operaciones de fusiones y adquisiciones complejas.\n\nHa asesorado en más de 200 operaciones corporativas con un valor agregado superior a 5.000M€, destacando su expertise en estructuración de inversiones internacionales, reorganizaciones fiscales y procesos de due diligence fiscal.\n\nReconocida por directivos de Legal 500 y Chambers & Partners, María combina rigor técnico con una visión estratégica que anticipa las necesidades de sus clientes.",
      specializations: [
        "Planificación fiscal internacional",
        "Due diligence fiscal en operaciones M&A",
        "Reestructuraciones corporativas y holdings",
        "Tributación de grupos multinacionales",
        "Precios de transferencia"
      ],
      education: "Licenciada en Derecho por UCM, MBA por IESE Business School, Master en Asesoría Fiscal por IE",
      languages: ["Español", "Inglés", "Francés"]
    },
    {
      id: "2",
      name: "Carlos Jiménez",
      role: "Socio",
      seniority: "Socio",
      areas: ["Mercantil"],
      email: "carlos.jimenez@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especialista en gobierno corporativo y reestructuraciones empresariales con trayectoria en grandes despachos internacionales. Experto en cumplimiento normativo y mejores prácticas corporativas.",
      fullBio: "Carlos Jiménez es socio del área de Derecho Mercantil, con amplia experiencia en gobierno corporativo, restructuraciones empresariales y operaciones de capital.\n\nAntes de unirse a Navarro, trabajó durante 15 años en los departamentos mercantiles de dos de los principales despachos españoles, donde asesoró a empresas del IBEX 35 en sus operaciones más relevantes.\n\nSu práctica se centra en el diseño e implementación de estructuras de gobierno corporativo, operaciones de reestructuración de deuda, refinanciaciones y procesos concursales, así como en la redacción de pactos parasociales y protocolos de actuación.",
      specializations: [
        "Gobierno corporativo y compliance",
        "Reestructuraciones empresariales",
        "Operaciones de capital y financiación",
        "Pactos parasociales y protocolos",
        "Derecho concursal"
      ],
      education: "Licenciado en Derecho y ADE por ICADE, LLM por London School of Economics",
      languages: ["Español", "Inglés", "Alemán"]
    },
    {
      id: "3",
      name: "Laura Martínez",
      role: "Socia",
      seniority: "Socio",
      areas: ["Empresa Familiar"],
      email: "laura.martinez@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Experta en planificación sucesoria y estructuración patrimonial de grupos familiares. Especializada en protocolos familiares y transiciones generacionales exitosas.",
      fullBio: "Laura Martínez es referente en el asesoramiento integral a empresas familiares, con más de 20 años de experiencia acompañando a familias empresarias en sus momentos más críticos.\n\nSu enfoque combina sensibilidad hacia las dinámicas familiares con rigor jurídico y visión estratégica. Ha liderado más de 80 procesos sucesorios exitosos y diseñado protocolos familiares para grupos empresariales con facturaciones superiores a 500M€.\n\nLaura es miembro del Instituto de la Empresa Familiar y colabora habitualmente con Family Business Network España, participando como ponente en conferencias sobre gobernanza y continuidad empresarial.",
      specializations: [
        "Planificación sucesoria y generacional",
        "Protocolos familiares y consejos de familia",
        "Estructuración patrimonial",
        "Mediación en conflictos familiares",
        "Holdings patrimoniales"
      ],
      education: "Licenciada en Derecho por Universidad de Navarra, Master en Empresa Familiar por IESE",
      languages: ["Español", "Inglés", "Italiano"]
    },
    {
      id: "4",
      name: "David Rodríguez",
      role: "Of Counsel",
      seniority: "Of Counsel",
      areas: ["Laboral"],
      email: "david.rodriguez@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especialista en relaciones laborales complejas y gestión integral de recursos humanos. Experto en procesos de reestructuración y negociación colectiva.",
      fullBio: "David Rodríguez aporta más de 25 años de experiencia en Derecho Laboral, habiendo liderado el departamento laboral de uno de los principales despachos españoles durante más de una década.\n\nSu expertise abarca desde la gestión del día a día laboral hasta los procesos más complejos de reestructuración empresarial, negociaciones colectivas y litigios estratégicos. Ha asesorado a empresas multinacionales en procesos de transformación con plantillas superiores a 5.000 empleados.\n\nReconocido por su capacidad para anticipar riesgos laborales y diseñar estrategias preventivas, David combina su práctica profesional con la docencia en programas de postgrado en materia laboral.",
      specializations: [
        "Reestructuraciones laborales y EREs",
        "Negociación colectiva",
        "Compliance laboral y prevención de riesgos",
        "Litigios laborales estratégicos",
        "Políticas de recursos humanos"
      ],
      education: "Licenciado en Derecho por Universidad Autónoma de Barcelona, Master en Recursos Humanos por ESADE",
      languages: ["Español", "Inglés", "Catalán"]
    },
    {
      id: "5",
      name: "Ana García",
      role: "Asociada Senior",
      seniority: "Asociado",
      areas: ["Fiscal"],
      email: "ana.garcia@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especialista en fiscalidad de operaciones inmobiliarias y tributación de patrimonios. Amplia experiencia en planificación fiscal para particulares y family offices.",
      fullBio: "Ana García es Asociada Senior del área fiscal, especializada en tributación patrimonial y operaciones inmobiliarias. Con más de 10 años de experiencia, ha desarrollado su carrera profesional asesorando a family offices, inversores inmobiliarios y patrimonios familiares.\n\nSu práctica se centra en la estructuración fiscal de carteras inmobiliarias, planificación sucesoria de patrimonios complejos y optimización de la tributación de rentas del capital. Ha participado en operaciones de inversión inmobiliaria superiores a 800M€.\n\nAna es ponente habitual en seminarios especializados sobre fiscalidad inmobiliaria y patrimonial.",
      specializations: [
        "Fiscalidad inmobiliaria",
        "Planificación patrimonial",
        "Tributación de family offices",
        "Impuesto sobre Sucesiones y Donaciones",
        "IRPF de altos patrimonios"
      ],
      education: "Licenciada en Derecho por Universidad Carlos III, Master en Asesoría Fiscal por CEF-UDIMA",
      languages: ["Español", "Inglés"]
    },
    {
      id: "6",
      name: "Miguel Torres",
      role: "Asociado Senior",
      seniority: "Asociado",
      areas: ["M&A"],
      email: "miguel.torres@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especializado en operaciones de M&A mid-market y venture capital. Experiencia en sectores tecnológicos, retail y servicios profesionales.",
      fullBio: "Miguel Torres es Asociado Senior especializado en operaciones de fusiones y adquisiciones, con foco en el segmento mid-market y operaciones de venture capital y private equity.\n\nCon 8 años de experiencia, ha participado en más de 50 operaciones de M&A, destacando su trabajo en sectores tecnológicos, retail y servicios profesionales. Miguel combina conocimientos jurídicos sólidos con visión comercial, siendo un interlocutor clave para emprendedores e inversores.\n\nAntes de unirse a Navarro, trabajó en el departamento de M&A de un despacho internacional y en el equipo legal de un fondo de venture capital.",
      specializations: [
        "Operaciones M&A mid-market",
        "Venture capital y private equity",
        "Due diligence legal",
        "Contratos de compraventa de participaciones",
        "Rondas de financiación"
      ],
      education: "Licenciado en Derecho por Universidad Pompeu Fabra, LLM Corporate Law por IE Law School",
      languages: ["Español", "Inglés", "Portugués"]
    },
    {
      id: "7",
      name: "Elena Ruiz",
      role: "Asociada Senior",
      seniority: "Asociado",
      areas: ["Mercantil"],
      email: "elena.ruiz@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Experta en derecho de sociedades y contratos mercantiles. Especializada en startups, compliance y protección de datos.",
      fullBio: "Elena Ruiz es Asociada Senior del área mercantil, con especial foco en startups, emprendimiento y compliance normativo. Con 9 años de experiencia, ha asesorado a más de 100 empresas en sus primeras etapas de crecimiento.\n\nSu práctica combina derecho societario clásico con las nuevas necesidades regulatorias: RGPD, compliance penal, contratos tecnológicos y protección de activos digitales. Elena es conocida por su capacidad para traducir complejidad legal en soluciones prácticas para emprendedores.\n\nColabora con varios programas de aceleración de startups en Barcelona y Madrid, participando como mentora legal.",
      specializations: [
        "Derecho de sociedades y startups",
        "Compliance y protección de datos (RGPD)",
        "Contratos mercantiles y tecnológicos",
        "Propiedad intelectual e industrial",
        "Compliance penal corporativo"
      ],
      education: "Licenciada en Derecho por Universidad de Deusto, Master en Propiedad Intelectual por Universidad de Alicante",
      languages: ["Español", "Inglés", "Euskera"]
    },
    {
      id: "8",
      name: "Pablo Sánchez",
      role: "Asociado",
      seniority: "Asociado",
      areas: ["Laboral"],
      email: "pablo.sanchez@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especializado en derecho laboral individual y gestión del día a día laboral. Experto en contratos, despidos y litigios laborales.",
      fullBio: "Pablo Sánchez es Asociado del área laboral, especializado en gestión cotidiana de relaciones laborales y litigios individuales. Con 5 años de experiencia, ha desarrollado su carrera asesorando a empresas en la gestión de sus plantillas.\n\nSu práctica abarca desde la elaboración de contratos y políticas internas hasta la defensa en procedimientos judiciales laborales. Pablo se caracteriza por su enfoque preventivo y su capacidad para resolver conflictos antes de que escalen.\n\nAntes de incorporarse a Navarro, trabajó en el departamento laboral de una firma boutique especializada en empresas tecnológicas y servicios.",
      specializations: [
        "Derecho laboral individual",
        "Contratación y políticas de RRHH",
        "Despidos y extinciones contractuales",
        "Litigios laborales",
        "Inspecciones de trabajo"
      ],
      education: "Licenciado en Derecho y Relaciones Laborales por Universidad de Valencia, Master en Asesoría Laboral por CEF",
      languages: ["Español", "Inglés", "Valenciano"]
    },
    {
      id: "9",
      name: "Carmen Vidal",
      role: "Asociada",
      seniority: "Asociado",
      areas: ["Fiscal", "M&A"],
      email: "carmen.vidal@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Especialista en aspectos fiscales de operaciones M&A y financiación estructurada. Experta en modelización fiscal y análisis de escenarios.",
      fullBio: "Carmen Vidal es Asociada del área fiscal con especialización en operaciones corporativas. Con 6 años de experiencia, ha participado en el asesoramiento fiscal de numerosas operaciones de M&A, reestructuraciones y financiaciones.\n\nSu perfil técnico combina formación jurídica y financiera, permitiéndole realizar análisis fiscales complejos y modelizaciones de escenarios alternativos. Carmen trabaja estrechamente con los equipos de M&A para optimizar la estructura fiscal de cada operación.\n\nAntes de unirse a Navarro, trabajó en el departamento de tax de una de las Big Four, especializándose en corporate tax y M&A tax.",
      specializations: [
        "Fiscalidad de operaciones M&A",
        "Modelización fiscal y análisis de escenarios",
        "Financiación estructurada",
        "Impuesto sobre Sociedades",
        "Reorganizaciones fiscales"
      ],
      education: "Licenciada en Derecho y ADE por Universidad de Sevilla, Master en Tributación por Garrigues",
      languages: ["Español", "Inglés"]
    },
    {
      id: "10",
      name: "Roberto Fernández",
      role: "Asociado",
      seniority: "Asociado",
      areas: ["Mercantil", "Empresa Familiar"],
      email: "roberto.fernandez@navarrolegal.es",
      linkedin: "https://linkedin.com",
      miniBio: "Experto en derecho de sociedades y operaciones corporativas. Especializado en apoyo a empresas familiares en crecimiento.",
      fullBio: "Roberto Fernández es Asociado especializado en derecho mercantil con foco en empresas familiares en fase de expansión. Con 4 años de experiencia, ha asesorado a múltiples compañías familiares en sus procesos de profesionalización y crecimiento.\n\nSu práctica incluye la constitución y estructuración de sociedades, redacción de pactos parasociales, operaciones de ampliación de capital y preparación de empresas para procesos de inversión externa.\n\nRoberto destaca por su capacidad para entender las dinámicas particulares de las empresas familiares y proponer soluciones que respeten su esencia mientras facilitan su desarrollo.",
      specializations: [
        "Derecho de sociedades",
        "Empresas familiares en crecimiento",
        "Pactos parasociales",
        "Operaciones de capital",
        "Preparación para inversores externos"
      ],
      education: "Licenciado en Derecho por Universidad Pontificia Comillas, Master en Asesoría Jurídica de Empresas por EAE",
      languages: ["Español", "Inglés"]
    }
  ];

  // Filter and search logic
  const filteredTeam = useMemo(() => {
    return teamMembers
      .filter((member) => {
        // Area filter
        const areaMatch =
          activeArea === "Todas" || member.areas.includes(activeArea as any);

        // Seniority filter
        const seniorityMatch =
          activeSeniority === "Todos" || member.seniority === activeSeniority;

        // Search filter
        const searchLower = searchQuery.toLowerCase();
        const searchMatch =
          searchQuery === "" ||
          member.name.toLowerCase().includes(searchLower) ||
          member.role.toLowerCase().includes(searchLower) ||
          member.miniBio.toLowerCase().includes(searchLower) ||
          member.specializations.some((s) =>
            s.toLowerCase().includes(searchLower)
          ) ||
          member.areas.some((a) => a.toLowerCase().includes(searchLower));

        return areaMatch && seniorityMatch && searchMatch;
      })
      .sort((a, b) => {
        // Sort by seniority first
        const seniorityOrder: Record<string, number> = {
          Socio: 1,
          "Of Counsel": 2,
          Asociado: 3,
        };
        const seniorityDiff =
          seniorityOrder[a.seniority] - seniorityOrder[b.seniority];
        if (seniorityDiff !== 0) return seniorityDiff;

        // Then alphabetically by name
        return a.name.localeCompare(b.name);
      });
  }, [teamMembers, searchQuery, activeArea, activeSeniority]);

  const handleClearFilters = () => {
    setActiveArea("Todas");
    setActiveSeniority("Todos");
    setSearchQuery("");
  };

  const showClearButton =
    activeArea !== "Todas" || activeSeniority !== "Todos" || searchQuery !== "";

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary">
        <div className="container-custom text-center text-primary-foreground animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            Nuestro equipo
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
            Profesionales comprometidos con la excelencia y tu éxito
          </p>
        </div>
      </section>

      {/* Search and Filters Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Experiencia al servicio de tu proyecto
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nuestro equipo multidisciplinar combina décadas de experiencia en
              los mejores despachos internacionales con un enfoque cercano y
              personalizado.
            </p>
          </div>

          {/* Search bar */}
          <div className="mb-12">
            <TeamSearch value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Filters */}
          <div className="mb-12">
            <TeamFilters
              activeArea={activeArea}
              activeSeniority={activeSeniority}
              onAreaChange={setActiveArea}
              onSeniorityChange={setActiveSeniority}
              onClear={handleClearFilters}
              showClear={showClearButton}
            />
          </div>

          {/* Results counter */}
          <div className="mb-8 text-center">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Mostrando {filteredTeam.length} de {teamMembers.length}{" "}
              profesionales
            </p>
          </div>

          {/* Team Grid */}
          {filteredTeam.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeam.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onClick={() => handleMemberClick(member)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <SearchX
                className="mx-auto mb-6 text-muted-foreground"
                size={64}
              />
              <h3 className="text-2xl font-serif font-semibold mb-3">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground mb-6">
                Intenta ajustar los filtros o la búsqueda
              </p>
              {showClearButton && (
                <button
                  onClick={handleClearFilters}
                  className="text-accent hover:text-accent/80 transition-colors"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="section-spacing bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">
                Excelencia
              </div>
              <p className="text-muted-foreground">
                Compromiso inquebrantable con la calidad en cada proyecto que
                asumimos
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">
                Cercanía
              </div>
              <p className="text-muted-foreground">
                Relaciones duraderas basadas en confianza, transparencia y
                disponibilidad
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-serif font-bold text-accent mb-4">
                Innovación
              </div>
              <p className="text-muted-foreground">
                Soluciones creativas que combinan tradición jurídica con visión
                contemporánea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <Card className="p-12 text-center bg-primary text-primary-foreground border-0">
            <h2 className="text-4xl font-serif font-bold mb-4">
              ¿Quieres unirte a nuestro equipo?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Estamos siempre en búsqueda de talento excepcional que comparta
              nuestra visión
            </p>
            <a
              href="mailto:rrhh@navarrolegal.es"
              className="inline-block bg-accent hover:bg-accent/90 text-foreground px-8 py-3 rounded-full font-medium transition-all"
            >
              Envía tu CV
            </a>
          </Card>
        </div>
      </section>

      {/* Team Member Modal */}
      <TeamMemberModal
        member={selectedMember}
        open={isModalOpen}
        onClose={handleCloseModal}
      />

      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Equipo;
