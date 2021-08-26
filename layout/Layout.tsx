import Header from '@itmecho/layout/Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container mx-auto md:px-64 min-h-screen flex flex-col items-strech">
      <Header />
      <main className="p-8 flex-grow">{children}</main>
    </div>
  );
}
