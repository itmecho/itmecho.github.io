import Header from '@itmecho/layout/Header';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container mx-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
}
