
import { useState } from "react";
import { 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Volume2, 
  ListMusic, 
  Maximize2 
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  return (
    <div className="h-20 bg-spotify-light border-t border-gray-800 fixed bottom-0 left-0 right-0 flex items-center px-4">
      <div className="w-1/3 flex items-center gap-4">
        <img 
          src="https://via.placeholder.com/56" 
          alt="Album cover" 
          className="w-14 h-14 rounded"
        />
        <div>
          <h4 className="text-sm font-semibold">Song Title</h4>
          <p className="text-xs text-spotify-text">Artist Name</p>
        </div>
      </div>
      
      <div className="w-1/3">
        <div className="flex justify-center items-center gap-4 mb-2">
          <button className="player-button">
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black ml-0.5" />}
          </button>
          <button className="player-button">
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-spotify-text">1:23</span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full h-1"
            onValueChange={(values) => setProgress(values[0])}
          />
          <span className="text-xs text-spotify-text">3:45</span>
        </div>
      </div>
      
      <div className="w-1/3 flex justify-end items-center gap-3">
        <button className="player-button">
          <ListMusic size={18} />
        </button>
        <div className="flex items-center gap-1 w-32">
          <Volume2 size={18} className="text-spotify-text" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="w-full h-1"
            onValueChange={(values) => setVolume(values[0])}
          />
        </div>
        <button className="player-button">
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
