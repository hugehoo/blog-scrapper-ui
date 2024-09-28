"use client";

import React from "react";
import styled from "@emotion/styled";
import { Article } from "../types/Article";
import Link from "next/link";
import {Corps} from "@/types/constants";

const Card = styled.div`
  border-bottom: 1px solid rgba(172, 171, 171, 0.6);
  padding: 20px 0;
`;

const Category = styled.span<{ corp: string }>`
  font-size: 14px;
  font-weight: bolder;
  margin-bottom: 10px;
  display: block;
  color: ${(props) => {
    switch (props.corp) {
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
      default:
        return "#000000"; // 기본 색상
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
