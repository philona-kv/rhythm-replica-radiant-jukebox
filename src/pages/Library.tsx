
import { useState } from "react";
import { PlusIcon, ListMusicIcon, MusicIcon, UsersIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Library = () => {
  const [view, setView] = useState("grid");
  
  return (
    <div className="px-6 py-6 pb-28">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Your Library</h1>
        <button className="w-8 h-8 bg-spotify-light rounded-full flex items-center justify-center hover:bg-spotify-hover transition-colors">
          <PlusIcon size={18} />
        </button>
      </div>
      
      <Tabs defaultValue="playlists" className="mb-6">
        <TabsList className="bg-spotify-light/40">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
          <TabsTrigger value="artists">Artists</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-end gap-2 my-4">
          <button 
            className={`p-1 rounded-md ${view === 'grid' ? 'bg-spotify-hover' : 'bg-transparent'}`}
            onClick={() => setView('grid')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button 
            className={`p-1 rounded-md ${view === 'list' ? 'bg-spotify-hover' : 'bg-transparent'}`}
            onClick={() => setView('list')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="3" rx="1" />
              <rect x="1" y="6" width="14" height="3" rx="1" />
              <rect x="1" y="11" width="14" height="3" rx="1" />
            </svg>
          </button>
        </div>
        
        <TabsContent value="playlists" className="mt-0">
          {view === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {playlists.map((playlist, index) => (
                <div key={index} className="playlist-card group">
                  <div className="relative mb-4 shadow-md">
                    <img 
                      src={playlist.imageUrl} 
                      alt={playlist.name} 
                      className="w-full aspect-square object-cover rounded-md"
                    />
                    <button 
                      className="absolute bottom-2 right-2 w-10 h-10 bg-spotify rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 2.69127C3 1.93067 3.81547 1.44851 4.48192 1.81506L13.4819 6.81506C14.1644 7.18868 14.1644 8.11633 13.4819 8.48995L4.48192 13.49C3.81546 13.8565 3 13.3744 3 12.6138V2.69127Z" fill="currentColor" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-bold text-sm truncate">{playlist.name}</h3>
                  <p className="text-spotify-text text-xs mt-1">Playlist • {playlist.creator}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {playlists.map((playlist, index) => (
                <div key={index} className="flex items-center p-2 hover:bg-spotify-hover rounded-md transition-colors cursor-pointer">
                  <img 
                    src={playlist.imageUrl} 
                    alt={playlist.name} 
                    className="w-12 h-12 object-cover mr-3 rounded"
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-medium text-sm truncate">{playlist.name}</h3>
                    <p className="text-spotify-text text-xs flex items-center gap-1">
                      <span>Playlist</span>
                      <span className="inline-block w-1 h-1 rounded-full bg-spotify-text"></span>
                      <span>{playlist.creator}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="podcasts" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ListMusicIcon size={48} className="text-spotify-text mb-4" />
            <h3 className="text-2xl font-bold mb-2">Follow your first podcast</h3>
            <p className="text-spotify-text mb-6 max-w-md">Follow podcasts you like by tapping the follow button.</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Browse podcasts
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="artists" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <UsersIcon size={48} className="text-spotify-text mb-4" />
            <h3 className="text-2xl font-bold mb-2">Follow your first artist</h3>
            <p className="text-spotify-text mb-6 max-w-md">Follow artists you like by tapping the follow button.</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Browse artists
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="mt-0">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MusicIcon size={48} className="text-spotify-text mb-4" />
            <h3 className="text-2xl font-bold mb-2">Save your first album</h3>
            <p className="text-spotify-text mb-6 max-w-md">Save albums you like by tapping the heart icon.</p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
              Browse albums
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Sample playlists data
const playlists = [
  { name: "Liked Songs", creator: "You", imageUrl: "https://misc.scdn.co/liked-songs/liked-songs-640.png" },
  { name: "Daily Mix 1", creator: "Spotify", imageUrl: "https://picsum.photos/id/237/200" },
  { name: "Discover Weekly", creator: "Spotify", imageUrl: "https://picsum.photos/id/239/200" },
  { name: "Top Hits", creator: "Spotify", imageUrl: "https://picsum.photos/id/240/200" },
  { name: "Chill Vibes", creator: "Spotify", imageUrl: "https://picsum.photos/id/241/200" },
  { name: "Workout Playlist", creator: "You", imageUrl: "https://picsum.photos/id/242/200" },
  { name: "Throwbacks", creator: "You", imageUrl: "https://picsum.photos/id/243/200" },
  { name: "Road Trip", creator: "You", imageUrl: "https://picsum.photos/id/244/200" },
  { name: "Study Focus", creator: "Spotify", imageUrl: "https://picsum.photos/id/245/200" },
  { name: "Summer Mix", creator: "Spotify", imageUrl: "https://picsum.photos/id/246/200" },
  { name: "Evening Acoustic", creator: "You", imageUrl: "https://picsum.photos/id/247/200" },
  { name: "Indie Mix", creator: "Spotify", imageUrl: "https://picsum.photos/id/248/200" },
];

export default Library;
