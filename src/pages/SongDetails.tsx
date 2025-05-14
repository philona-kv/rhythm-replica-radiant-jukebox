import { Button } from "@/components/ui/button";
import { fetchSongById, Song } from "@/lib/api";
import { formatDuration } from "@/lib/utils";
import { ArrowLeft, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function SongDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSong = async () => {
      if (!id) {
        setError("Song ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedSong = await fetchSongById(id);
        setSong(fetchedSong);
        if (!fetchedSong) {
          setError("Song not found");
        }
      } catch (err) {
        setError("Failed to load song details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSong();
  }, [id]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // Here you would actually implement audio playback
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error || !song) {
    return (
      <div className="p-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft size={20} />
        </Button>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-muted-foreground">{error || "Song not found"}</p>
        </div>
      </div>
    );
  }

  const releaseDate = new Date(song.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 pb-24">
      <Button variant="ghost" size="icon" onClick={handleBack} className="mb-6">
        <ArrowLeft size={20} />
      </Button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-full aspect-square object-cover rounded-md shadow-lg"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-3xl font-bold mb-2">{song.title}</h1>
          <h2 className="text-xl mb-4">{song.artist}</h2>

          <div className="flex items-center gap-4 mb-8">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-spotify hover:bg-spotify/90"
              onClick={togglePlayback}
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )}
            </Button>
          </div>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="flex gap-8">
              <div>
                <p className="font-medium text-primary">Album</p>
                <p>{song.album}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Genre</p>
                <p>{song.genre}</p>
              </div>
              <div>
                <p className="font-medium text-primary">Duration</p>
                <p>{formatDuration(song.duration)}</p>
              </div>
            </div>
            <div>
              <p className="font-medium text-primary">Release Date</p>
              <p>{releaseDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
