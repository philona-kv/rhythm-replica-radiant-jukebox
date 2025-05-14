
import { ChevronLeftIcon, ChevronRightIcon, BellIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const showSearch = location.pathname === "/search";

  return (
    <div className="h-16 flex items-center justify-between px-4 bg-spotify-dark/95 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/60 w-8 h-8"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon size={18} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-black/60 w-8 h-8"
            onClick={() => navigate(1)}
          >
            <ChevronRightIcon size={18} />
          </Button>
        </div>
        
        {showSearch && (
          <div className="relative">
            <Input 
              type="search" 
              placeholder="What do you want to play?" 
              className="bg-white w-80 pl-10 h-10 rounded-full text-black"
            />
            <SearchIcon className="absolute left-3 top-3 text-gray-500" size={16} />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="bg-black/60 text-white border-0 hover:bg-black/80">
          Upgrade
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full bg-black/60 w-8 h-8">
          <BellIcon size={18} />
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full bg-black/60 w-8 h-8">
          <UserIcon size={18} />
        </Button>
      </div>
    </div>
  );
};

const SearchIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default TopBar;
