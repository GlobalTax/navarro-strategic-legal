import { useScrollProgress } from "@/hooks/useScrollProgress";

const ScrollProgressBar = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-20 left-0 h-[3px] bg-accent z-50 transition-transform duration-100 ease-out"
      style={{ width: `${progress}%`, transformOrigin: "left" }}
      aria-label="Progreso de lectura"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ScrollProgressBar;
