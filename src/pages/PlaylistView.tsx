import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClockIcon, HeartIcon, MoreHorizontalIcon, PlayIcon } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";

interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
  addedAt: string;
  audioUrl: string;
  albumArt: string;
}

const PlaylistView = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<any>(null);
  const [songs, setSongs] = useState<Song[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { playTrack } = usePlayer();
  
  useEffect(() => {
    // Mock playlist data
    setPlaylist({
      name: "Daily Mix 1",
      description: "Drake, Kendrick Lamar, J. Cole and more",
      imageUrl: "https://picsum.photos/id/237/400",
      ownerName: "Spotify",
      followers: "123,456",
      totalSongs: 25,
      duration: "1 hr 22 min"
    });
    
    // Mock song data with local audio files
    setSongs(generateMockSongs(25));
  }, [id]);

  const handlePlaySong = (song: Song) => {
    playTrack({
      title: song.title,
      artist: song.artist,
      albumArt: song.albumArt,
      audioUrl: song.audioUrl
    });
  };
  
  if (!playlist) {
    return <div className="p-8">Loading...</div>;
  }
  
  return (
    <div className="pb-28">
      {/* Playlist header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6 bg-gradient-to-b from-spotify-hover to-spotify-dark">
        <img 
          src={playlist.imageUrl} 
          alt={playlist.name} 
          className="w-48 h-48 shadow-2xl"
        />
        <div className="text-center md:text-left">
          <p className="text-sm font-bold uppercase">Playlist</p>
          <h1 className="text-5xl font-extrabold my-2">{playlist.name}</h1>
          <p className="text-sm text-spotify-text">{playlist.description}</p>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <span className="font-bold">{playlist.ownerName}</span>
            <span className="w-1 h-1 rounded-full bg-white inline-block mx-1"></span>
            <span>{playlist.followers} likes</span>
            <span className="w-1 h-1 rounded-full bg-white inline-block mx-1"></span>
            <span>{playlist.totalSongs} songs,</span>
            <span className="text-spotify-text">{playlist.duration}</span>
          </div>
        </div>
      </div>
      
      {/* Playlist controls */}
      <div className="flex items-center gap-6 p-4">
        <button 
          className="w-14 h-14 bg-spotify rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          onClick={() => songs.length > 0 && handlePlaySong(songs[0])}
        >
          <PlayIcon size={28} fill="black" className="ml-1" />
        </button>
        
        <button 
          className={`text-2xl ${isFollowing ? 'text-spotify' : 'text-spotify-text'}`}
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
        <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 text-spotify-text border-b border-white/10 py-2 px-4 text-sm">
          <div className="text-center">#</div>
          <div>TITLE</div>
          <div>ALBUM</div>
          <div>DATE ADDED</div>
          <div className="flex justify-end">
            <ClockIcon size={16} />
          </div>
        </div>
        
        {songs.map((song, index) => (
          <div 
            key={index} 
            className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(120px,1fr)] gap-4 hover:bg-spotify-hover rounded-md py-3 px-4 text-sm group cursor-pointer"
            onClick={() => handlePlaySong(song)}
          >
            <div className="flex items-center justify-center text-spotify-text group-hover:hidden">
              {index + 1}
            </div>
            <div className="hidden group-hover:flex items-center justify-center text-white">
              <PlayIcon size={14} />
            </div>
            <div className="flex items-center gap-3 min-w-0">
              <div className="min-w-0">
                <div className="font-medium truncate">{song.title}</div>
                <div className="text-spotify-text truncate">{song.artist}</div>
              </div>
            </div>
            <div className="flex items-center text-spotify-text truncate">{song.album}</div>
            <div className="flex items-center text-spotify-text">{song.addedAt}</div>
            <div className="flex items-center justify-end text-spotify-text">{song.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Generate mock songs with local audio files
const generateMockSongs = (count: number): Song[] => {
  const songs: Song[] = [];
  const artists = ["Drake", "Kendrick Lamar", "J. Cole", "The Weeknd", "Post Malone", "Ariana Grande", "Taylor Swift"];
  const albums = ["Certified Lover Boy", "DAMN.", "The Off-Season", "After Hours", "Hollywood's Bleeding", "Positions", "Evermore"];
  const audioFiles = [
    "/sample-music.mp3",
    "/SoundHelix-Song-2.mp3",
    "/SoundHelix-Song-3.mp3",
    "/SoundHelix-Song-4.mp3"
  ];
  
  for (let i = 0; i < count; i++) {
    const artistIndex = Math.floor(Math.random() * artists.length);
    const audioIndex = Math.floor(Math.random() * audioFiles.length);
    songs.push({
      title: `Song ${i + 1}`,
      artist: artists[artistIndex],
      album: albums[artistIndex],
      duration: `${Math.floor(Math.random() * 4) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      addedAt: `${Math.floor(Math.random() * 30) + 1} days ago`,
      audioUrl: audioFiles[audioIndex],
      albumArt: `https://picsum.photos/id/${237 + i}/200`
    });
  }
  
  return songs;
};

export default PlaylistView;
