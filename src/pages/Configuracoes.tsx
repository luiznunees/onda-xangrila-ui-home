
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, Image, Folder, Globe, Monitor, Palette, Shield, Wrench } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { useKeyNavigation } from "@/hooks/use-key-navigation";

const Configuracoes = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const configSections = [
    {
      id: 'screensaver',
      title: 'Protetor de Tela',
      icon: Image,
      description: 'Configurar slideshow e tempo de ativação'
    },
    {
      id: 'files',
      title: 'Pasta de Arquivos',
      icon: Folder,
      description: 'Definir pasta padrão para arquivos'
    },
    {
      id: 'upload',
      title: 'Link de Upload',
      icon: Globe,
      description: 'Configurar domínio e QR Code'
    },
    {
      id: 'mirroring',
      title: 'Espelhamento',
      icon: Monitor,
      description: 'Configurações de transmissão de tela'
    },
    {
      id: 'visual',
      title: 'Personalização Visual',
      icon: Palette,
      description: 'Cores, temas e logo'
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: Shield,
      description: 'Senhas e configurações de acesso'
    }
  ];
  
  const handleBack = () => {
    if (selectedSection) {
      setSelectedSection(null);
    } else {
      navigate("/");
    }
  };

  const handleSelect = (index: number) => {
    setSelectedSection(configSections[index].id);
  };
  
  const { focusedIndex } = useKeyNavigation({
    itemCount: selectedSection ? 0 : configSections.length,
    onSelect: handleSelect,
    onBack: handleBack,
    wrapNavigation: true
  });

  // Modo técnico (oculto)
  useEffect(() => {
    let pressTime = 0;
    let isHolding = false;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && e.key === "ArrowDown") {
        if (!isHolding) {
          pressTime = Date.now();
          isHolding = true;
        }
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (isHolding && Date.now() - pressTime >= 5000) {
        navigate('/modo-tecnico');
      }
      isHolding = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [navigate]);

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 'screensaver':
        return <ScreensaverConfig />;
      case 'files':
        return <FilesConfig />;
      case 'upload':
        return <UploadConfig />;
      case 'mirroring':
        return <MirroringConfig />;
      case 'visual':
        return <VisualConfig />;
      case 'security':
        return <SecurityConfig />;
      default:
        return null;
    }
  };

  if (selectedSection) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-onda">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
        
        <div className="relative z-10 container mx-auto py-4">
          <PageHeader 
            title={configSections.find(s => s.id === selectedSection)?.title || "Configurações"} 
            icon={<Settings className="h-8 w-8" />} 
            showBackButton={true} 
          />
          
          {renderSectionContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Configurações" 
          icon={<Settings className="h-8 w-8" />} 
          showBackButton={true} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 mt-8">
          {configSections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <Card
                key={section.id}
                className={`
                  p-6 cursor-pointer transition-all duration-300
                  ${focusedIndex === index 
                    ? 'bg-onda-primary/30 scale-[1.02] border-onda-primary shadow-lg ring-2 ring-onda-primary' 
                    : 'bg-black/30 hover:bg-black/40 border-white/10'}
                `}
                onClick={() => handleSelect(index)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-onda-primary/20 rounded-full">
                    <IconComponent className="h-6 w-6 text-onda-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <p className="text-white/70 text-sm">{section.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Use as setas para navegar, OK para selecionar e VOLTAR para retornar
        </div>
      </div>
    </div>
  );
};

// Componentes de configuração (mockados)
const ScreensaverConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Configurações do Protetor de Tela</h3>
      <div className="space-y-3 text-white/80">
        <p>⏱️ Tempo para ativar: 5 minutos</p>
        <p>🖼️ Tempo por imagem: 10 segundos</p>
        <p>✨ Efeito de transição: Fade</p>
        <p>📖 Exibir frases bíblicas: Ativado</p>
        <p>📁 Imagens carregadas: 15 fotos</p>
      </div>
    </Card>
  </div>
);

const FilesConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Pasta de Arquivos</h3>
      <div className="space-y-3 text-white/80">
        <p>📁 Caminho atual: /storage/emulated/0/OndaHub/</p>
        <p>🔧 Status: Pasta configurada</p>
        <p>💾 Espaço disponível: 2.1 GB</p>
      </div>
    </Card>
  </div>
);

const UploadConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Link de Upload</h3>
      <div className="space-y-3 text-white/80">
        <p>🌐 Domínio: http://ondahub.local/upload</p>
        <p>📱 QR Code: Disponível</p>
        <p>🔗 Status: Ativo</p>
      </div>
    </Card>
  </div>
);

const MirroringConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Espelhamento</h3>
      <div className="space-y-3 text-white/80">
        <p>📱 Nome do dispositivo: Onda Hub - Sala Principal</p>
        <p>🔐 PIN atual: 1234</p>
        <p>🔒 Modo seguro: Ativado</p>
      </div>
    </Card>
  </div>
);

const VisualConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Personalização Visual</h3>
      <div className="space-y-3 text-white/80">
        <p>🎨 Cor principal: Roxo (#8B5CF6)</p>
        <p>🖼️ Plano de fundo: Gradiente padrão</p>
        <p>🌙 Modo: Escuro</p>
        <p>🏷️ Logo: Texto "Onda Hub"</p>
      </div>
    </Card>
  </div>
);

const SecurityConfig = () => (
  <div className="px-6 space-y-4">
    <Card className="bg-black/30 border-white/20 p-6">
      <h3 className="text-white text-lg mb-4">Segurança</h3>
      <div className="space-y-3 text-white/80">
        <p>🔐 Senha de acesso: Não definida</p>
        <p>🛡️ Configurações bloqueadas: Não</p>
        <p>⚠️ Restaurar configurações: Disponível</p>
      </div>
    </Card>
  </div>
);

export default Configuracoes;
