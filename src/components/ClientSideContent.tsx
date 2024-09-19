'use client';

import React, {useState} from 'react';
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}
const ClientSideContent:React.FC<ClientSideContentProps> = ({initialArticles, categories}) => {
  const { searchResults } = useSearch();
  const [activeCategory, setActiveCategory] = useState('Tech'); // 기본값을 'Tech'로 설정
  const articlesToDisplay = searchResults.length > 0 ? searchResults : initialArticles;

  const filteredArticles = activeCategory === 'Tech'
    ? articlesToDisplay
    : articlesToDisplay.filter(article => article.corp === activeCategory);

  return (
    <>
      <CategoryHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Articles articles={filteredArticles}/>
    </>
  );
}
export default ClientSideContent
