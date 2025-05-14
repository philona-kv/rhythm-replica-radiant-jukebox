import {
  ChevronLeft,
  ExternalLinkIcon,
  HeartIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full h-full flex-shrink-0 flex flex-col bg-black text-white">
      {/* Header with Your Library and create button */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <ChevronLeft size={22} className="mr-2" />
          <h2 className="text-xl font-bold">Your Library</h2>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors">
          <PlusIcon size={20} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors">
          <ExternalLinkIcon size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-2 flex space-x-2 mb-2">
        <button className="bg-gray-800 rounded-full px-4 py-1.5 text-sm font-medium">
          Playlists
        </button>
        <button className="bg-gray-800 rounded-full px-4 py-1.5 text-sm font-medium">
          Artists
        </button>
        <button className="bg-gray-800 rounded-full px-4 py-1.5 text-sm font-medium">
          Albums
        </button>
      </div>

      {/* Search bar */}
      <div className="mx-4 mb-4 relative">
        <SearchIcon
          size={20}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          className="bg-gray-800 w-full rounded-md py-2 pl-8 text-sm"
          placeholder="Search in Your Library"
        />
      </div>

      {/* Recents header */}
      <div className="px-4 flex justify-end">
        <button className="flex items-center text-gray-400 text-sm font-medium">
          Recents
        </button>
      </div>

      {/* Library items */}
      <div className="overflow-y-auto custom-scrollbar flex-grow px-4 pb-4">
        <ul className="space-y-3 py-2">
          {/* Liked Songs */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-700 to-blue-400 flex items-center justify-center rounded-md">
                <HeartIcon size={16} fill="white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Liked Songs</h3>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <span className="text-green-500">Playlist</span> • 7 songs
                </p>
              </div>
            </Link>
          </li>

          {/* Hot Hits Punjabi */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/250/200"
                alt="Hot Hits Punjabi"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-sm">Hot Hits Punjabi</h3>
                <p className="text-gray-400 text-xs">Playlist • Spotify</p>
              </div>
            </Link>
          </li>

          {/* Favs */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <div className="w-12 h-12 grid grid-cols-2 grid-rows-2 rounded-md overflow-hidden">
                <img
                  src="https://picsum.photos/id/251/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/252/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/253/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/254/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">Favs</h3>
                <p className="text-gray-400 text-xs">
                  Playlist • Ashish S Kumar
                </p>
              </div>
            </Link>
          </li>

          {/* Trending Now Malayalam */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/255/200"
                alt="Trending Now Malayalam"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-sm">Trending Now Malayalam</h3>
                <p className="text-gray-400 text-xs">Playlist • Spotify</p>
              </div>
            </Link>
          </li>

          {/* RAP 91 Malayalam */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/261/200"
                alt="RAP 91 Malayalam"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-sm">RAP 91 Malayalam</h3>
                <p className="text-gray-400 text-xs">Playlist • Spotify</p>
              </div>
            </Link>
          </li>

          {/* Black Dog: Being a Teacher */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/263/200"
                alt="Black Dog: Being a Teacher"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-sm">
                  Black Dog: Being a Teacher (Ori...
                </h3>
                <p className="text-gray-400 text-xs">Single • KLANG</p>
              </div>
            </Link>
          </li>

          {/* Music To Be Murdered By */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/264/200"
                alt="Music To Be Murdered By"
                className="w-12 h-12 object-cover rounded-md"
              />
              <div>
                <h3 className="font-bold text-sm">Music To Be Murdered By</h3>
                <p className="text-gray-400 text-xs">Album • Eminem</p>
              </div>
            </Link>
          </li>

          {/* Sean paul */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <div className="w-12 h-12 grid grid-cols-2 grid-rows-2 rounded-md overflow-hidden">
                <img
                  src="https://picsum.photos/id/270/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/271/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/273/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
                <img
                  src="https://picsum.photos/id/274/200"
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm">Sean paul</h3>
                <p className="text-gray-400 text-xs">
                  Playlist • Ashish S Kumar
                </p>
              </div>
            </Link>
          </li>

          {/* Sean Paul */}
          <li>
            <Link to="/#daily-mixes" className="flex items-center gap-3">
              <img
                src="https://picsum.photos/id/272/200"
                alt="Sean Paul"
                className="w-12 h-12 object-cover rounded-full"
              />
              <div>
                <h3 className="font-bold text-sm">Sean Paul</h3>
                <p className="text-gray-400 text-xs">Artist</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
