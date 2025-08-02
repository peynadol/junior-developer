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
    <Link href={href}>
      <div className="min-h-[170px] border-2 border-background border-t-8 p-4 shadow-sm hover:shadow-md transition cursor-pointer rounded-md bg-white">
        <h2 className="text-gray-800 text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <span className="text-sm font-medium text-blue-600 hover:underline">
          Find Out More
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;
