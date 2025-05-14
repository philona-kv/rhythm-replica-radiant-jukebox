import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/contexts/PlayerContext";
import {
  ListMusic,
  Maximize2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MusicPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    pauseTrack,
    resumeTrack,
    playNext,
    playPrevious,
  } = usePlayer();
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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

      // Reset progress only when a new track is loaded
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
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
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
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!currentTrack) return null;

  return (
    <>
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

      {isFullscreen ? (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 to-black flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-white text-lg font-semibold">
                {currentTrack.title}
              </h3>
              <p className="text-spotify-text text-sm">{currentTrack.artist}</p>
            </div>
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <X size={24} className="text-white" />
            </button>
          </div>

          {/* Album Art */}
          <div className="flex-1 flex items-center justify-center p-8">
            <img
              src={currentTrack.albumArt}
              alt={`${currentTrack.title} album art`}
              className="w-full max-w-md aspect-square rounded-md shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "https://picsum.photos/400";
              }}
            />
          </div>

          {/* Controls */}
          <div className="p-8">
            <div className="mb-6">
              <h2 className="text-white text-2xl font-bold">
                {currentTrack.title}
              </h2>
              <p className="text-spotify-text text-lg">{currentTrack.artist}</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-spotify-text">
                {audioRef.current
                  ? formatTime(audioRef.current.currentTime)
                  : "0:00"}
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
                {audioRef.current
                  ? formatTime(audioRef.current.duration)
                  : "0:00"}
              </span>
            </div>

            <div className="flex justify-center items-center gap-8 mb-8">
              <button className="text-white opacity-70 hover:opacity-100 transition-opacity p-2">
                <Shuffle size={22} />
              </button>
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity p-2"
                onClick={playPrevious}
              >
                <SkipBack size={22} />
              </button>
              <button
                className="bg-white rounded-full w-16 h-16 flex items-center justify-center hover:scale-105 transition-transform"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={30} className="text-black" />
                ) : (
                  <Play size={30} className="text-black ml-1" />
                )}
              </button>
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity p-2"
                onClick={playNext}
              >
                <SkipForward size={22} />
              </button>
              <button className="text-white opacity-70 hover:opacity-100 transition-opacity p-2">
                <Repeat size={22} />
              </button>
            </div>

            <div className="flex items-center gap-4 justify-center">
              <Volume2 size={20} className="text-spotify-text" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-44 h-1"
                onValueChange={(values) => setVolume(values[0])}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-20 bg-spotify-light border-t border-gray-800 flex items-center px-4">
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
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
                onClick={playPrevious}
              >
                <Shuffle size={18} />
              </button>
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
                onClick={playPrevious}
              >
                <SkipBack size={18} />
              </button>
              <button
                className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform"
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <Pause size={24} className="text-black" />
                ) : (
                  <Play size={24} className="text-black" />
                )}
              </button>
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
                onClick={playNext}
              >
                <SkipForward size={18} />
              </button>
              <button
                className="text-white opacity-70 hover:opacity-100 transition-opacity"
                onClick={playPrevious}
              >
                <Repeat size={16} />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-spotify-text">
                {audioRef.current
                  ? formatTime(audioRef.current.currentTime)
                  : "0:00"}
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
                {audioRef.current
                  ? formatTime(audioRef.current.duration)
                  : "0:00"}
              </span>
            </div>
          </div>

          <div className="w-1/3 flex justify-end items-center gap-3">
            <button className="player-button" disabled={isLoading}>
              <ListMusic size={18} className="text-spotify-text" />
            </button>
            <div className="flex items-center gap-1 w-32">
              <Volume2 size={18} className="text-spotify-text" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="w-full h-1"
                onValueChange={(values) => setVolume(values[0])}
                disabled={isLoading}
              />
            </div>
            <button
              className="player-button"
              disabled={isLoading}
              onClick={toggleFullscreen}
            >
              <Maximize2 size={18} className="text-spotify-text" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
