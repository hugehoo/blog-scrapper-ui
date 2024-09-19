'use client';

import styled from '@emotion/styled';
import ArticleCard from './ArticleCard';
import { Article } from '../types/Article';

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ArticlesProps {
  articles: Article[];
}

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  return (
    <ArticleList>
      {articles.map(article => (
        <ArticleCard key={article.id} {...article} />
      ))}
    </ArticleList>
  );
};

export default Articles;
