import Image from "next/image";
import Content from "@/components/Content";
import CategoryCard from "@/components/CategoryCard";
import { formatCategoryTitle, CATEGORIES } from "@/lib/utils";

export default async function Home() {
  // TODO: Fetch the data from /api/data
  const res = await fetch("http://localhost:3000/api/data", {
    cache: "no-store",
  });
  const data = await res.json();

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center mt-12">
      <h1 className="text-3xl font-bold text-gray-800">Content Categories</h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {CATEGORIES.map(({ key, title, description }) => (
          <CategoryCard
            key={key}
            title={title}
            description={description}
            href={`/category/${key}`}
          />
        ))}
      </section>
    </main>
  );
}
