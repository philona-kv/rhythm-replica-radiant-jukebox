import { usePlayer } from "@/contexts/PlayerContext";
import { useNavigate } from "react-router-dom";

interface PlaylistCardProps {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
}

const PlaylistCard = ({
  id,
  title,
  description,
  imageUrl,
}: PlaylistCardProps) => {
  const { playTrack } = usePlayer();
  const navigate = useNavigate();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTrack({
      title,
      artist: description.split(" ")[0], // Use first word of description as artist
      albumArt: imageUrl,
      audioUrl: `/SoundHelix-Song-${Math.floor(Math.random() * 4) + 1}.mp3`,
    });
  };

  const handleCardClick = () => {
    if (id) {
      navigate(`/playlist/${id}`);
    }
  };

  return (
    <div
      className="playlist-card group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative mb-4 shadow-md">
        <img
          src={imageUrl}
          alt={title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button
          className="absolute bottom-2 right-2 w-10 h-10 bg-spotify rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          onClick={handlePlay}
        >
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
      <h3 className="font-bold text-sm truncate">{title}</h3>
      <p className="text-spotify-text text-xs mt-1 line-clamp-2">
        {description}
      </p>
    </div>
  );
};

export default PlaylistCard;
