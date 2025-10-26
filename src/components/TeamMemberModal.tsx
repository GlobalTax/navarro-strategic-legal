import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import type { TeamMember } from "./TeamMemberCard";

interface TeamMemberModalProps {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
}

const areaBadgeColors = {
  Fiscal: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Mercantil: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Laboral: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "M&A": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Empresa Familiar": "bg-accent/20 text-accent dark:bg-accent/30",
};

const TeamMemberModal = ({ member, open, onClose }: TeamMemberModalProps) => {
  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">
            Perfil de {member.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with photo and basic info */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-40 h-40 flex-shrink-0">
              {member.photo ? (
                <AvatarImage src={member.photo} alt={member.name} />
              ) : null}
              <AvatarFallback className="text-3xl font-serif bg-accent/20 text-accent-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-serif font-bold mb-2">
                {member.name}
              </h2>
              <p className="text-accent font-medium text-lg mb-3">
                {member.role}
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {member.areas.map((area) => (
                  <Badge
                    key={area}
                    variant="secondary"
                    className={areaBadgeColors[area]}
                  >
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Full bio */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Biografía</h3>
            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
              {member.fullBio}
            </p>
          </div>

          {/* Specializations */}
          {member.specializations.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Especialización</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {member.specializations.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Education */}
          {member.education && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Formación</h3>
              <p className="text-muted-foreground">{member.education}</p>
            </div>
          )}

          {/* Languages */}
          {member.languages && member.languages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Idiomas</h3>
              <p className="text-muted-foreground">
                {member.languages.join(", ")}
              </p>
            </div>
          )}

          {/* Contact section */}
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  <Linkedin size={20} />
                  <span>Ver perfil en LinkedIn</span>
                </a>
              )}
            </div>

            <Button
              onClick={() => {
                window.location.href = `mailto:${member.email}`;
              }}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              <Mail className="mr-2" size={20} />
              Contactar por email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberModal;
