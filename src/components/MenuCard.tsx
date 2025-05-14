
import { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MenuCardProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  index: number;
  onClick: () => void;
}

export default function MenuCard({ icon: Icon, label, active = false, index, onClick }: MenuCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100 + (index * 50)); // Efeito cascata para os itens aparecerem em sequência

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <button 
      className={cn(
        "menu-item focus-item outline-none",
        active ? "active" : "",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        "transition-all duration-500 ease-out"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "w-16 h-16 flex items-center justify-center rounded-full",
        active ? "bg-onda-primary" : "bg-onda-dark/50",
        "transition-colors duration-300"
      )}>
        <Icon 
          className={cn(
            "w-7 h-7", 
            active ? "text-white" : "text-white/70"
          )} 
        />
      </div>
      <span className={cn(
        "menu-text",
        active ? "text-white" : "text-white/70"
      )}>
        {label}
      </span>
    </button>
  );
}
