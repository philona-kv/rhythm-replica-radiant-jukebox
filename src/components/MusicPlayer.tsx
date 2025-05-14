// src/components/MusicPlayer.tsx
import { useRef, useEffect, useState } from "react";
import { 
  SkipBack, 
  SkipForward, 
  Play, 
  Pause, 
  Shuffle, 
  Repeat, 
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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      
      // Reset audio element
      audioRef.current.currentTime = 0;
      setProgress(0);
      
      const loadAudio = async () => {
        try {
          if (isPlaying) {
            const playPromise = audioRef.current?.play();
            if (playPromise !== undefined) {
              await playPromise;
            }
          } else {
            audioRef.current?.pause();
          }
        } catch (error) {
          console.error("Error playing audio:", error);
          pauseTrack();
        } finally {
          setIsLoading(false);
        }
      };

      loadAudio();
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
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        preload="auto"
      />
      
      <div className="w-1/3 flex items-center gap-4">
        <img 
          src={currentTrack.albumArt} 
          alt="Album cover" 
          className="w-14 h-14 rounded"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/200";
          }}
        />
        <div>
          <h4 className="text-sm font-semibold">{currentTrack.title}</h4>
          <p className="text-xs text-spotify-text">{currentTrack.artist}</p>
        </div>
      </div>
      
      <div className="w-1/3">
        <div className="flex justify-center items-center gap-8">
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <Shuffle size={16} />
          </button>
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <SkipBack size={18} />
          </button>
          <button 
            className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={24} className="text-black" /> : <Play size={24} className="text-black" />}
          </button>
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <SkipForward size={18} />
          </button>
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <Repeat size={16} />
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
            disabled={isLoading}
          />
          <span className="text-xs text-spotify-text">
            {audioRef.current ? formatTime(audioRef.current.duration) : "0:00"}
          </span>
        </div>
      </div>
      
      <div className="w-1/3 flex justify-end items-center gap-3">
        <button className="player-button" disabled={isLoading}>
          <Maximize2 size={18} className="text-spotify-text" />
        </button>
        <div className="flex items-center gap-1 w-32">
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="w-full h-1"
            onValueChange={(values) => setVolume(values[0])}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;