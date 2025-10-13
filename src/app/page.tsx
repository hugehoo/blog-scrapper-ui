import ClientSideContent from "../components/ClientSideContent";
import { CorpList, Corps } from "@/types/constants";
import { getPosts } from "@/utils/api";

export default async function Home() {
  const articles = await getPosts();
  const categories = Array.from(
    CorpList.filter((corp) => corp.name !== Corps.BUZZVIL.name).map(
      (corp) => corp.name
    )
  );

  return (
    <main>
      <ClientSideContent initialArticles={articles} categories={categories} />
    </main>
  );
}
