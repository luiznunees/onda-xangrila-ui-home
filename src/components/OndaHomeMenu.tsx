
import { useEffect, useState } from 'react';
import { useKeyNavigation } from '@/hooks/use-key-navigation';
import MenuCard from './MenuCard';
import { useNavigate } from 'react-router-dom';
import { Folder, Image, Cast, Monitor, Settings } from 'lucide-react';
import { toast } from './ui/use-toast';

type OndaHomeMenuProps = {
  position: 'left' | 'right';
  className?: string;
};

const OndaHomeMenu = ({ position, className = '' }: OndaHomeMenuProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Menu items expandido para Onda Hub 2.0
  const menuItems = [
    { 
      id: 'explorer', 
      label: 'Explorer', 
      icon: Folder,
      action: () => navigate('/explorer'),
      highlight: false // Será true quando pendrive conectado
    },
    { 
      id: 'gallery', 
      label: 'Galeria', 
      icon: Image,
      action: () => navigate('/gallery')
    },
    { 
      id: 'cast', 
      label: 'Transmitir', 
      icon: Cast,
      action: () => navigate('/transmitir')
    },
    { 
      id: 'presentation', 
      label: 'Iniciar Apresentação', 
      icon: Monitor,
      action: () => navigate('/apresentacao')
    },
    { 
      id: 'settings', 
      label: 'Configurações', 
      icon: Settings,
      action: () => navigate('/configuracoes')
    }
  ];
  
  // Divide menu em duas colunas
  const visibleItems = position === 'left'
    ? menuItems.slice(0, 3)  // Primeiros 3 itens para menu esquerdo
    : menuItems.slice(3);    // Restantes para menu direito
    
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
          highlight={item.highlight}
        />
      ))}
    </div>
  );
};

export default OndaHomeMenu;
