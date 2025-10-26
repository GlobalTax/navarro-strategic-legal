import { useEffect, useState } from "react";

export const useStickyCTA = () => {
  const [showCTA, setShowCTA] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolledHalf = scrollY > window.innerHeight * 0.5;
      const scrollingDown = scrollY > lastScrollY;

      setShowCTA(scrolledHalf && scrollingDown);
      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return showCTA;
};
