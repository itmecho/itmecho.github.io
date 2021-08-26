import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDir = join(process.cwd(), 'posts');

export interface PostMeta {
  title: string;
  summary: string;
  readingTime: string;
  slug: string;
}

export function loadAllPostMeta() {
  const files = readdirSync(postsDir);

  return files.reduce((posts: PostMeta[], file: string) => {
    const contents = readFileSync(join(postsDir, file), 'utf-8');
    const { data, content } = matter(contents);
    if (data.title === undefined) {
      throw new Error(`Post has no title: ${file}`);
    }
    if (data.summary === undefined) {
      throw new Error(`Post has no summary: ${file}`);
    }

    return [
      {
        title: data.title,
        summary: data.summary,
        readingTime: readingTime(content).text,
        slug: file.replace(/.mdx?/, ''),
      },
      ...posts,
    ];
  }, []);
}
