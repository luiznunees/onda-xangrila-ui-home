import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GalleryHorizontal, Image, Play, Pause, CircleX, CircleChevronLeft, CircleChevronRight, CirclePlay } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { useKeyNavigation } from "@/hooks/use-key-navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// Mock data para exemplificar a navegação
const mockMediaItems = [
  { id: 1, name: "Foto1.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?1" },
  { id: 2, name: "Foto2.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?2" },
  { id: 3, name: "Foto3.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?3" },
  { id: 4, name: "Video1.mp4", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://source.unsplash.com/random/800x600?video1" },
  { id: 5, name: "Foto4.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?4" },
  { id: 6, name: "Foto5.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?5" },
  { id: 7, name: "Video2.mp4", type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", thumbnail: "https://source.unsplash.com/random/800x600?video2" },
  { id: 8, name: "Foto6.jpg", type: "image", src: "https://source.unsplash.com/random/800x600?6" },
  { id: 9, name: "Slideshow1", type: "slideshow", items: [
    { src: "https://source.unsplash.com/random/800x600?slide1" },
    { src: "https://source.unsplash.com/random/800x600?slide2" },
    { src: "https://source.unsplash.com/random/800x600?slide3" },
  ]},
];

interface MediaItem {
  id: number;
  name: string;
  type: string;
  src?: string;
  thumbnail?: string;
  items?: {src: string}[];
}

const MediaGallery = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state as { initialItem?: MediaItem, type?: string, source?: string } || {};
  
  const [mediaItems] = useState<MediaItem[]>(mockMediaItems);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredItems = activeFilter === "all" 
    ? mediaItems 
    : mediaItems.filter(item => item.type === activeFilter);
  
  const { focusedIndex, setFocusedIndex } = useKeyNavigation({
    gridMode: true,
    columns: 3,
    itemCount: filteredItems.length,
    onSelect: (index) => handleItemSelect(filteredItems[index]),
    onBack: () => navigate("/"),
    wrapNavigation: true
  });

  useEffect(() => {
    if (initialState.initialItem) {
      handleItemSelect(initialState.initialItem);
    }
  }, [initialState]);

  const handleItemSelect = (item: MediaItem) => {
    setSelectedItem(item);
    setCurrentSlideIndex(0);
    
    if (item.type === "slideshow") {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const handleMediaClose = () => {
    setSelectedItem(null);
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (!selectedItem) return;
    
    if (selectedItem.type === "slideshow" && selectedItem.items) {
      setCurrentSlideIndex((prev) => 
        (prev + 1) % selectedItem.items!.length
      );
    } else {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
      if (currentIndex < filteredItems.length - 1) {
        setSelectedItem(filteredItems[currentIndex + 1]);
        setFocusedIndex(currentIndex + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (!selectedItem) return;
    
    if (selectedItem.type === "slideshow" && selectedItem.items) {
      setCurrentSlideIndex((prev) => 
        (prev - 1 + selectedItem.items!.length) % selectedItem.items!.length
      );
    } else {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
      if (currentIndex > 0) {
        setSelectedItem(filteredItems[currentIndex - 1]);
        setFocusedIndex(currentIndex - 1);
      }
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Renderiza o conteúdo do dialog com base no tipo de mídia
  const renderMediaContent = () => {
    if (!selectedItem) return null;
    
    switch (selectedItem.type) {
      case "image":
        return (
          <img 
            src={selectedItem.src} 
            alt={selectedItem.name} 
            className="max-h-[80vh] max-w-full object-contain mx-auto"
          />
        );
      case "video":
        return (
          <video 
            src={selectedItem.src} 
            controls 
            autoPlay={isPlaying}
            className="max-h-[80vh] max-w-full mx-auto"
          />
        );
      case "slideshow":
        return selectedItem.items && selectedItem.items.length > 0 ? (
          <div className="relative">
            <img 
              src={selectedItem.items[currentSlideIndex].src} 
              alt={`Slide ${currentSlideIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain mx-auto"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 px-3 py-1 rounded text-white">
              {currentSlideIndex + 1} / {selectedItem.items.length}
            </div>
          </div>
        ) : <div>Sem imagens no slideshow</div>;
      default:
        return <div>Tipo de mídia não suportado</div>;
    }
  };
  
  // Effect para slideshow automático
  useEffect(() => {
    if (selectedItem?.type === "slideshow" && isPlaying && selectedItem.items) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => 
          (prev + 1) % selectedItem.items!.length
        );
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [selectedItem, isPlaying, currentSlideIndex]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      {/* Overlay gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Galeria de Mídia" 
          icon={<GalleryHorizontal className="h-8 w-8" />} 
          showBackButton={true}
        />
        
        {/* Filtros */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/30 rounded-full p-1 flex">
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'all' ? 'bg-onda-primary text-white' : 'text-white/70'}`}
              onClick={() => setActiveFilter('all')}
            >
              Todos
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'image' ? 'bg-onda-primary text-white' : 'text-white/70'}`}
              onClick={() => setActiveFilter('image')}
            >
              Imagens
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'video' ? 'bg-onda-primary text-white' : 'text-white/70'}`}
              onClick={() => setActiveFilter('video')}
            >
              Vídeos
            </button>
            <button 
              className={`px-4 py-2 rounded-full ${activeFilter === 'slideshow' ? 'bg-onda-primary text-white' : 'text-white/70'}`}
              onClick={() => setActiveFilter('slideshow')}
            >
              Slideshows
            </button>
          </div>
        </div>
        
        {/* Informação de origem (se disponível) */}
        {initialState.source && (
          <div className="px-6 mb-4 text-white/80">
            <p>Fonte: {initialState.source}</p>
          </div>
        )}
        
        {/* Grade de miniaturas */}
        <ScrollArea className="h-[calc(100vh-250px)] px-6">
          <div className="grid grid-cols-3 gap-4">
            {filteredItems.map((item, index) => (
              <Card
                key={item.id}
                className={`
                  aspect-video relative overflow-hidden cursor-pointer transition-all duration-300
                  ${focusedIndex === index 
                    ? 'ring-4 ring-onda-primary scale-[1.05] shadow-lg shadow-onda-primary/30' 
                    : 'ring-0'}
                `}
                onClick={() => handleItemSelect(item)}
              >
                <img 
                  src={item.type === 'video' ? item.thumbnail : (
                    item.type === 'slideshow' && item.items ? item.items[0].src : item.src
                  )} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay com informações */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-sm truncate pr-4">{item.name}</p>
                    
                    {item.type === 'video' && (
                      <Play className="h-5 w-5 text-white bg-black/50 rounded-full p-1" />
                    )}
                    
                    {item.type === 'slideshow' && (
                      <CirclePlay className="h-5 w-5 text-white" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        
        {/* Navigation help */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Use as setas para navegar, OK para visualizar e VOLTAR para retornar
        </div>
        
        {/* Media Viewer Dialog */}
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && handleMediaClose()}>
          <DialogContent className="sm:max-w-[90vw] bg-black/90 border-white/20">
            <div className="relative pt-8">
              {/* Controles superiores */}
              <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 bg-gradient-to-b from-black/70 to-transparent">
                <h2 className="text-white text-lg">{selectedItem?.name}</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleMediaClose}
                  className="text-white hover:bg-white/20"
                >
                  <CircleX className="h-6 w-6" />
                </Button>
              </div>
              
              {/* Conteúdo da mídia */}
              <div className="flex items-center justify-center min-h-[50vh]">
                {renderMediaContent()}
              </div>
              
              {/* Controles inferiores */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 bg-gradient-to-t from-black/70 to-transparent">
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevious}
                    className="text-white hover:bg-white/20 h-12 w-12 rounded-full"
                  >
                    <CircleChevronLeft className="h-10 w-10" />
                  </Button>
                  
                  {(selectedItem?.type === "video" || selectedItem?.type === "slideshow") && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={togglePlayPause}
                      className="text-white hover:bg-white/20 h-12 w-12 rounded-full"
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8" />
                      )}
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNext}
                    className="text-white hover:bg-white/20 h-12 w-12 rounded-full"
                  >
                    <CircleChevronRight className="h-10 w-10" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MediaGallery;
