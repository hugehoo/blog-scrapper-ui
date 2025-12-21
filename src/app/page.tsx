import { Article } from "../types/Article";
import ClientSideContent from "../components/ClientSideContent";
import { CorpList, Corps } from "@/types/constants";
import { API_HOST } from "@/types/ApiConstants";

async function getPosts(page: number = 1, limit: number = 20): Promise<Article[]> {
  try {
    console.log(`Fetching posts from: ${API_HOST}/posts?page=${page}&limit=${limit}`);
    const res = await fetch(`${API_HOST}/posts?page=${page}&limit=${limit}`, { cache: "no-store" });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log(`Fetched ${data.length} articles`);
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const articles = await getPosts(1, 20);
  const categories = Array.from(
    CorpList.filter((corp) => corp.name !== Corps.BUZZVIL.name).map(
      (corp) => corp.name
    )
  );

  console.log(`Home: ${articles.length} initial articles loaded`);

  return (
    <main>
      <ClientSideContent initialArticles={articles} categories={categories} />
    </main>
  );
}
