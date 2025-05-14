
import { useState, useCallback, useEffect } from 'react';
import { Compass, Cast, Image, Calendar, Bell, Users, Settings } from 'lucide-react';
import MenuCard from './MenuCard';
import { cn } from "@/lib/utils";

interface OndaHomeMenuProps {
  position?: 'left' | 'right';
  className?: string;
}

const menuItems = [
  { icon: Compass, label: "Explorer" },
  { icon: Cast, label: "Transmitir" },
  { icon: Image, label: "Galeria" },
  { icon: Calendar, label: "Agenda" },
  { icon: Bell, label: "Avisos" },
  { icon: Users, label: "Contatos" },
  { icon: Settings, label: "Configurações" }
];

export default function OndaHomeMenu({ position = 'left', className }: OndaHomeMenuProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Simula a navegação com teclado (para teste no navegador)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setActiveIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
          break;
        case 'ArrowDown':
          setActiveIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleItemClick = useCallback((index: number) => {
    setActiveIndex(index);
    // Aqui implementaríamos a navegação para a respectiva tela
    console.log(`Navegando para: ${menuItems[index].label}`);
  }, []);

  return (
    <div className={cn(
      "flex flex-col space-y-4",
      position === 'left' ? 'items-start' : 'items-end',
      isVisible ? "opacity-100" : "opacity-0",
      "transition-all duration-700 ease-out",
      className
    )}>
      {menuItems.map((item, index) => (
        <MenuCard
          key={item.label}
          icon={item.icon}
          label={item.label}
          active={index === activeIndex}
          index={index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}
