import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <aside>
        <Link href="/">
          <h1>itmecho</h1>
        </Link>
        <Link href="/blog">Blog</Link>
        <div>
          <a href="https://github.com/itmecho">GH</a>
          <a href="https://twitter.com/_itmecho">TW</a>
        </div>
      </aside>
      <main>{children}</main>
    </>
  );
}
