import { usePlayer } from "@/contexts/PlayerContext";
import { fetchPlaylistById, Playlist, Song } from "@/lib/api";
import { formatDuration } from "@/lib/utils";
import {
  ClockIcon,
  HeartIcon,
  MoreHorizontalIcon,
  PlayIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlaylistView = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playTrack } = usePlayer();

  useEffect(() => {
    const loadPlaylist = async () => {
      if (!id) {
        setError("Playlist ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedPlaylist = await fetchPlaylistById(id);
        setPlaylist(fetchedPlaylist);
        if (!fetchedPlaylist) {
          setError("Playlist not found");
        }
      } catch (err) {
        setError("Failed to load playlist details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlaylist();
  }, [id]);

  const handlePlaySong = (song: Song) => {
    playTrack({
      title: song.title,
      artist: song.artist,
      albumArt: song.coverImage,
      audioUrl: song.audioUrl,
    });
  };

  const calculateTotalDuration = (): string => {
    if (!playlist?.Songs || playlist.Songs.length === 0) return "0 min";

    const totalSeconds = playlist.Songs.reduce(
      (total, song) => total + song.duration,
      0
    );
    const minutes = Math.floor(totalSeconds / 60);

    if (minutes < 60) {
      return `${minutes} min`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours} hr ${remainingMinutes} min`;
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">Loading...</div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="p-8 text-red-500">
        {error || "Failed to load playlist"}
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Playlist header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6 bg-gradient-to-b from-spotify-hover to-spotify-dark">
        <img
          src={playlist.coverImage}
          alt={playlist.name}
          className="w-48 h-48 shadow-2xl"
        />
        <div className="text-center md:text-left">
          <p className="text-sm font-bold uppercase">Playlist</p>
          <h1 className="text-5xl font-extrabold my-2">{playlist.name}</h1>
          <p className="text-sm text-spotify-text">{playlist.description}</p>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <span className="font-bold">
              {playlist.isPublic ? "Public" : "Private"}
            </span>
            <span className="w-1 h-1 rounded-full bg-white inline-block mx-1"></span>
            <span>
              Created {new Date(playlist.createdAt).toLocaleDateString()}
            </span>
            <span className="w-1 h-1 rounded-full bg-white inline-block mx-1"></span>
            <span>{playlist.Songs?.length || 0} songs,</span>
            <span className="text-spotify-text">
              {calculateTotalDuration()}
            </span>
          </div>
        </div>
      </div>

      {/* Playlist controls */}
      <div className="flex items-center gap-6 p-4">
        <button
          className="w-14 h-14 bg-spotify rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          onClick={() =>
            playlist.Songs &&
            playlist.Songs.length > 0 &&
            handlePlaySong(playlist.Songs[0])
          }
          disabled={!playlist.Songs || playlist.Songs.length === 0}
        >
          <PlayIcon size={28} fill="black" className="ml-1" />
        </button>

        <button
          className={`text-2xl ${
            isFollowing ? "text-spotify" : "text-spotify-text"
          }`}
          onClick={() => setIsFollowing(!isFollowing)}
        >
          <HeartIcon size={32} fill={isFollowing ? "#1DB954" : "none"} />
        </button>

        <button className="text-spotify-text">
          <MoreHorizontalIcon size={32} />
        </button>
      </div>

      {/* Song list */}
      <div className="px-6">
        {playlist.Songs && playlist.Songs.length > 0 ? (
          <>
            <div className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 text-spotify-text border-b border-white/10 py-2 px-4 text-sm">
              <div className="text-center">#</div>
              <div>TITLE</div>
              <div>ALBUM</div>
              <div className="flex justify-end">
                <ClockIcon size={16} />
              </div>
            </div>

            {playlist.Songs.map((song, index) => (
              <div
                key={song.id}
                className="grid grid-cols-[16px_4fr_3fr_minmax(120px,1fr)] gap-4 hover:bg-spotify-hover rounded-md py-3 px-4 text-sm group cursor-pointer"
                onClick={() => handlePlaySong(song)}
              >
                <div className="flex items-center justify-center text-spotify-text group-hover:hidden">
                  {index + 1}
                </div>
                <div className="hidden group-hover:flex items-center justify-center text-white">
                  <PlayIcon size={14} />
                </div>
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover hidden sm:block"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{song.title}</div>
                    <div className="text-spotify-text truncate">
                      {song.artist}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-spotify-text truncate">
                  {song.album}
                </div>
                <div className="flex items-center justify-end text-spotify-text">
                  {formatDuration(song.duration)}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-spotify-text mb-4">This playlist is empty</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Add songs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistView;
