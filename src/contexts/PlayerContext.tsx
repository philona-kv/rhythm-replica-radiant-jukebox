import { createContext, useContext, useState, ReactNode } from 'react';

interface PlayerContextType {
  isPlaying: boolean;
  currentTrack: {
    title: string;
    artist: string;
    albumArt: string;
    audioUrl: string;
  } | null;
  playTrack: (track: { title: string; artist: string; albumArt: string; audioUrl: string }) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<PlayerContextType['currentTrack']>(null);

  const playTrack = (track: PlayerContextType['currentTrack']) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, currentTrack, playTrack, pauseTrack, resumeTrack }}>
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