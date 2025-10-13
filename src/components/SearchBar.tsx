import styled from "@emotion/styled";
import { useState, useRef } from "react";
import { useSearch } from "@/components/SearchContext";
import { API_HOST } from "@/types/ApiConstants";

// import Articles from "@/components/Articles";

export interface Article {
  id: string;
  title: string;
  url: string;
  summary: string;
  date: string;
  corp: string;
}

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
  // const [suggestions, setSuggestions] = useState<Article[]>([]); // Article[] 타입
  const containerRef = useRef<HTMLDivElement>(null); // SearchBar 컨테이너 참조

  // useEffect(() => {
  //   if (searchTerm.length > 2) {
  //     const fetchSuggestions = async () => {
  //       // const url = new URL('https://j7sj1zu2ve.execute-api.ap-northeast-2.amazonaws.com/prod/search');
  //       const url = new URL('http://localhost:8080/search');
  //       const params = new URLSearchParams();
  //       params.append('keyword', searchTerm);
  //       url.search = params.toString();
  //
  //       try {
  //         const res = await fetch(url.toString(), {
  //           method: 'GET',
  //           cache: 'no-store',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         });
  //
  //         if (!res.ok) {
  //           throw new Error('Search request failed');
  //         }
  //
  //         const data: Article[] = await res.json(); // Article[] 타입 적용
  //         setSuggestions(data); // 자동 검색 결과를 설정
  //       } catch (error) {
  //         console.error('Error during search:', error);
  //         setSuggestions([]);
  //       }
  //     };
  //
  //     fetchSuggestions();
  //   } else {
  //     setSuggestions([]); // 검색어가 짧을 경우 추천을 초기화
  //   }
  // }, [searchTerm]);

  // 입력창 외부를 클릭했을 때 자동완성 창 닫기
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
  //       setSuggestions([]); // 외부 클릭 시 자동완성 목록 닫기
  //     }
  //   };
  //
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // 검색어가 비어있으면 초기 포스트 API 호출
    if (searchTerm.trim() === "") {
      try {
        const res = await fetch(`${API_HOST}/posts`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Article[] = await res.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      return;
    }

    // 검색어가 있으면 검색 API 호출
    const url = new URL(`${API_HOST}/search`);
    const params = new URLSearchParams();
    params.append("keyword", searchTerm);
    url.search = params.toString();

    try {
      const res = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Search request failed");
      }

      const data: Article[] = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error during search:", error);
    }
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
              handleSearch(e as any);
            }
          }}
        />
        <SearchButton type="submit">🔍</SearchButton>
      </SearchContainer>
    </form>
  );
};

export default SearchBar;
