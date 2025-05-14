// API service for handling requests to the backend

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverImage: string;
  audioUrl: string;
  genre: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  PlaylistSongs?: {
    createdAt: string;
    updatedAt: string;
    PlaylistId: string;
    SongId: string;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  isPublic: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Songs?: Song[];
}

const API_BASE_URL = "http://localhost:3000/api";

export async function fetchSongs(): Promise<Song[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch songs: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as Song[];
  } catch (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
}

export async function fetchSongById(id: string): Promise<Song | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch song: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as Song;
  } catch (error) {
    console.error(`Error fetching song with ID ${id}:`, error);
    return null;
  }
}

export async function fetchPlaylists(): Promise<Playlist[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch playlists: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as Playlist[];
  } catch (error) {
    console.error("Error fetching playlists:", error);
    return [];
  }
}

export async function fetchPlaylistById(id: string): Promise<Playlist | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/playlists/${id}`);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch playlist: ${response.status} ${response.statusText}`
      );
    }

    return (await response.json()) as Playlist;
  } catch (error) {
    console.error(`Error fetching playlist with ID ${id}:`, error);
    return null;
  }
}
