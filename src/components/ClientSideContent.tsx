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

async function getPosts(category: string
                        // , isDefault: boolean
) {
  // const posts = `${API_HOST}/posts`;
  const postsByCorp = `${API_HOST}/corps?corp=${encodeURI(category)}`;
  const res =
    // isDefault
    // ? await fetch(posts, {cache: 'no-store'})
    // :
  await fetch(postsByCorp, {cache: 'no-store'});

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
    const articles: Article[] = await getPosts(category);
    setSearchResults(articles)
    setActiveCategory((prevCategory) =>
      prevCategory === category ? "Tech" : category
    );
  };

  const articlesToDisplay: Article[] =
    searchResults.length > 0 ? searchResults : initialArticles;


  // original
  // const filteredArticles =
  //   activeCategory === "Tech"
  //     ? articlesToDisplay
  //     : articlesToDisplay.filter((article) => article.corp === activeCategory);


  // correct
  const filteredArticles =
    activeCategory === "Tech"
      ? initialArticles
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
