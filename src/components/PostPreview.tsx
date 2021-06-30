import { Link } from 'gatsby';
import React from 'react';

interface Props {
  excerpt: string;
  date: string;
  url: string;
  title: string;
}

export default function PostPreview({ title, excerpt, date, url }: Props) {
  return (
    <Link to={url}>
      <article className="bg-gray-900 bg-opacity-20 text-white rounded h-full p-4 shadow-lg">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm mb-4">{date}</p>
        <p className="">{excerpt}</p>
      </article>
    </Link>
  );
}
