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
            <div className="cursor-pointer">
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <p></p>
            </div>
          </Link>
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
