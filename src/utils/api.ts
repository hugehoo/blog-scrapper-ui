import { API_HOST } from "@/types/ApiConstants";

export interface Article {
  id: string;
  title: string;
  url: string;
  summary: string;
  date: string;
  corp: string;
}

export async function getPosts(): Promise<Article[]> {
  const res = await fetch(`${API_HOST}/posts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}