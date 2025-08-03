import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-background text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Site branding and navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Go to Citizens Advice SORT homepage"
            className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded"
          >
            <Image
              src="/logo.png"
              alt="Citizens Advice SORT logo"
              width={80}
              height={80}
              priority
            />
          </Link>
          <div className="flex flex-col justify-center">
            {/* Site title */}
            <div
              className="text-2xl font-bold"
              role="banner"
              aria-label="Site title"
            >
              Citizens Advice SORT
            </div>
            <div className="text-lg font-medium text-gray-200">
              Junior Developer Practical
            </div>
          </div>
        </div>

        {/* Disclaimer notice */}
        <div
          className="text-sm text-white bg-white/10 rounded-md px-3 py-2 border border-white/20"
          role="complementary"
          aria-label="Important disclaimer"
        >
          <span className="font-semibold" aria-label="Disclaimer notice">
            Disclaimer:
          </span>{" "}
          This site is part of a job application and is not affiliated with or
          endorsed by Citizens Advice.
        </div>
      </div>
    </header>
  );
};

export default Header;
