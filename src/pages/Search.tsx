import { usePlayer } from "@/contexts/PlayerContext";
import { useSearch } from "@/contexts/SearchContext";
import { LoaderIcon, MusicIcon, PlayIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Search = () => {
  const { query, results, isLoading, error } = useSearch();
  const { playTrack } = usePlayer();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    // Mock categories
    setCategories([
      {
        name: "Podcasts",
        color: "from-purple-700 to-indigo-500",
        imageUrl: "https://picsum.photos/id/280/200",
      },
      {
        name: "Made For You",
        color: "from-green-700 to-emerald-500",
        imageUrl: "https://picsum.photos/id/281/200",
      },
      {
        name: "Charts",
        color: "from-blue-700 to-cyan-500",
        imageUrl: "https://picsum.photos/id/282/200",
      },
      {
        name: "New Releases",
        color: "from-pink-700 to-rose-500",
        imageUrl: "https://picsum.photos/id/283/200",
      },
      {
        name: "Discover",
        color: "from-yellow-700 to-amber-500",
        imageUrl: "https://picsum.photos/id/284/200",
      },
      {
        name: "Concerts",
        color: "from-red-700 to-orange-500",
        imageUrl: "https://picsum.photos/id/285/200",
      },
      {
        name: "Pop",
        color: "from-indigo-700 to-blue-500",
        imageUrl: "https://picsum.photos/id/286/200",
      },
      {
        name: "Hip-Hop",
        color: "from-slate-700 to-gray-500",
        imageUrl: "https://picsum.photos/id/287/200",
      },
      {
        name: "Rock",
        color: "from-emerald-700 to-green-500",
        imageUrl: "https://picsum.photos/id/288/200",
      },
      {
        name: "Latin",
        color: "from-rose-700 to-pink-500",
        imageUrl: "https://picsum.photos/id/289/200",
      },
      {
        name: "Mood",
        color: "from-violet-700 to-purple-500",
        imageUrl: "https://picsum.photos/id/290/200",
      },
      {
        name: "Dance/Electronic",
        color: "from-cyan-700 to-blue-500",
        imageUrl: "https://picsum.photos/id/291/200",
      },
    ]);
  }, []);

  const handlePlaySong = (song: any) => {
    playTrack({
      title: song.title,
      artist: song.artist,
      albumArt: song.coverImage,
      audioUrl: song.audioUrl,
    });
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="px-6 py-6 pb-28">
      {query.trim() !== "" ? (
        // Search results
        <div>
          <h2 className="text-2xl font-bold mb-4">Top results for "{query}"</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <LoaderIcon
                className="animate-spin text-spotify-green mr-2"
                size={24}
              />
              <span>Searching...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : results.length > 0 ? (
            <div className="w-full">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-sm text-spotify-text border-b border-gray-700">
                    <th className="text-left p-2 pl-0 w-12">#</th>
                    <th className="text-left p-2">Title</th>
                    <th className="text-left p-2">Album</th>
                    <th className="text-left p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((song, index) => (
                    <tr
                      key={song.id}
                      className="group hover:bg-white/10 rounded-md cursor-pointer"
                      onClick={() => handlePlaySong(song)}
                    >
                      <td className="p-2 pl-0 w-12 relative">
                        <span className="group-hover:hidden">{index + 1}</span>
                        <button className="absolute top-1/2 left-0 transform -translate-y-1/2 hidden group-hover:flex items-center justify-center">
                          <PlayIcon className="text-white" size={16} />
                        </button>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <img
                            src={song.coverImage || "https://picsum.photos/100"}
                            alt={song.title}
                            className="w-10 h-10 mr-3"
                            onError={(e) => {
                              e.currentTarget.src = "https://picsum.photos/100";
                            }}
                          />
                          <div>
                            <div className="font-medium">{song.title}</div>
                            <div className="text-sm text-spotify-text">
                              {song.artist}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-spotify-text">{song.album}</td>
                      <td className="p-2 text-spotify-text">
                        {formatDuration(song.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MusicIcon size={48} className="text-spotify-text mb-4" />
              <p className="text-spotify-text">
                No results found for "{query}"
              </p>
              <p className="text-sm text-spotify-text mt-2">
                Try different keywords or check your spelling
              </p>
            </div>
          )}
        </div>
      ) : (
        // Browse categories
        <div>
          <h2 className="text-2xl font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden h-48 cursor-pointer"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color}`}
                ></div>
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="absolute right-0 bottom-0 h-24 w-24 object-cover transform rotate-25 translate-x-4 translate-y-4"
                />
                <h3 className="absolute top-4 left-4 text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mock search results
const mockSearchResults = [
  {
    title: "Today's Top Hits",
    description: "Dua Lipa is on top of the Hottest 50!",
    imageUrl: "https://picsum.photos/id/260/200",
  },
  {
    title: "RapCaviar",
    description: "New music from Drake, Kendrick Lamar and Cardi B.",
    imageUrl: "https://picsum.photos/id/261/200",
  },
  {
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    imageUrl: "https://picsum.photos/id/262/200",
  },
  {
    title: "Rock Classics",
    description:
      "Rock legends & epic songs that continue to inspire generations.",
    imageUrl: "https://picsum.photos/id/263/200",
  },
  {
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    imageUrl: "https://picsum.photos/id/264/200",
  },
  {
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando nuestra música.",
    imageUrl: "https://picsum.photos/id/265/200",
  },
];

export default Search;
