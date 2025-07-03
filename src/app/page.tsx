import { Article } from "../types/Article";
import ClientSideContent from "../components/ClientSideContent";
import { CorpList } from "@/types/constants";
import { API_HOST } from "@/types/ApiConstants";

async function getPosts(): Promise<Article[]> {
  const res = await fetch(`${API_HOST}/posts`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Home() {
  const articles = await getPosts();
  const categories = Array.from(CorpList.map((corp) => corp.name));

  return (
    <main>
      <ClientSideContent initialArticles={articles} categories={categories} />
    </main>
  );
}
