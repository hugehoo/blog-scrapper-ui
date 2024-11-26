"use client";

import React, {useState} from "react";
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}

async function extracted(category: string) {
  // const res = await fetch(`http://localhost:8080/corps?corp=${encodeURI(category)}`,
  const res = await fetch(`https://j7sj1zu2ve.execute-api.ap-northeast-2.amazonaws.com/prod/corps?corp=${encodeURI(category)}`,
    // { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({
                                                               initialArticles,
                                                               categories,
                                                             }) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const {searchResults, setSearchResults} = useSearch();
  const [activeCategory, setActiveCategory] = useState("Tech");

  const handleCategoryChange = async (category: string) => {
    const articles: Article[] = await extracted(category);
    setSearchResults(articles)

    setActiveCategory((prevCategory) =>
      prevCategory === category ? "Tech" : category
    );
  };

  const articlesToDisplay: Article[] =
    searchResults.length > 0 ? searchResults : initialArticles;

  const filteredArticles =
    activeCategory === "Tech"
      ? articlesToDisplay
      : articlesToDisplay.filter((article) => article.corp === activeCategory);

  return (
    <>
      <CategoryHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Articles articles={filteredArticles}/>
    </>
  );
};

export default ClientSideContent;
