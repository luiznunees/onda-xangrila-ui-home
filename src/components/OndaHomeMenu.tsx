
import { useEffect, useState } from 'react';
import { useKeyNavigation } from '@/hooks/use-key-navigation';
import MenuCard from './MenuCard';
import { useNavigate } from 'react-router-dom';
import { Folder, Image, Cast, Calendar, Bell, Contact, Settings } from 'lucide-react';
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
      icon: Folder,
      action: () => navigate('/explorer')
    },
    { 
      id: 'gallery', 
      label: 'Galeria', 
      icon: Image,
      action: () => navigate('/gallery')
    },
    // Os outros itens do menu que serão implementados futuramente
    { 
      id: 'cast', 
      label: 'Transmitir', 
      icon: Cast,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'agenda', 
      label: 'Agenda', 
      icon: Calendar,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'notices', 
      label: 'Avisos', 
      icon: Bell,
      action: () => toast({ title: "Em breve", description: "Este recurso será implementado em uma próxima atualização." })
    },
    { 
      id: 'contacts', 
      label: 'Contatos', 
      icon: Contact,
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
          active={focusedIndex === index}
          onClick={item.action}
          index={index}
        />
      ))}
    </div>
  );
};

export default OndaHomeMenu;
