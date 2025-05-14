import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongs, Song } from "../lib/api";
import { formatDuration } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export function SongList() {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSongs = async () => {
      try {
        setLoading(true);
        const fetchedSongs = await fetchSongs();
        setSongs(fetchedSongs);
        setError(null);
      } catch (err) {
        setError("Failed to load songs. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSongs();
  }, []);

  const handleSongClick = (songId: string) => {
    navigate(`/song/${songId}`);
  };

  if (loading) {
    return <div className="text-center py-8">Loading songs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  if (songs.length === 0) {
    return <div className="text-center py-8">No songs found.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {songs.map((song) => (
        <Card
          key={song.id}
          className="overflow-hidden cursor-pointer hover:bg-accent/50 transition-colors"
          onClick={() => handleSongClick(song.id)}
        >
          <CardHeader className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={song.coverImage} alt={song.title} />
                <AvatarFallback>{song.artist[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{song.title}</CardTitle>
                <CardDescription>{song.artist}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-sm">Album: {song.album}</p>
            <p className="text-sm">Genre: {song.genre}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
            <span>{new Date(song.releaseDate).getFullYear()}</span>
            <span>{formatDuration(song.duration)}</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
