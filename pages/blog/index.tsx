import { loadAllPostMeta, PostMeta } from '@itmecho/lib/content';
import Link from 'next/link';

interface Props {
  posts: PostMeta[];
}

export default function Blog({ posts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((p) => (
        <Link key={p.slug} href={`/blog/${p.slug}`} passHref>
          <div className="flex flex-col overflow-hidden cursor-pointer shadow-lg rounded-lg bg-white dark:bg-gray-700 duration-150 hover:transform hover:scale-101">
            <img src={p.featureImage} alt="Feature image" />
            <div className="flex flex-col p-4 flex-grow">
              <h3 className="text-2xl mb-4">{p.title}</h3>
              <p className="flex-grow text-sm">{p.summary}</p>
              <div className="flex justify-between items-center mt-6 text-xs">
                <p>{p.date}</p>
                <p>{p.readingTime}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
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
