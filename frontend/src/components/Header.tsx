import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-background text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Citizens Advice SORT"
              width={80}
              height={80}
              priority
            />
          </Link>
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold">Citizens Advice SORT</h1>
            <h2 className="text-lg font-medium">Junior Developer Practical</h2>
          </div>
        </div>

        <p className="text-sm text-white">
          <strong>Disclaimer:</strong> This site is part of a job application
          and is not affiliated with or endorsed by Citizens Advice.
        </p>
      </div>
    </header>
  );
};

export default Header;
