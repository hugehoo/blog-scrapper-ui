import { Article } from '../types/Article';
import ClientSideContent from '../components/ClientSideContent';

async function getPosts(): Promise<Article[]> {
  const res = await fetch('https://j7sj1zu2ve.execute-api.ap-northeast-2.amazonaws.com/prod/posts', { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function Home() {
  const articles = await getPosts();
  const categories = Array.from(new Set(articles.map(article => article.corp)));

  return (
    <main>
      <ClientSideContent
        initialArticles={articles}
        categories={categories}
      />
    </main>
  );
}
