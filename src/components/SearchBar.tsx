import React, { ChangeEvent } from 'react';

interface Props {
  query: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ query, onChange }: Props) {
  return (
    <input
      className="p-4 w-full border-none rounded"
      placeholder="Search..."
      type="input"
      value={query}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
    />
  );
}
