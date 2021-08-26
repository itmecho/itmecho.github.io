import Link from 'next/link';
import React from 'react';

const navigationLinks = [{ text: 'Blog', href: '/blog' }];

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 md:px-0 md:py-8">
      <Link href="/">
        <p className="font-brand text-4xl cursor-pointer">itmecho</p>
      </Link>
      <nav className="block md:hidden">Mobile</nav>
      <nav className="hidden md:block">
        {navigationLinks.map(({ text, href }) => (
          <Link href={href} key={text}>
            <p className="cursor-pointer px-4 py-2 rounded duration-150 hover:bg-gray-800 hover:text-white">
              {text}
            </p>
          </Link>
        ))}
      </nav>
    </header>
  );
}
