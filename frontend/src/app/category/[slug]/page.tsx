import { notFound } from "next/navigation";
import Content from "@/components/Content";
import { CATEGORIES } from "@/lib/utils";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  console.log("Category slug:", slug);
  const res = await fetch("http://localhost:3000/api/data", {
    cache: "no-store",
  });
  const data = await res.json();

  const entries = data.filter(
    (entry: { category: string }) => entry.category === slug
  );

  const categoryMeta = CATEGORIES.find((c) => c.key === slug);
  if (!entries.length || !categoryMeta) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center gap-8 p-8 sm:p-20">
      <h1 className="text-2xl font-bold">{categoryMeta.title}</h1>
      <p className="text-gray-600 max-w-2xl text-center">
        {categoryMeta.description}
      </p>

      <div className="flex flex-col gap-8 w-full max-w-3xl">
        {entries.map((entry, i) => (
          <Content key={i} entry={entry} />
        ))}
      </div>
    </main>
  );
}
