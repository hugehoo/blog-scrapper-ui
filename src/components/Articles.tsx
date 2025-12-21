"use client";

import styled from "@emotion/styled";
import ArticleCard from "./ArticleCard";
import { Article } from "../types/Article";

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 60px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #e74c3c;
  padding: 20px;
  font-size: 14px;
`;

interface ArticlesProps {
  articles: Article[];
  isLoading?: boolean;
  error?: string | null;
  targetRef?: React.RefObject<HTMLDivElement>;
}

const Articles: React.FC<ArticlesProps> = ({ 
  articles, 
  isLoading = false, 
  error = null, 
  targetRef 
}) => {
  return (
    <ArticleList>
      {articles.map((article) => (
        <ArticleCard key={article.id} {...article} />
      ))}
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}
      
      <div ref={targetRef} style={{ height: '10px' }} />
    </ArticleList>
  );
};

export default Articles;
