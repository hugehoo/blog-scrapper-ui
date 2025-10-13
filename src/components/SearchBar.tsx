import styled from "@emotion/styled";
import { useState, useRef } from "react";
import { useSearch } from "@/components/SearchContext";
import { getPosts, searchPosts } from "@/utils/api";

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

const SearchBar = () => {
  const { setSearchResults } = useSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null); // SearchBar 컨테이너 참조

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // 검색어가 비어있으면 초기 포스트 API 호출
    if (searchTerm.trim() === "") {
      const data = await getPosts();
      setSearchResults(data);
      return;
    }

    // 검색어가 있으면 검색 API 호출
    const data = await searchPosts(searchTerm);
    setSearchResults(data);
  };

  return (
    <form onSubmit={handleSearch}>
      <SearchContainer ref={containerRef}>
        <SearchInput
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch(e as React.FormEvent);
            }
          }}
        />
        <SearchButton type="submit">🔍</SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
