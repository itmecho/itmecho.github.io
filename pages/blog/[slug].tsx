import { listPostFiles, loadSinglePost, Post } from '@itmecho/lib/content';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPropsContext } from 'next';
import React from 'react';

interface Props {
  post: Post;
}

export default function BlogPost({ post }: Props) {
  const Component = React.useMemo(() => getMDXComponent(post.code), [post.code]);

  return (
    <>
      <img src={post.featureImage} alt="Feature image" />
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <Component />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const params = context.params as { slug: string };
  const post = await loadSinglePost(params.slug);

  return {
    props: {
      post,
    },
  };
}

export function getStaticPaths() {
  const slugs = listPostFiles().map((file) => file.replace(/.mdx?$/, ''));

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}
