"use client";

import React, {useState} from "react";
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";
import { getPosts, getPostsByCorp } from "@/utils/api";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}

async function fetchPostsByCategory(
  activeCategory: string,
  category: string
) {
  const articles = activeCategory === category 
    ? await getPosts() 
    : await getPostsByCorp(category);
  
  return articles;
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({
                                                               initialArticles,
                                                               categories,
                                                             }) => {
  const {searchResults, setSearchResults} = useSearch();
  const [activeCategory, setActiveCategory] = useState("Tech");

  const handleCategoryChange = async (category: string) => {
    const articles: Article[] = await fetchPostsByCategory(activeCategory, category);
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
