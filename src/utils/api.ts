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

export async function getPostsByCorp(corp: string): Promise<Article[]> {
  const res = await fetch(`${API_HOST}/corps?corp=${encodeURI(corp)}`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts by corp");
  }

  return res.json();
}

export async function searchPosts(keyword: string): Promise<Article[]> {
  const url = new URL(`${API_HOST}/search`);
  const params = new URLSearchParams();
  params.append('keyword', keyword);
  url.search = params.toString();

  const res = await fetch(url.toString(), {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Search request failed');
  }

  return res.json();
}