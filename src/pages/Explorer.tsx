
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { folder, fileImage, fileVideo, folderOpen } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useKeyNavigation } from "@/hooks/use-key-navigation";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

// Mock data - para exemplificar a navegação
const mockFileSystem = {
  root: {
    type: "folder",
    items: [
      { name: "Documentos", type: "folder", items: [] },
      { name: "Fotos", type: "folder", items: [
        { name: "Imagem1.jpg", type: "image" },
        { name: "Imagem2.jpg", type: "image" },
      ] },
      { name: "Vídeos", type: "folder", items: [
        { name: "Video1.mp4", type: "video" },
        { name: "Video2.mp4", type: "video" },
      ] },
      { name: "Apresentação.jpg", type: "image" },
      { name: "Tutorial.mp4", type: "video" },
    ]
  },
};

interface FileItem {
  name: string;
  type: string;
  items?: FileItem[];
}

const Explorer = () => {
  const navigate = useNavigate();
  const { path } = useParams<{ path: string }>();
  const [currentPath, setCurrentPath] = useState<string[]>(path ? path.split('/') : []);
  const [files, setFiles] = useState<FileItem[]>([]);
  
  useEffect(() => {
    // Em um app real, isto seria substituído por uma API para buscar arquivos
    let currentFolder: any = mockFileSystem.root;
    
    if (currentPath.length > 0) {
      for (const segment of currentPath) {
        if (!segment) continue;
        const found = currentFolder.items.find((item: FileItem) => 
          item.type === "folder" && item.name === segment
        );
        if (found) currentFolder = found;
        else {
          toast({
            title: "Pasta não encontrada",
            description: `A pasta "${segment}" não existe.`,
            variant: "destructive"
          });
          setCurrentPath([]);
          return;
        }
      }
    }
    
    setFiles(currentFolder.items || []);
  }, [currentPath]);
  
  const handleOpenItem = (index: number) => {
    const item = files[index];
    
    if (item.type === "folder") {
      setCurrentPath(prev => [...prev, item.name]);
      navigate(`/explorer/${[...currentPath, item.name].join('/')}`);
    } else if (item.type === "image" || item.type === "video") {
      navigate("/gallery", { 
        state: { 
          initialItem: item,
          type: item.type,
          source: currentPath.length ? currentPath.join('/') : 'root'
        } 
      });
    }
  };
  
  const handleBack = () => {
    if (currentPath.length === 0) {
      navigate("/");
    } else {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);
      navigate(`/explorer/${newPath.join('/')}`);
    }
  };
  
  const { focusedIndex } = useKeyNavigation({
    itemCount: files.length,
    onSelect: handleOpenItem,
    onBack: handleBack,
    wrapNavigation: true
  });
  
  // Renderiza o ícone apropriado para cada tipo de item
  const getItemIcon = (item: FileItem) => {
    switch(item.type) {
      case "folder":
        return <folderOpen className="h-8 w-8 text-onda-primary" />;
      case "image":
        return <fileImage className="h-8 w-8 text-blue-400" />;
      case "video":
        return <fileVideo className="h-8 w-8 text-red-400" />;
      default:
        return <folder className="h-8 w-8 text-gray-400" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-onda">
      {/* Overlay gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-onda-dark/20 to-onda-dark/50 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto py-4">
        <PageHeader 
          title="Explorer" 
          icon={<folder className="h-8 w-8" />} 
          showBackButton={true} 
        />
        
        {/* Breadcrumb navigation */}
        <div className="flex items-center mb-6 text-white/80 overflow-x-auto px-6">
          <button 
            onClick={() => {
              setCurrentPath([]);
              navigate("/explorer");
            }}
            className="hover:text-white flex-shrink-0"
          >
            Armazenamento
          </button>
          
          {currentPath.map((segment, index) => (
            <div key={index} className="flex items-center">
              <span className="mx-2">&gt;</span>
              <button 
                onClick={() => {
                  const newPath = currentPath.slice(0, index + 1);
                  setCurrentPath(newPath);
                  navigate(`/explorer/${newPath.join('/')}`);
                }}
                className="hover:text-white flex-shrink-0"
              >
                {segment}
              </button>
            </div>
          ))}
        </div>
        
        {/* Files and folders list */}
        <ScrollArea className="h-[calc(100vh-200px)] px-6">
          <div className="space-y-2">
            {files.length === 0 ? (
              <div className="text-center text-white/70 py-12">
                <p>Esta pasta está vazia.</p>
              </div>
            ) : (
              files.map((item, index) => (
                <Card
                  key={index}
                  className={`
                    flex items-center p-4 cursor-pointer transition-all
                    ${focusedIndex === index 
                      ? 'bg-onda-primary/30 scale-[1.02] border-onda-primary shadow-lg' 
                      : 'bg-black/30 hover:bg-black/40 border-white/10'}
                  `}
                  onClick={() => handleOpenItem(index)}
                  tabIndex={0}
                >
                  <div className="mr-4">
                    {getItemIcon(item)}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white text-lg">{item.name}</p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
        
        {/* Navigation help */}
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
          Use as setas ↑ ↓ para navegar, OK para selecionar e VOLTAR para retornar
        </div>
      </div>
    </div>
  );
};

export default Explorer;
