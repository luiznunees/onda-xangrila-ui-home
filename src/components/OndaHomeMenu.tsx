
import { useEffect, useState } from 'react';
import { useKeyNavigation } from '@/hooks/use-key-navigation';
import MenuCard from './MenuCard';
import { useNavigate } from 'react-router-dom';
import { folder, image } from 'lucide-react';
import { toast } from './ui/use-toast';

type OndaHomeMenuProps = {
  position: 'left' | 'right';
  className?: string;
};

const OndaHomeMenu = ({ position, className = '' }: OndaHomeMenuProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Menu items with their respective icons and actions
  const menuItems = [
    { 
      id: 'explorer', 
      label: 'Explorer', 
      icon: <folder className="w-10 h-10" />,
      action: () => navigate('/explorer')
    },
    { 
      id: 'gallery', 
      label: 'Galeria', 
      icon: <image className="w-10 h-10" />,
      action: () => navigate('/gallery')
    },
    // Os outros itens do menu que serão implementados futuramente
    { 
      id: 'cast', 
      label: 'Transmitir', 
      icon: <folder className="w-10 h-10" />,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'agenda', 
      label: 'Agenda', 
      icon: <folder className="w-10 h-10" />,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'notices', 
      label: 'Avisos', 
      icon: <folder className="w-10 h-10" />,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'contacts', 
      label: 'Contatos', 
      icon: <folder className="w-10 h-10" />,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    }
  ];
  
  // Filter to show only left or right menu items
  const visibleItems = position === 'left'
    ? menuItems.slice(0, 3)  // First 3 items for left menu
    : menuItems.slice(3);    // Rest for right menu
    
  const { focusedIndex } = useKeyNavigation({
    itemCount: visibleItems.length,
    onSelect: (index) => visibleItems[index].action()
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {visibleItems.map((item, index) => (
        <MenuCard
          key={item.id}
          label={item.label}
          icon={item.icon}
          isActive={focusedIndex === index}
          onClick={item.action}
          className={`
            transition-all duration-500 ease-out
            ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            transition-delay-${index * 100}
          `}
        />
      ))}
    </div>
  );
};

export default OndaHomeMenu;
