"use client";

import React, { useState } from "react";
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import { Article } from "@/types/Article";
import { useSearch } from "@/components/SearchContext";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({
  initialArticles,
  categories,
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { searchResults } = useSearch();
  const [activeCategory, setActiveCategory] = useState("Tech");

  const handleCategoryChange = (category: string) => {
    setActiveCategory((prevCategory) =>
      prevCategory === category ? "Tech" : category
    );
  };

  const articlesToDisplay =
    searchResults.length > 0 ? searchResults : initialArticles;

  const filteredArticles =
    activeCategory === "Tech"
      ? articlesToDisplay
      : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        articlesToDisplay.filter((article) => article.corp === activeCategory);

  return (
    <>
      <CategoryHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Articles articles={filteredArticles} />
    </>
  );
};

export default ClientSideContent;
