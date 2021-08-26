import Link from 'next/link';
import React from 'react';

const navigationLinks = [{ text: 'Blog', href: '/blog' }];

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1 className="font-brand">itmecho.com</h1>
      </Link>
      <nav>
        {navigationLinks.map(({ text, href }) => (
          <a href={href}>{text}</a>
        ))}
      </nav>
    </header>
  );
}
