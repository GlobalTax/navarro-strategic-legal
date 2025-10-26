import { Check, Clock } from "lucide-react";

interface ApprovalProgressBarProps {
  marketingApproved: boolean;
  marketingApprovedBy?: string;
  marketingApprovedAt?: string;
  legalApproved: boolean;
  legalApprovedBy?: string;
  legalApprovedAt?: string;
  published: boolean;
  publishedAt?: string;
}

const ApprovalProgressBar = ({
  marketingApproved,
  marketingApprovedBy,
  marketingApprovedAt,
  legalApproved,
  legalApprovedBy,
  legalApprovedAt,
  published,
  publishedAt,
}: ApprovalProgressBarProps) => {
  const steps = [
    {
      label: "Marketing",
      completed: marketingApproved,
      approver: marketingApprovedBy,
      date: marketingApprovedAt,
    },
    {
      label: "Legal",
      completed: legalApproved,
      approver: legalApprovedBy,
      date: legalApprovedAt,
    },
    {
      label: "Publicado",
      completed: published,
      date: publishedAt,
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${
                (steps.filter((s) => s.completed).length / steps.length) * 100
              }%`,
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative z-10 flex-1">
            {/* Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                step.completed
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
              }`}
            >
              {step.completed ? <Check className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
            </div>

            {/* Label */}
            <div className="mt-3 text-center">
              <p className={`text-sm font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
              {step.approver && (
                <p className="text-xs text-muted-foreground mt-1">{step.approver}</p>
              )}
              {step.date && (
                <p className="text-xs text-muted-foreground">
                  {new Date(step.date).toLocaleDateString('es-ES')}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalProgressBar;
