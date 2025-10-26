import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  title: string;
}

const TeamMember = ({ name, title }: TeamMemberProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="text-center">
      <Avatar className="w-32 h-32 mx-auto mb-4">
        <AvatarFallback className="text-2xl font-serif bg-accent/20 text-accent-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      <h4 className="text-lg font-serif font-semibold mb-1">{name}</h4>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};

export default TeamMember;
