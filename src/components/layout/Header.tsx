import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import { AiOutlineTwitter } from 'react-icons/ai';
import { DiGithubBadge } from 'react-icons/di';

export default function Header() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          github
          twitter
        }
      }
    }
  `);

  const metadata = data.site.siteMetadata;

  return (
    <header className="flex flex-row justify-between items-center w-full px-2 md:px-16 py-12 md:py-16 text-white">
      <h1 className="text-2xl">
        <Link to="/">{metadata.title}</Link>
      </h1>
      <nav className="flex flex-row">
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="flex flex-row">
        <a className="mr-4" href={metadata.github} target="_blank">
          <DiGithubBadge size="2em" />
        </a>
        <a href={metadata.twitter} target="_blank">
          <AiOutlineTwitter size="2em" />
        </a>
      </div>
    </header>
  );
}
