"use client";

import React from "react";
import styled from "@emotion/styled";
import { Article } from "../types/Article";
import Link from "next/link";

const Card = styled.div`
  border-bottom: 1px solid rgba(172, 171, 171, 0.6);
  padding: 20px 0;
`;

const Category = styled.span<{ corp: string }>`
  font-size: 14px;
  margin-bottom: 10px;
  display: block;
  color: ${(props) => {
    switch (props.corp) {
      case "KAKAOPAY":
        return "#dfdb72"; // 노란색
      case "TOSS":
        return "#3f51b5"; // 파란색
      case "DAANGN":
        return "#e8633e"; // 초록색
      case "OLIVE":
        return "#1ec800"; // 네이버 초록색
      default:
        return "#40c4ff"; // 기본 색상
    }
  }};
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin: 0 0 10px 0;
`;

const Meta = styled.div`
  font-size: 14px;
  color: #999;
`;

const ArticleCard: React.FC<Article> = ({
  title,
  summary,
  corp,
  date,
  url,
}) => (
  <Link href={url} target="_blank" style={{ textDecoration: "none" }}>
    <Card>
      <Category corp={corp}>{corp}</Category>
      <Title>{title}</Title>
      <Meta>
        {date} | {summary}
      </Meta>
    </Card>
  </Link>
);

export default ArticleCard;
