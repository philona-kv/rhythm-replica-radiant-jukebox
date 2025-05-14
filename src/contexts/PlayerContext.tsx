// src/contexts/PlayerContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface Track {
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
}

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: Track | null;
  queue: Track[];
  currentIndex: number;
  playTrack: (track: Track) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  playNext: () => void;
  playPrevious: () => void;
  addToQueue: (track: Track) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

// Default audio files
const audioFiles: Track[] = [
  {
    title: "Sample Music 1",
    artist: "Artist 1",
    albumArt: "https://picsum.photos/200/300?random=1",
    audioUrl: "/sample-music.mp3"
  },
  {
    title: "Sample Music 2",
    artist: "Artist 2",
    albumArt: "https://picsum.photos/200/300?random=2",
    audioUrl: "/SoundHelix-Song-2.mp3"
  },
  {
    title: "Sample Music 3",
    artist: "Artist 3",
    albumArt: "https://picsum.photos/200/300?random=3",
    audioUrl: "/SoundHelix-Song-3.mp3"
  },
  {
    title: "Sample Music 4",
    artist: "Artist 4",
    albumArt: "https://picsum.photos/200/300?random=4",
    audioUrl: "/SoundHelix-Song-4.mp3"
  }
];

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>(audioFiles); // Initialize with default tracks
  const [currentIndex, setCurrentIndex] = useState(0);

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setCurrentIndex(queue.findIndex(t => t.audioUrl === track.audioUrl));
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  const playNext = () => {
    if (queue.length === 0) return; // Prevent errors if queue is empty
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % queue.length; // Loop back to start
      const nextTrack = queue[nextIndex];
      setCurrentTrack(nextTrack);
      return nextIndex;
    });
    setIsPlaying(true); // Start playing the next track
  };

  const playPrevious = () => {
    if (queue.length === 0) return; // Prevent errors if queue is empty
    setCurrentIndex((prevIndex) => {
      const prevIndexValue = (prevIndex - 1 + queue.length) % queue.length; // Loop to end
      const prevTrack = queue[prevIndexValue];
      setCurrentTrack(prevTrack);
      return prevIndexValue;
    });
    setIsPlaying(true); // Start playing the previous track
  };

  const addToQueue = (track: Track) => {
    setQueue(prev => [...prev, track]);
  };

  return (
    <PlayerContext.Provider value={{ 
      isPlaying, 
      currentTrack, 
      queue,
      currentIndex,
      playTrack, 
      pauseTrack, 
      resumeTrack,
      playNext,
      playPrevious,
      addToQueue
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}; 