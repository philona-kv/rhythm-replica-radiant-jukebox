
import { HomeIcon, SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-black w-64 flex-shrink-0 h-full flex flex-col">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-1">
          <svg viewBox="0 0 32 32" width="32" height="32" fill="white">
            <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm7.3 23.2c-.3.4-.8.6-1.3.3-3.5-2.1-7.9-2.6-13.1-1.4-.5.1-1-.2-1.1-.7s.2-1 .7-1.1c5.7-1.3 10.6-.7 14.5 1.7.5.2.7.8.3 1.2zm2-4.3c-.3.5-1 .8-1.6.4-4-2.5-10.1-3.2-14.8-1.7-.6.1-1.3-.2-1.4-.8-.1-.6.2-1.3.8-1.4 5.4-1.6 12.1-.8 16.7 2 .6.2.8.9.3 1.5zm.1-4.5c-4.8-2.8-12.7-3.1-17.2-1.7-.7.2-1.5-.2-1.7-1-.2-.7.2-1.5 1-1.7 5.2-1.6 13.9-1.3 19.3 2 .7.4.9 1.3.5 1.9-.3.6-1.2.8-1.9.5z" />
          </svg>
          <span className="text-white font-bold text-2xl">Spotify</span>
        </Link>
      </div>
      
      <nav className="px-4 mt-4">
        <ul className="space-y-2">
          <li>
            <Link to="/" className="sidebar-item active-sidebar-item">
              <HomeIcon size={22} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/search" className="sidebar-item">
              <SearchIcon size={22} />
              <span>Search</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className="sidebar-item">
              <LibraryIcon size={22} />
              <span>Your Library</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="mt-8 px-4">
        <ul className="space-y-2">
          <li>
            <button className="sidebar-item">
              <PlusCircleIcon size={22} />
              <span>Create Playlist</span>
            </button>
          </li>
          <li>
            <Link to="/liked" className="sidebar-item">
              <HeartIcon size={22} fill="white" className="text-spotify" />
              <span>Liked Songs</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="px-4 mt-6 overflow-y-auto flex-grow">
        <div className="border-t border-gray-800 pt-4">
          <p className="text-xs text-spotify-text mb-4">PLAYLISTS</p>
          <ul className="space-y-2">
            {["Daily Mix 1", "Daily Mix 2", "Discover Weekly", "Release Radar", "Summer Mix", "Hip Hop Classics", "Trending Now"].map((playlist, index) => (
              <li key={index}>
                <Link to={`/playlist/${index}`} className="text-sm text-spotify-text hover:text-white transition-colors block py-1">
                  {playlist}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
