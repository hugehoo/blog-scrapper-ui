"use client";

import React, {useState, useCallback, useEffect} from "react";
import CategoryHeader from "@/components/CategoryHeader";
import Articles from "@/components/Articles";
import {Article} from "@/types/Article";
import {useSearch} from "@/components/SearchContext";
import {API_HOST} from "@/types/ApiConstants";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

interface ClientSideContentProps {
  initialArticles: Article[];
  categories: string[];
}

const PAGE_LIMIT = 20;

async function getPosts(
  category: string,
  page: number = 1,
  limit: number = PAGE_LIMIT
) {
  try {
    const urlPath = category === "Tech"
      ? `/posts?page=${page}&limit=${limit}`
      : `/corps?corp=${encodeURI(category)}&page=${page}&limit=${limit}`
    
    const fullUrl = API_HOST + urlPath;
    console.log(`Fetching posts from: ${fullUrl}`);
    
    const res = await fetch(fullUrl, {cache: 'no-store'});

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log(`Fetched ${data.length} articles for category ${category}`);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

const ClientSideContent: React.FC<ClientSideContentProps> = ({
                                                               initialArticles,
                                                               categories,
                                                             }) => {
  const {
    searchResults, 
    setSearchResults, 
    appendSearchResults,
    setCurrentPage,
    hasMore,
    setHasMore,
    isLoading,
    setIsLoading
  } = useSearch();
  const [activeCategory, setActiveCategory] = useState("Tech");
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasCategoryChanged, setHasCategoryChanged] = useState(false);

  // Initialize searchResults with initialArticles on mount ONLY for "Tech" category
  useEffect(() => {
    console.log('ClientSideContent mount:', {
      isInitialized,
      hasCategoryChanged,
      searchResultsLength: searchResults.length,
      initialArticlesLength: initialArticles.length,
      activeCategory
    });
    
    if (!isInitialized && !hasCategoryChanged && searchResults.length === 0 && initialArticles.length > 0 && activeCategory === "Tech") {
      console.log('Setting initial articles:', initialArticles.length);
      
      // Remove duplicates from initial articles
      const seenIds = new Set();
      const uniqueInitialArticles = initialArticles.filter(article => {
        if (seenIds.has(article.id)) {
          console.warn('Duplicate article found in initial data:', article.id, article.title);
          return false;
        }
        seenIds.add(article.id);
        return true;
      });
      
      console.log(`After removing duplicates: ${uniqueInitialArticles.length} unique articles`);
      setSearchResults(uniqueInitialArticles);
      setCurrentPage(1);
      
      // Set hasMore based on whether we got the full page limit
      if (uniqueInitialArticles.length >= PAGE_LIMIT) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
      setIsInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreArticles = useCallback(async (page: number) => {
    try {
      console.log('fetchMoreArticles called:', { page, activeCategory, currentSearchResultsLength: searchResults.length });
      const articles: Article[] = await getPosts(activeCategory, page);
      
      console.log(`Received ${articles.length} articles from API for page ${page}`);
      
      // Check if we got no articles
      if (!articles || articles.length === 0) {
        console.log('No more articles available, setting hasMore to false');
        setHasMore(false);
        return [];
      }
      
      // Check for duplicate articles
      const existingIds = new Set(searchResults.map(article => article.id));
      const newArticles = articles.filter(article => !existingIds.has(article.id));
      
      console.log(`After filtering duplicates: ${newArticles.length} new articles`);
      console.log('Existing IDs:', Array.from(existingIds).slice(0, 5), '...');
      console.log('New article IDs:', newArticles.map(a => a.id).slice(0, 5), '...');
      
      if (newArticles.length === 0) {
        console.log('All articles are duplicates, setting hasMore to false');
        setHasMore(false);
        return [];
      }
      
      // Check if we got fewer articles than the limit (indicates last page)
      if (newArticles.length < PAGE_LIMIT) {
        console.log('Received fewer than PAGE_LIMIT articles, setting hasMore to false');
        setHasMore(false);
      }
      
      appendSearchResults(newArticles);
      setCurrentPage(page);
      return newArticles;
    } catch (error) {
      console.error('Failed to fetch more articles:', error);
      throw error;
    }
  }, [activeCategory, appendSearchResults, setCurrentPage, setHasMore, searchResults]);

  const { targetRef, error, reset } = useInfiniteScroll({
    fetchMore: fetchMoreArticles,
    hasMore
  });

  const handleCategoryChange = async (category: string) => {
    try {
      setIsLoading(true);
      setHasCategoryChanged(true);
      
      // Toggle logic: if clicking the same category, go back to "Tech" (all posts)
      const newCategory = activeCategory === category ? "Tech" : category;
      setActiveCategory(newCategory);
      
      // Reset all states
      setSearchResults([]);
      setCurrentPage(1);
      setHasMore(true);
      reset();
      
      // Fetch new data for the selected category
      const articles: Article[] = await getPosts(newCategory, 1);
      setSearchResults(articles);
      
      // Check if we should enable infinite scroll
      if (articles.length < PAGE_LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to change category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Only show searchResults, never fall back to initialArticles after initialization
  const articlesToDisplay: Article[] = searchResults;


  return (
    <>
      <CategoryHeader
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Articles 
        articles={articlesToDisplay}
        isLoading={isLoading}
        error={error}
        targetRef={targetRef}
      />
    </>
  );
};

export default ClientSideContent;