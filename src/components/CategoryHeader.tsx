"use client";

import React from "react";
import styled from "@emotion/styled";

const HeaderContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryTag = styled.button<{ isActive: boolean; category: string }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: ${(props) => {
    if (props.isActive) {
      switch (props.category) {
        case "KAKAOPAY":
          return "#dfdb72";
        case "TOSS":
          return "#3f51b5";
        case "MUSINSA":
          return "black";
        case "DAANGN":
          return "#e8633e";
        case "OLIVE":
          return "#1ec800";
        case "BUZZVIL":
          return "#EC4034";
        default:
          return "#40c4ff";
      }
    }
    return "#e0e0e0";
  }};
  color: ${(props) => (props.isActive ? "white" : "#333")};
  cursor: pointer;
  transition: all 0.3s ease;
`;

interface CategoryHeaderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  console.log(categories);
  return (
    <HeaderContainer>
      {categories.map((category) => (
        <CategoryTag
          key={category}
          category={category}
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
