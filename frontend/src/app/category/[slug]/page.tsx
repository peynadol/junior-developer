import { notFound } from "next/navigation";
import Content from "@/components/Content";
import { CATEGORIES } from "@/lib/utils";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
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
    <main className="px-6 sm:px-12 py-12 max-w-4xl mx-auto space-y-10 text-left">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-blue-600">{categoryMeta.title}</span>
      </nav>

      <h1 className="text-4xl font-extrabold">{categoryMeta.title}</h1>
      <h2 className="text-2xl max-w-2xl text-left underline">
        {categoryMeta.description}
      </h2>

      <div className="flex flex-col gap-8 w-full max-w-3xl">
        {entries.map((entry, i) => (
          <Content key={i} entry={entry} />
        ))}
      </div>
    </main>
  );
}
