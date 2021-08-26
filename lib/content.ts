import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { bundleMDX } from 'mdx-bundler';

const postsDir = join(process.cwd(), 'posts');

interface Frontmatter {
  title: string;
  summary: string;
  date: string;
}

export interface PostMeta extends Frontmatter {
  readingTime: string;
  slug: string;
}

export interface Post extends PostMeta {
  code: string;
}

function getPostMeta(fileName: string, fileData: string): PostMeta {
  const { data, content } = matter(fileData);
  if (data.title === undefined) {
    throw new Error(`Post has no title: ${fileName}`);
  }
  if (data.summary === undefined) {
    throw new Error(`Post has no summary: ${fileName}`);
  }
  if (data.date === undefined) {
    throw new Error(`Post has no summary: ${fileName}`);
  }

  try {
    new Date(Date.parse(data.date));
  } catch (e) {
    throw new Error(`Post has an invalid date (${data.date}): ${fileName}`);
  }

  return {
    title: data.title,
    summary: data.summary,
    date: data.date,
    readingTime: readingTime(content).text,
    slug: fileName.replace(/.mdx?$/, ''),
  };
}

export function listPostFiles(): string[] {
  return readdirSync(postsDir);
}

export function loadAllPostMeta() {
  const files = listPostFiles();

  return files.reduce((allMeta: PostMeta[], file: string) => {
    const fileData = readFileSync(join(postsDir, file), 'utf-8');
    const meta = getPostMeta(file, fileData);

    return [meta, ...allMeta];
  }, []);
}

export async function loadSinglePost(slug: string) {
  const fileName = `${slug}.mdx`;
  const filePath = join(postsDir, fileName);
  const fileContents = readFileSync(filePath, 'utf-8');
  const meta = getPostMeta(fileName, fileContents);
  const { code } = await bundleMDX(fileContents);

  return {
    ...meta,
    code,
  };
}
