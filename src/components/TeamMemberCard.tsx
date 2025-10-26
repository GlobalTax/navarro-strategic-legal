import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin } from "lucide-react";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  seniority: "Socio" | "Asociado" | "Of Counsel";
  areas: Array<"Fiscal" | "Mercantil" | "Laboral" | "M&A" | "Empresa Familiar">;
  email: string;
  linkedin?: string;
  photo?: string;
  miniBio: string;
  fullBio: string;
  specializations: string[];
  education?: string;
  languages?: string[];
}

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

const areaBadgeColors = {
  Fiscal: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Mercantil: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Laboral: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "M&A": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Empresa Familiar": "bg-accent/20 text-accent dark:bg-accent/30",
};

const TeamMemberCard = ({ member, onClick }: TeamMemberCardProps) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver perfil de ${member.name}`}
      className="group cursor-pointer bg-background border border-border rounded-2xl p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
    >
      {/* Photo */}
      <div className="flex justify-center mb-6">
        <Avatar className="w-32 h-32 transition-all duration-300 group-hover:ring-4 group-hover:ring-accent/50">
          {member.photo ? (
            <AvatarImage src={member.photo} alt={member.name} />
          ) : null}
          <AvatarFallback className="text-2xl font-serif bg-accent/20 text-accent-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Name with underline animation */}
      <h3 className="text-xl font-serif font-semibold mb-1 text-center relative name-underline">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-accent font-medium mb-3 text-center text-sm">
        {member.role}
      </p>

      {/* Area badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {member.areas.map((area) => (
          <Badge
            key={area}
            variant="secondary"
            className={`text-xs ${areaBadgeColors[area]}`}
          >
            {area}
          </Badge>
        ))}
      </div>

      {/* Mini bio */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 text-center">
        {member.miniBio}
      </p>

      {/* Contact icons */}
      <div className="flex gap-4 justify-center">
        <a
          href={`mailto:${member.email}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
          aria-label={`Enviar email a ${member.name}`}
        >
          <Mail size={16} />
        </a>
        {member.linkedin && (
          <a
            href={member.linkedin}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            aria-label={`Ver perfil de LinkedIn de ${member.name}`}
          >
            <Linkedin size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default TeamMemberCard;
