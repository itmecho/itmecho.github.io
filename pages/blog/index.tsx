import fs from "fs";
import matter from "gray-matter";
import path from "path";

interface Post {
  title: string;
}

interface Props {
  posts: Post[];
}

export default function Blog({ posts }: Props) {
  console.log(posts);
  return <div></div>;
}

const postsDir = path.join(process.cwd(), "posts");

export async function getStaticProps() {
  const files = fs.readdirSync(postsDir);
  const posts = files
    .map((f) => path.join(postsDir, f))
    .map((f) => fs.readFileSync(f))
    .map((contents) => matter(contents))
    .map((m) => ({ title: m.data.title }));

  return {
    props: {
      posts,
    },
  };
}
