import React from 'react';
import Header from './Header';

interface Props {
  children?: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <div
      className={`min-w-screen min-h-screen p-4 pt-0 md:p-8 md:pt-0 text-white bg-gradient-to-tr from-blue-400 to-purple-700`}
    >
      <Header />
      <main className="max-w-screen-lg mx-auto mt-8">{children}</main>
    </div>
  );
}
