"use client";

import React from "react";
import styled from "@emotion/styled";
import {Corps} from "@/types/constants";

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
        case Corps.KAKAOPAY.name:
          return Corps.KAKAOPAY.color;
        case Corps.KAKAOBANK.name:
          return Corps.KAKAOBANK.color;
        case Corps.TOSS.name:
          return Corps.TOSS.color;
        case Corps.DAANGN.name:
          return Corps.DAANGN.color;
        case Corps.OLIVE.name:
          return Corps.OLIVE.color;
        case Corps.BUZZVIL.name:
          return Corps.BUZZVIL.color;
        case Corps.MUSINSA.name:
          return Corps.MUSINSA.color;
        case Corps.TWONINE.name:
          return Corps.TWONINE.color;
        case Corps.KURLY.name:
          return Corps.KURLY.color;
        case Corps.DEVSISTERS.name:
          return Corps.DEVSISTERS.color;
        case Corps.OHOUSE.name:
          return Corps.OHOUSE.color;
        default:
          return "#000000";
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
