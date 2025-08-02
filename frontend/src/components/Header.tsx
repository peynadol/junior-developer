import React from "react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
  return (
    <header className="text-white flex col justify-start items-center w-full bg-background p-4">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Citizens Advice SORT"
          width={150}
          height={150}
          priority
        />
      </Link>
      <div className="flex flex-col ml-4">
        <h1 className="text-2xl font-bold mt-4">Citizens Advice SORT</h1>
        <h2 className="text-lg font-medium">Junior Developer Practical</h2>
      </div>
    </header>
  );
};

export default Header;
