
import { useState } from "react";
import { 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Shuffle,
  Volume2, 
  Repeat
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(30);
  
  const togglePlay = () => setIsPlaying(!isPlaying);
  
  return (
    <div className="h-20 bg-black border-t border-gray-800 fixed bottom-0 left-0 right-0 flex flex-col justify-center px-6">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center px-6">
        <span className="text-xs text-spotify-text mr-2">0:12</span>
        <Progress 
          value={progress} 
          className="h-1 flex-grow" 
        />
        <span className="text-xs text-spotify-text ml-2">4:00</span>
      </div>
      
      {/* Player controls */}
      <div className="flex justify-center items-center gap-6">
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <Shuffle size={18} />
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <SkipBack size={24} />
        </button>
        <button 
          className="bg-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-105 transition-transform"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={20} className="text-black" /> : <Play size={20} className="text-black ml-0.5" />}
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <SkipForward size={24} />
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <Repeat size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
