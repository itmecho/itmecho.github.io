import Layout from '../components/Layout';
import { join } from 'path';
import { getPostList, PostPreview } from '../lib/blog';
import Link from 'next/link';

const postsPath = join(process.cwd(), 'posts');

interface BlogPageProps {
  posts: PostPreview[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <Layout>
      <h2>Blog</h2>
      {posts.map((post) => (
        <Link key={post.title} href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      ))}
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPostList();
  return {
    props: { posts },
  };
}
