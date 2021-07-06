import { join } from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export interface Post {
  title: string;
  slug: string;
  date: string;
  content: string;
}

const postsPath = join(process.cwd(), 'posts');

export type PostPreview = Omit<Post, 'content'>;

function generatePostPreview(filename: string): PostPreview {
  const slug = filename.replace(/\.md$/, '');
  const fullPath = join(postsPath, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(fileContents);

  return {
    title: data.title,
    slug,
    date: new Date(Date.parse(data.date)).toDateString(),
  };
}

export function getPostList(): PostPreview[] {
  return fs.readdirSync(postsPath).map((filename) => generatePostPreview(filename));
}
