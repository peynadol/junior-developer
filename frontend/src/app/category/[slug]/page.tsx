import { notFound } from "next/navigation";
import Content from "@/components/Content";
import { CATEGORIES } from "@/lib/utils";
import Link from "next/link";
import { Entry } from "@/types/data";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/data`, {
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
      {/* Breadcrumb navigation */}
      <nav
        aria-label="Breadcrumb navigation"
        className="text-sm text-gray-500 mb-6"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              aria-label="Go back to homepage"
            >
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="mx-2">
            /
          </li>
          <li aria-current="page" className="text-gray-800 font-medium">
            {categoryMeta.title}
          </li>
        </ol>
      </nav>

      {/* Page header */}
      <header className="space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {categoryMeta.title}
        </h1>
        <p className="text-xl max-w-2xl text-gray-700 border-l-4 border-blue-500 pl-4">
          {categoryMeta.description}
        </p>
        <p className="sr-only">
          This page contains {entries.length}{" "}
          {entries.length === 1 ? "article" : "articles"} about{" "}
          {categoryMeta.title.toLowerCase()}.
        </p>
      </header>

      {/* Content entries */}
      <section
        className="flex flex-col gap-8 w-full max-w-3xl"
        aria-label={`${categoryMeta.title} content articles`}
      >
        {entries.map((entry: Entry, index: number) => (
          <div key={entry.category + index}>
            {entries.length > 1 && (
              <h2 className="sr-only">
                Article {index + 1} of {entries.length}
              </h2>
            )}
            <Content entry={entry} />
          </div>
        ))}
      </section>
    </main>
  );
}
