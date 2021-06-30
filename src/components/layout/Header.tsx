import { Link } from 'gatsby';
import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { DiGithubBadge } from 'react-icons/di';

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center w-screen px-16 py-8 text-white">
      <h1 className="text-2xl">
        <Link to="/">itmecho</Link>
      </h1>
      <nav className="flex flex-row">
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="flex flex-row">
        <a className="mr-4" href="https://github.com/itmecho" target="_blank">
          <DiGithubBadge size="2em" />
        </a>
        <a href="https://twitter.com/_itmecho" target="_blank">
          <AiOutlineTwitter size="2em" />
        </a>
      </div>
    </header>
  );
}
