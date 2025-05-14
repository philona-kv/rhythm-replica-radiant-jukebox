
interface DailyMixCardProps {
  number: string;
  imageUrl: string;
  artists: string[];
}

const DailyMixCard = ({ number, imageUrl, artists }: DailyMixCardProps) => {
  // Only display first 3 artists
  const displayArtists = artists.slice(0, 3);
  
  return (
    <div className="playlist-card group">
      <div className="relative mb-4 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-md"></div>
        <img 
          src={imageUrl} 
          alt={`Daily Mix ${number}`} 
          className="w-full aspect-square object-cover rounded-md"
        />
        <div className="absolute bottom-2 right-2 text-3xl font-bold text-white drop-shadow-md">
          {number}
        </div>
        <button 
          className="absolute bottom-2 right-2 w-10 h-10 bg-spotify rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 2.69127C3 1.93067 3.81547 1.44851 4.48192 1.81506L13.4819 6.81506C14.1644 7.18868 14.1644 8.11633 13.4819 8.48995L4.48192 13.49C3.81546 13.8565 3 13.3744 3 12.6138V2.69127Z" fill="currentColor" />
          </svg>
        </button>
      </div>
      <h3 className="font-bold text-sm">Daily Mix {number}</h3>
      <p className="text-spotify-text text-xs mt-1 line-clamp-2">
        {displayArtists.join(", ")}
        {artists.length > 3 && ` and more`}
      </p>
    </div>
  );
};

export default DailyMixCard;
