import Link from "next/link";

const CategoryCard = ({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="group block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
      aria-label={`View ${title} category content`}
    >
      <article className="min-h-[170px] border-2 border-background border-t-8 p-4 shadow-sm group-hover:shadow-md transition cursor-pointer rounded-md bg-white">
        {/* Card header */}
        <header>
          <h2 className="text-gray-800 text-lg font-semibold mb-2">{title}</h2>
        </header>

        {/* Card content */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* CTA */}
        <footer>
          <span
            className="text-sm font-medium text-blue-600 group-hover:underline inline-flex items-center gap-1"
            aria-hidden="true"
          >
            Find Out More
            {/* Could replace this SVG with an icon.
            Opted for SVG to save importing a library just for this. */}
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </footer>
      </article>
    </Link>
  );
};

export default CategoryCard;
