import { loadAllPostMeta, PostMeta } from '@itmecho/lib/content';
import Link from 'next/link';

interface Props {
  posts: PostMeta[];
}

export default function Blog({ posts }: Props) {
  return (
    <>
      <h2>Blog</h2>
      {posts.map((p) => (
        <div key={p.slug}>
          <Link href={`/blog/${p.slug}`}>
            <h4>{p.title}</h4>
          </Link>
          <p>{p.summary}</p>
          <p></p>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const posts = loadAllPostMeta();

  return {
    props: {
      posts,
    },
  };
}
