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

const audioFiles = [
  "/sample-music.mp3",
  "/SoundHelix-Song-2.mp3",
  "/SoundHelix-Song-3.mp3",
  "/SoundHelix-Song-4.mp3"
];

const generateRandomTrack = (): Track => {
  const randomIndex = Math.floor(Math.random() * audioFiles.length);
  return {
    title: `Random Song ${Math.floor(Math.random() * 1000)}`,
    artist: "Various Artists",
    albumArt: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200`,
    audioUrl: audioFiles[randomIndex]
  };
};

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const playTrack = (track: Track) => {
    // If the track is already in the queue, find its index
    const existingIndex = queue.findIndex(t => t.audioUrl === track.audioUrl);
    
    if (existingIndex !== -1) {
      // If track exists in queue, play it from there
      setCurrentIndex(existingIndex);
      setCurrentTrack(queue[existingIndex]);
    } else {
      // If track is new, add it to queue and play it
      const newQueue = [...queue, track];
      setQueue(newQueue);
      setCurrentIndex(newQueue.length - 1);
      setCurrentTrack(track);
    }
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    
    let nextIndex;
    if (currentIndex === -1) {
      // If no track is currently playing, start from the beginning
      nextIndex = 0;
    } else if (currentIndex < queue.length - 1) {
      // Play next track in queue
      nextIndex = currentIndex + 1;
    } else {
      // If we're at the end of the queue, loop back to the beginning
      nextIndex = 0;
    }

    setCurrentIndex(nextIndex);
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    
    let prevIndex;
    if (currentIndex <= 0) {
      // If we're at the beginning or no track is playing, go to the end
      prevIndex = queue.length - 1;
    } else {
      // Play previous track in queue
      prevIndex = currentIndex - 1;
    }

    setCurrentIndex(prevIndex);
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
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