
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cast, Smartphone, Wifi, RefreshCw } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKeyNavigation } from "@/hooks/use-key-navigation";

const Transmitir = () => {
  const navigate = useNavigate();
  const [pin, setPin] = useState("1234");
  const [deviceName, setDeviceName] = useState("Onda Hub - Sala Principal");
  
  const handleBack = () => {
    navigate("/");
  };

  const generateNewPin = () => {
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();
    setPin(newPin);
  };
  
  const { focusedIndex } = useKeyNavigation({
    itemCount: 1, // Apenas o botão de gerar novo PIN
    onSelect: (index) => {
      if (index === 0) generateNewPin();
    },
    onBack: handleBack,
    wrapNavigation: true
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Transmitir Tela" 
          icon={<Cast className="h-8 w-8" />} 
          showBackButton={true} 
        />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
          {/* Card principal com PIN */}
          <Card className="bg-black/30 border-white/20 p-8 text-center max-w-2xl mx-auto">
            <div className="mb-6">
              <Cast className="h-16 w-16 text-onda-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Espelhamento de Tela</h2>
              <p className="text-white/80">Conecte seu dispositivo para compartilhar conteúdo</p>
            </div>
            
            {/* PIN Display */}
            <div className="bg-onda-primary/20 rounded-lg p-6 mb-6">
              <p className="text-white/80 mb-2">PIN de Conexão:</p>
              <div className="text-6xl font-bold text-onda-primary tracking-widest">
                {pin}
              </div>
            </div>
            
            {/* Device Name */}
            <div className="mb-6">
              <p className="text-white/80 mb-2">Nome do Dispositivo:</p>
              <p className="text-xl text-white">{deviceName}</p>
            </div>
            
            {/* Gerar novo PIN button */}
            <Button
              className={`
                bg-onda-primary/20 hover:bg-onda-primary/30 text-white border border-onda-primary/50
                ${focusedIndex === 0 ? 'ring-2 ring-onda-primary scale-105' : ''}
                transition-all duration-200
              `}
              onClick={generateNewPin}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Gerar Novo PIN
            </Button>
          </Card>
          
          {/* Instruções */}
          <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl">
            <Card className="bg-black/20 border-white/10 p-6">
              <Smartphone className="h-8 w-8 text-onda-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Para Smartphones</h3>
              <ol className="text-white/80 space-y-1 text-sm">
                <li>1. Conecte-se na mesma rede Wi-Fi</li>
                <li>2. Abra as configurações de tela</li>
                <li>3. Procure por "Transmitir" ou "Screen Mirror"</li>
                <li>4. Selecione "{deviceName}"</li>
                <li>5. Digite o PIN: <span className="text-onda-primary font-bold">{pin}</span></li>
              </ol>
            </Card>
            
            <Card className="bg-black/20 border-white/10 p-6">
              <Wifi className="h-8 w-8 text-onda-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Requisitos</h3>
              <ul className="text-white/80 space-y-1 text-sm">
                <li>• Dispositivo na mesma rede Wi-Fi</li>
                <li>• Suporte a Miracast ou ChromeCast</li>
                <li>• PIN válido por 5 minutos</li>
                <li>• Qualidade ajusta automaticamente</li>
              </ul>
            </Card>
          </div>
        </div>
        
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Use OK para gerar novo PIN e VOLTAR para retornar
        </div>
      </div>
    </div>
  );
};

export default Transmitir;
