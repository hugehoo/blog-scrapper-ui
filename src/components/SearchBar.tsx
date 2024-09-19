import styled from "@emotion/styled";
import {useState} from "react";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";


const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 50px;
  background: #e0e5ec;
  box-shadow: 8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  background: transparent;
  font-size: 18px;
  color: #4a4a4a;
  outline: none;

  &::placeholder {
    color: #a0a0a0;
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #4a4a4a;
  padding-left: 10px;
`;

interface SearchBarProps {
  onSearchResults: (results: Article[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = () => {
  const {setSearchResults} = useSearch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = new URL('http://localhost:8080/search');
    const params = new URLSearchParams();
    params.append('keyword', searchTerm);
    url.search = params.toString();

    try {
      const res = await fetch(url.toString(), {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Search request failed');
      }

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error during search:', error);
      // 에러 처리 로직
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">🔍</SearchButton>
      </SearchContainer>
    </form>
  );
};


export default SearchBar;
