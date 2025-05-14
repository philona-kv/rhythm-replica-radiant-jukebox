import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full flex-shrink-0 h-full flex flex-col">
      <nav className="px-5 mt-4 pt-2">
        <p className="text-xs text-spotify-text uppercase font-bold mb-4 pl-2">
          Menu
        </p>
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

      <div className="mt-8 px-5">
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

      <div className="px-5 mt-6 overflow-y-auto flex-grow">
        <div className="border-t border-gray-800/40 pt-4">
          <p className="text-xs text-spotify-text mb-4">PLAYLISTS</p>
          <ul className="space-y-2">
            {[
              "Daily Mix 1",
              "Daily Mix 2",
              "Discover Weekly",
              "Release Radar",
              "Summer Mix",
              "Hip Hop Classics",
              "Trending Now",
            ].map((playlist, index) => (
              <li key={index}>
                <Link
                  to={`/playlist/${index}`}
                  className="text-sm text-spotify-text hover:text-white transition-colors block py-1 px-2"
                >
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
