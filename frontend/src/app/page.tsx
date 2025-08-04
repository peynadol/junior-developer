import CategoryCard from "@/components/CategoryCard";
import { CATEGORIES, formatCategoryTitle } from "@/lib/utils";
import { Entry } from "@/types/data";

type Category = {
  key: string;
  title: string;
  description: string;
};

export default async function Home() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/data`, {
    cache: "no-store",
  });
  const data: Entry[] = await res.json();

  const categoryKeys = Array.from(new Set(data.map((entry) => entry.category)));

  const categories: Category[] = categoryKeys.map((key) => {
    const match = CATEGORIES.find((c) => c.key === key);
    return (
      match || {
        key,
        title: formatCategoryTitle(key),
        description: "Newly added content category.",
      }
    );
  });

  return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center mt-12">
      {/* Page Heading with context for SR */}
      <div>
        <h1 className="text-3xl font-bold">Content Categories</h1>
        <p className="sr-only">
          Browse through {categories.length} content categories to find the
          information you need.
        </p>
      </div>

      {/* Category Cards Section */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl"
        aria-label="Content Categories"
      >
        {categories.map(({ key, title, description }) => (
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
