import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@heroicons/react/solid';
import { ThemeContext } from 'context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

interface NavLink {
  text: string;
  href: string;
  menuOnly?: boolean;
}

const navigationLinks: NavLink[] = [
  { text: 'Home', href: '/', menuOnly: true },
  { text: 'Blog', href: '/blog' },
];

export default function Header() {
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);

  const ThemeIcon = () => {
    const iconClasses = 'mx-auto w-8 h-8 md:w-5 md:h-5';

    return (
      <div
        className="p-2 rounded cursor-pointer duration-150 hover:bg-gray-800 hover:text-indigo-300 text-indigo-700 dark:text-yellow-300"
        onClick={() => toggleDarkMode && toggleDarkMode()}
      >
        {darkMode ? <SunIcon className={iconClasses} /> : <MoonIcon className={iconClasses} />}
      </div>
    );
  };

  const [menuOpen, setMenuOpen] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  const Button = ({
    className,
    onClick,
    children,
  }: {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
  }) => (
    <button
      className={`${className} cursor-pointer px-4 py-2 rounded duration-150 hover:bg-gray-800 hover:text-white`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <>
      <header className="flex justify-between items-center p-4 md:px-0 md:py-8">
        <Link href="/">
          <p className="font-brand text-4xl cursor-pointer">itmecho</p>
        </Link>
        <nav>
          <div className="block md:hidden">
            <Button onClick={() => setMenuOpen(true)}>
              <MenuIcon className="w-8 h-8" />
            </Button>
          </div>
          <div className="hidden md:flex items-center">
            {navigationLinks
              .filter((link) => !link.menuOnly)
              .map(({ text, href }) => (
                <Link href={href} key={text}>
                  <Button className="mr-4">{text}</Button>
                </Link>
              ))}
            <ThemeIcon />
          </div>
        </nav>
      </header>
      {menuOpen && (
        <div className="z-50 fixed md:hidden h-screen w-screen flex items-center justify-center bg-indigo-200 dark:bg-indigo-800">
          <div className="fixed top-0 right-0 mt-4 mr-4">
            <Button className="mb-2" onClick={() => setMenuOpen(false)}>
              <XIcon className="w-8 h-8" />
            </Button>
            <ThemeIcon />
          </div>
          <div className="text-center">
            {navigationLinks.map(({ text, href }) => (
              <Link href={href}>
                <p className="text-3xl my-6">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
