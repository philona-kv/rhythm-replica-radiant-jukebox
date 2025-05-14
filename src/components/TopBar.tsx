import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/contexts/SearchContext";
import {
  BellIcon,
  HomeIcon,
  LoaderIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const TopBar = () => {
  const { query, setQuery, performSearch, clearSearch, isLoading, error } =
    useSearch();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Update the input value immediately for responsive UI
    setQuery(value);

    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Add debounce to avoid too many API calls while typing
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 1000); // Reduced to 1 second instead of 5 for better UX
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
              className={`rounded-full w-10 h-10 border border-gray-700 ${
                location.pathname === "/" ? "bg-white/10" : "bg-black/70"
              }`}
            >
              <HomeIcon size={20} className="text-white" />
            </Button>
          </Link>

          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {isLoading ? (
                <LoaderIcon className="text-gray-400 animate-spin" size={18} />
              ) : (
                <SearchIcon className="text-gray-400" size={18} />
              )}
            </div>
            <Input
              type="search"
              placeholder={
                error
                  ? "Error searching. Try again."
                  : "What do you want to play?"
              }
              className={`bg-gray-800/80 border-none h-10 pl-10 pr-4 text-white w-full rounded-full focus-visible:ring-0 focus-visible:ring-offset-0 ${
                error ? "border-red-500" : ""
              }`}
              value={query}
              onChange={handleSearch}
              disabled={isLoading}
            />
            {query && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={clearSearch}
                disabled={isLoading}
              >
                <XIcon size={18} className="text-gray-400 hover:text-white" />
              </button>
            )}
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
              src="/person.jpg"
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
