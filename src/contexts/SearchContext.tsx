import { Song } from "@/lib/api";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:3000/api";

interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: Song[];
  isLoading: boolean;
  error: string | null;
  performSearch: (searchQuery: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const performSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      setResults([]);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      console.log(`Performing search for: ${searchQuery}`);

      const response = await fetch(
        `${API_BASE_URL}/songs/search/${searchQuery}`
      );

      if (!response.ok) {
        throw new Error(
          `Search failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Search results:`, data);
      setResults(data);

      // Navigate to search page with query
      navigate("/search");
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Failed to search songs");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setError(null);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        isLoading,
        error,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
