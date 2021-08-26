import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import { ThemeContext } from 'context/ThemeContext';
import Link from 'next/link';
import React from 'react';

const navigationLinks = [{ text: 'Blog', href: '/blog' }];

export default function Header() {
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);

  const ThemeIcon = () => {
    const iconClasses = 'w-5 h-5';

    return (
      <div
        className="ml-4 p-2 rounded cursor-pointer duration-150 hover:bg-gray-800 hover:text-indigo-300 text-indigo-700 dark:text-yellow-300"
        onClick={() => toggleDarkMode && toggleDarkMode()}
      >
        {darkMode ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
      </div>
    );
  };

  return (
    <header className="flex justify-between items-center p-4 md:px-0 md:py-8">
      <Link href="/">
        <p className="font-brand text-4xl cursor-pointer">itmecho</p>
      </Link>
      <nav>
        <div className="block md:hidden">Mobile</div>
        <div className="hidden md:flex items-center">
          {navigationLinks.map(({ text, href }) => (
            <Link href={href} key={text}>
              <p className="cursor-pointer px-4 py-2 rounded duration-150 hover:bg-gray-800 hover:text-white">
                {text}
              </p>
            </Link>
          ))}
          <ThemeIcon />
        </div>
      </nav>
    </header>
  );
}
