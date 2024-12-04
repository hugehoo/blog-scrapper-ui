"use client";

import React, {useState} from "react";
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";
import {API_HOST} from "@/types/ApiConstants";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}

async function getPosts(
  activeCategory: string,
  category: string
) {
  const urlPath = activeCategory === category
    ? '/posts' // toggle 해제
    : `/corps?corp=${encodeURI(category)}`
  const res = await fetch(API_HOST + urlPath, {cache: 'no-store'});

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({
                                                               initialArticles,
                                                               categories,
                                                             }) => {
  const {searchResults, setSearchResults} = useSearch();
  const [activeCategory, setActiveCategory] = useState("Tech");

  const handleCategoryChange = async (category: string) => {
    const articles: Article[] = await getPosts(activeCategory, category);
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
