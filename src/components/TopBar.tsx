import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, HomeIcon, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="h-20 bg-spotify-dark sticky top-0 z-50 w-full flex justify-center py-4">
      {/* Container for whole top bar */}
      <div className="w-full flex items-center px-6">
        {/* Left section - Logo */}
        <div className="flex items-center ml-1">
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" alt="Spookify Logo" className="w-10 h-10" />
          </Link>
        </div>

        {/* Middle section - Home button and Search bar */}
        <div className="flex-1 flex items-center justify-center gap-3 mx-2">
          {/* Home button */}
          <Link to="/">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-black/70 w-10 h-10 border border-gray-700"
            >
              <HomeIcon size={20} className="text-white" />
            </Button>
          </Link>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="text-gray-400" size={18} />
            </div>
            <Input
              type="search"
              placeholder="What do you want to play?"
              className="bg-gray-800/80 border-none h-10 pl-10 pr-4 text-white w-full rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>

        {/* Right section - Install app, notification, and user image */}
        <div className="flex items-center gap-2 mr-1">
          <Button
            variant="outline"
            className="bg-black/70 text-white border border-gray-700 hover:bg-black/80 flex items-center gap-1 text-sm px-3 py-1 h-10 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            Install App
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/70 w-10 h-10 border border-gray-700"
          >
            <BellIcon size={20} className="text-white" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/70 w-10 h-10 overflow-hidden border border-gray-700"
          >
            <img
              src="https://placekitten.com/100/100"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
