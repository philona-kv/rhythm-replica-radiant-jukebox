import React, { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock search results
const mockSearchResults = [
  {
    title: "Today's Top Hits",
    description: "Dua Lipa is on top of the Hottest 50!",
    imageUrl: "https://picsum.photos/id/260/200",
  },
  {
    title: "RapCaviar",
    description: "New music from Drake, Kendrick Lamar and Cardi B.",
    imageUrl: "https://picsum.photos/id/261/200",
  },
  {
    title: "All Out 2010s",
    description: "The biggest songs of the 2010s.",
    imageUrl: "https://picsum.photos/id/262/200",
  },
  {
    title: "Rock Classics",
    description:
      "Rock legends & epic songs that continue to inspire generations.",
    imageUrl: "https://picsum.photos/id/263/200",
  },
  {
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits.",
    imageUrl: "https://picsum.photos/id/264/200",
  },
  {
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando nuestra música.",
    imageUrl: "https://picsum.photos/id/265/200",
  },
];

interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: any[];
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
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const performSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim() !== "") {
      // Filter mock results based on query
      setResults(
        mockSearchResults.filter(
          (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      // Navigate to search page with query
      navigate("/search");
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        results,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
