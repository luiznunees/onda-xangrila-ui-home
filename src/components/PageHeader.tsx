
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface PageHeaderProps {
  title: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
}

const PageHeader = ({ title, icon, showBackButton = true }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 p-6 mb-4">
      {showBackButton && (
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 h-10 w-10 rounded-full bg-black/20 hover:bg-black/40 focus-visible:bg-black/40"
          onClick={() => navigate(-1)}
          autoFocus
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Voltar</span>
        </Button>
      )}
      
      <div className="flex items-center gap-3">
        {icon}
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
