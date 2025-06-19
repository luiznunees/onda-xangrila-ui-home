
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Wifi, HardDrive, RotateCcw, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKeyNavigation } from "@/hooks/use-key-navigation";

const ModoTecnico = () => {
  const navigate = useNavigate();
  const [systemInfo, setSystemInfo] = useState({
    networkStatus: "Conectado - 192.168.1.100",
    connectedDrives: ["Pendrive Onda 1 (8GB)", "Armazenamento Interno (32GB)"],
    appVersion: "Onda Hub 2.0 Beta",
    lastRestart: "Hoje, 14:30"
  });
  
  const actions = [
    { id: 'restart', label: 'Reiniciar App', icon: RotateCcw, action: () => window.location.reload() },
    { id: 'close', label: 'Fechar App', icon: X, action: () => window.close() }
  ];
  
  const { focusedIndex } = useKeyNavigation({
    itemCount: actions.length,
    onSelect: (index) => actions[index].action(),
    onBack: () => navigate("/configuracoes"),
    wrapNavigation: true
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Modo Técnico" 
          icon={<Wrench className="h-8 w-8" />} 
          showBackButton={true} 
        />
        
        <div className="px-6 space-y-6">
          {/* Status da Rede */}
          <Card className="bg-black/30 border-white/20 p-6">
            <div className="flex items-center mb-4">
              <Wifi className="h-6 w-6 text-onda-primary mr-3" />
              <h3 className="text-lg font-semibold text-white">Status da Rede</h3>
            </div>
            <p className="text-white/80">{systemInfo.networkStatus}</p>
          </Card>
          
          {/* Pendrives Conectados */}
          <Card className="bg-black/30 border-white/20 p-6">
            <div className="flex items-center mb-4">
              <HardDrive className="h-6 w-6 text-onda-primary mr-3" />
              <h3 className="text-lg font-semibold text-white">Dispositivos de Armazenamento</h3>
            </div>
            <div className="space-y-2">
              {systemInfo.connectedDrives.map((drive, index) => (
                <p key={index} className="text-white/80">• {drive}</p>
              ))}
            </div>
          </Card>
          
          {/* Informações do Sistema */}
          <Card className="bg-black/30 border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Informações do Sistema</h3>
            <div className="space-y-2 text-white/80">
              <p>Versão: {systemInfo.appVersion}</p>
              <p>Último reinício: {systemInfo.lastRestart}</p>
              <p>Tempo ativo: 2h 15min</p>
            </div>
          </Card>
          
          {/* Ações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {actions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  className={`
                    bg-red-600/20 hover:bg-red-600/30 text-white border border-red-600/50 p-6 h-auto
                    ${focusedIndex === index ? 'ring-2 ring-red-500 scale-105' : ''}
                    transition-all duration-200
                  `}
                  onClick={action.action}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <IconComponent className="h-8 w-8" />
                    <span className="text-lg">{action.label}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
        
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          ⚠️ Modo Técnico - Use com cuidado
        </div>
      </div>
    </div>
  );
};

export default ModoTecnico;
