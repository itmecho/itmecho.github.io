import Link from 'next/link';
import React from 'react';

const navigationLinks = [{ text: 'Blog', href: '/blog' }];

export default function Header() {
  return (
    <div className="container mx-auto">
      <Link href="/">
        <h1>itmecho.com</h1>
      </Link>
      <nav>
        {navigationLinks.map(({ text, href }) => (
          <a href={href}>{text}</a>
        ))}
      </nav>
    </div>
  );
}
