import DailyMixCard from "@/components/DailyMixCard";
import PlaylistCard from "@/components/PlaylistCard";
import { fetchPlaylists, Playlist } from "@/lib/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaylists = async () => {
      try {
        setLoading(true);
        const fetchedPlaylists = await fetchPlaylists();
        setPlaylists(fetchedPlaylists);
        setError(null);
      } catch (err) {
        setError("Failed to load playlists");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylists();
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Use the first 6 playlists for recently played section
  const recentlyPlayedPlaylists = playlists.slice(0, 6);

  return (
    <div className="px-6 py-6 pb-28">
      <h1 className="text-3xl font-bold mb-6">{greeting()}</h1>

      {/* Quick access playlists */}
      {loading ? (
        <div className="mb-8 text-center py-4">Loading playlists...</div>
      ) : error ? (
        <div className="mb-8 text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {recentlyPlayedPlaylists.length > 0 ? (
            recentlyPlayedPlaylists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlist/${playlist.id}`}
                className="flex items-center bg-spotify-light/40 hover:bg-spotify-hover rounded-md overflow-hidden h-14"
              >
                <img
                  src={playlist.coverImage}
                  alt={playlist.name}
                  className="h-14 w-14 object-cover"
                />
                <span className="font-bold text-sm ml-4">{playlist.name}</span>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-4 text-spotify-text">
              No playlists found
            </div>
          )}
        </div>
      )}

      {/* Made for you section */}
      <section className="mb-8" id="daily-mixes">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Made for you</h2>
          <Link
            to="/made-for-you"
            className="text-sm text-spotify-text font-bold hover:underline"
          >
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {dailyMixes.map((mix, index) => (
            <DailyMixCard
              key={index}
              number={mix.number}
              imageUrl={mix.imageUrl}
              artists={mix.artists}
            />
          ))}
        </div>
      </section>

      {/* Popular playlists */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Popular playlists</h2>
          <Link
            to="/popular-playlists"
            className="text-sm text-spotify-text font-bold hover:underline"
          >
            Show all
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading playlists...</div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <PlaylistCard
                  key={playlist.id}
                  id={playlist.id}
                  title={playlist.name}
                  description={playlist.description}
                  imageUrl={playlist.coverImage}
                />
              ))
            ) : (
              <div className="col-span-6 text-center py-4 text-spotify-text">
                No playlists found
              </div>
            )}
          </div>
        )}
      </section>

      {/* Featured Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Artists</h2>
          <Link
            to="/featured-artists"
            className="text-sm text-spotify-text font-bold hover:underline"
          >
            Show all
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {featuredArtists.map((artist, index) => (
            <div key={index} className="playlist-card group text-center">
              <div className="relative mb-4 shadow-md">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full aspect-square object-cover rounded-full"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-spotify rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 2.69127C3 1.93067 3.81547 1.44851 4.48192 1.81506L13.4819 6.81506C14.1644 7.18868 14.1644 8.11633 13.4819 8.48995L4.48192 13.49C3.81546 13.8565 3 13.3744 3 12.6138V2.69127Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="font-bold text-sm truncate">{artist.name}</h3>
              <p className="text-spotify-text text-xs mt-1">Artist</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Sample data - only keeping these for daily mixes and artists
const dailyMixes = [
  {
    number: "1",
    imageUrl: "https://picsum.photos/id/250/200",
    artists: ["Drake", "Kendrick Lamar", "J. Cole"],
  },
  {
    number: "2",
    imageUrl: "https://picsum.photos/id/251/200",
    artists: ["The Weeknd", "Post Malone", "Dua Lipa"],
  },
  {
    number: "3",
    imageUrl: "https://picsum.photos/id/252/200",
    artists: ["Taylor Swift", "Ariana Grande", "Billie Eilish"],
  },
  {
    number: "4",
    imageUrl: "https://picsum.photos/id/253/200",
    artists: ["Bad Bunny", "J Balvin", "Ozuna"],
  },
  {
    number: "5",
    imageUrl: "https://picsum.photos/id/254/200",
    artists: ["Coldplay", "Imagine Dragons", "OneRepublic"],
  },
  {
    number: "6",
    imageUrl: "https://picsum.photos/id/255/200",
    artists: ["BTS", "BLACKPINK", "TWICE"],
  },
];

const featuredArtists = [
  {
    name: "Drake",
    imageUrl: "https://picsum.photos/id/270/200",
  },
  {
    name: "Ariana Grande",
    imageUrl: "https://picsum.photos/id/271/200",
  },
  {
    name: "BTS",
    imageUrl: "https://picsum.photos/id/272/200",
  },
  {
    name: "Taylor Swift",
    imageUrl: "https://picsum.photos/id/273/200",
  },
  {
    name: "The Weeknd",
    imageUrl: "https://picsum.photos/id/274/200",
  },
  {
    name: "Billie Eilish",
    imageUrl: "https://picsum.photos/id/275/200",
  },
];

export default Home;
