import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Article} from "@/types/Article";

export interface SearchContextType {
  searchResults: Article[];
  setSearchResults: (results: Article[]) => void;
  appendSearchResults: (results: Article[]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const appendSearchResults = (results: Article[]) => {
    setSearchResults(prev => [...prev, ...results]);
  };

  return (
    <SearchContext.Provider value={{
      searchResults, 
      setSearchResults,
      appendSearchResults,
      currentPage,
      setCurrentPage,
      hasMore,
      setHasMore,
      isLoading,
      setIsLoading
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
