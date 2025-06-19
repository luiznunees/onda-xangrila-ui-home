
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Monitor, Play, Square } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useKeyNavigation } from "@/hooks/use-key-navigation";

const Apresentacao = () => {
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Mock de slides para demonstração
  const slides = [
    { title: "Bem-vindos ao Retiro", content: "Retiro Onda Xangri-lá 2025" },
    { title: "Programação", content: "Confira nossa programação especial" },
    { title: "Avisos Importantes", content: "Mantenha seus pertences seguros" },
  ];

  const handleBack = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
    } else {
      navigate("/");
    }
  };

  const startPresentation = () => {
    setIsFullscreen(true);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  
  const { focusedIndex } = useKeyNavigation({
    itemCount: isFullscreen ? 0 : 1, // Apenas botão iniciar quando não fullscreen
    onSelect: (index) => {
      if (!isFullscreen && index === 0) startPresentation();
    },
    onBack: handleBack,
    wrapNavigation: true
  });

  // Navegação especial para modo fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextSlide();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          prevSlide();
          break;
        case "Escape":
        case "Backspace":
          setIsFullscreen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen]);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl">
          <h1 className="text-6xl font-bold mb-8 text-onda-primary">
            {slides[currentSlide].title}
          </h1>
          <p className="text-3xl mb-12">
            {slides[currentSlide].content}
          </p>
          
          {/* Indicador de slide */}
          <div className="flex justify-center space-x-2 mb-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? 'bg-onda-primary' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <div className="text-white/60 text-lg">
            Use as setas para navegar • VOLTAR para sair
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Iniciar Apresentação" 
          icon={<Monitor className="h-8 w-8" />} 
          showBackButton={true} 
        />
        
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
          <Card className="bg-black/30 border-white/20 p-8 text-center max-w-2xl mx-auto">
            <Monitor className="h-16 w-16 text-onda-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Modo Apresentação</h2>
            <p className="text-white/80 mb-8">
              Inicie o modo de apresentação em tela cheia, sem distrações.
              Ideal para exibir conteúdo durante o retiro.
            </p>
            
            <Button
              className={`
                bg-onda-primary hover:bg-onda-primary/80 text-white px-8 py-4 text-lg
                ${focusedIndex === 0 ? 'ring-2 ring-white scale-105' : ''}
                transition-all duration-200
              `}
              onClick={startPresentation}
            >
              <Play className="h-5 w-5 mr-2" />
              Iniciar Apresentação
            </Button>
            
            <div className="mt-8 text-white/60 text-sm">
              <p>• Use as setas para navegar entre slides</p>
              <p>• Pressione VOLTAR para sair do modo apresentação</p>
              <p>• Conteúdo será exibido em tela cheia</p>
            </div>
          </Card>
        </div>
        
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Use OK para iniciar apresentação e VOLTAR para retornar
        </div>
      </div>
    </div>
  );
};

export default Apresentacao;
