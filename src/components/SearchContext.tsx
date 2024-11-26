import React, {createContext, useState, useContext, ReactNode} from 'react';
import {Article} from "@/types/Article";

export interface SearchContextType {
  searchResults: Article[];
  setSearchResults: (results: Article[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [searchResults, setSearchResults] = useState<Article[]>([]);

  return (
    <SearchContext.Provider value={{searchResults, setSearchResults}}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch : () => SearchContextType | undefined= () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    console.log(context)
  }
  return context;
};
