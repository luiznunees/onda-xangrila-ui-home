
import { useEffect, useState } from "react";
import OndaLogo from "@/components/OndaLogo";
import OndaHomeMenu from "@/components/OndaHomeMenu";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Overlay gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen w-full px-4">
        {/* Container principal com logo ao centro e menus aos lados */}
        <div 
          className={`
            flex items-center justify-between w-full max-w-7xl mx-auto px-6 
            transition-all duration-1000 ease-out
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {/* Menu esquerdo */}
          <OndaHomeMenu position="left" className="w-1/4" />
          
          {/* Logo central */}
          <div className="flex-1 flex justify-center items-center px-4">
            <OndaLogo className="transform scale-125" />
          </div>
          
          {/* Menu direito */}
          <OndaHomeMenu position="right" className="w-1/4" />
        </div>
        
        {/* Indicador de navegação */}
        <div className={`
          absolute bottom-8 left-1/2 transform -translate-x-1/2
          text-white/70 text-sm
          transition-all duration-1000 delay-500
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}>
          Use as setas ↑ ↓ para navegar e OK para selecionar
        </div>
      </div>
    </div>
  );
};

export default Index;
