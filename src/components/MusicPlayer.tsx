import { useRef, useEffect, useState } from "react";
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
import { usePlayer } from "@/contexts/PlayerContext";

const MusicPlayer = () => {
  const { 
    isPlaying, 
    currentTrack, 
    pauseTrack, 
    resumeTrack,
    playNext,
    playPrevious
  } = usePlayer();
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle play/pause state and track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // Reset audio element
      audioRef.current.currentTime = 0;
      setProgress(0);
      
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Error playing audio:", error);
            pauseTrack();
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="h-20 bg-spotify-light border-t border-gray-800 fixed bottom-0 left-0 right-0 flex items-center px-4">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onError={(e) => {
          console.error("Audio error:", e);
          pauseTrack();
        }}
        preload="auto"
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
          <button 
            className="player-button"
            onClick={playPrevious}
          >
            <SkipBack size={20} />
          </button>
          <button 
            className="bg-white rounded-full w-8 h-8 flex items-center justify-center hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={18} className="text-black" /> : <Play size={18} className="text-black ml-0.5" />}
          </button>
          <button 
            className="player-button"
            onClick={playNext}
          >
            <SkipForward size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-spotify-text">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}
          </span>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-full h-1"
            onValueChange={handleSliderChange}
          />
          <span className="text-xs text-spotify-text">
            {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
          </span>
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
