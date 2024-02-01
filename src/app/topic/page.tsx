import TopicsList from "@/components/TopicsList";
import { Suspense } from "react";
import Loading from "../loading";

export const revalidate = 0;

export default async function Home() {
  return (
    <>
      <h1>Topic</h1>
      <Suspense fallback={<Loading />}>
        <TopicsList />
      </Suspense>
    </>
  );
}