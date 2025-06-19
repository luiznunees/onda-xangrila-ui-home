
import { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

export interface OndaLogoProps {
  className?: string;
  customTitle?: string;
  customSubtitle?: string;
}

export default function OndaLogo({ className, customTitle = "Onda Hub", customSubtitle = "Retiro Onda Xangri-lá 2025" }: OndaLogoProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "flex flex-col items-center justify-center transition-all",
      loaded ? "opacity-100 scale-100" : "opacity-0 scale-95",
      "transition-all duration-700 ease-in-out",
      className
    )}>
      {/* Logo principal */}
      <div className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-r from-white via-onda-light to-onda-primary/90 bg-clip-text text-transparent animate-pulse-light">
        {customTitle}
      </div>
      
      {/* Subtítulo do retiro */}
      <div className="text-lg md:text-xl text-white/80 font-light mt-2">
        {customSubtitle}
      </div>
    </div>
  );
}
