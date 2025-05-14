import { useRef, useEffect, useState } from "react";
import { 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Shuffle,
  Repeat
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/PlayerContext";
import { Progress } from "@/components/ui/progress";

const MusicPlayer = () => {
  const { isPlaying, currentTrack, pauseTrack, resumeTrack } = usePlayer();
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      resumeTrack();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="h-20 bg-spotify-light border-t border-gray-800 fixed bottom-0 left-0 right-0 flex items-center px-4">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={pauseTrack}
      />
      
      <div className="w-1/3 flex items-center gap-4">
        <img 
          src={currentTrack.albumArt} 
          alt="Album cover" 
          className="w-14 h-14 rounded"
        />
        <div>
          <h4 className="text-sm font-semibold">{currentTrack.title}</h4>
          <p className="text-xs text-spotify-text">{currentTrack.artist}</p>
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
          <span className="text-xs text-spotify-text">
            {audioRef.current ? Math.floor(audioRef.current.currentTime) : 0}
          </span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full h-1"
            onValueChange={handleSliderChange}
          />
          <span className="text-xs text-spotify-text">
            {audioRef.current ? Math.floor(audioRef.current.duration) : 0}
          </span>
        </div>
      </div>
      
      <div className="w-1/3 flex justify-end items-center gap-3">
        <button className="player-button">
          <ListMusic size={18} />
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <SkipBack size={18} />
        </button>
        <button 
          className="bg-black border border-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <SkipForward size={18} />
        </button>
        <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
          <Repeat size={16} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
