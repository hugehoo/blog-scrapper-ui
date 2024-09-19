'use client';

import React from 'react';
import styled from '@emotion/styled';

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryTag = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.isActive ? '#40c4ff' : '#e0e0e0'};
  color: ${props => props.isActive ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${props => props.isActive ? '#00b0ff' : '#d0d0d0'};
  }
`;

interface CategoryHeaderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <HeaderContainer>
      {categories.map((category) => (
        <CategoryTag
          key={category}
          isActive={category === activeCategory}
          onClick={() => onCategoryChange(category)}
        >
          #{category}
        </CategoryTag>
      ))}
    </HeaderContainer>
  );
};

export default CategoryHeader;
