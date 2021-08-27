import { listPostFiles, loadSinglePost, Post } from '@itmecho/lib/content';
import { getMDXComponent } from 'mdx-bundler/client';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import React from 'react';

interface Props {
  post: Post;
}

export default function BlogPost({ post }: Props) {
  const Component = React.useMemo(() => getMDXComponent(post.code), [post.code]);
  const heading = 'mt-12 mb-6';

  return (
    <>
      <Image src={post.featureImage} alt="Feature image" width={960} height={540} />
      <h1 className="text-4xl md:text-6xl md:leading-tight font-bold my-8">{post.title}</h1>
      <article>
        <Component
          components={{
            h1: (props) => <h1 className={`${heading}`} {...props} />,
            h2: (props) => <h2 className={`${heading} text-3xl`} {...props} />,
            h3: (props) => <h3 className={`${heading} text-2xl`} {...props} />,
            h4: (props) => <h4 className={`${heading} text-xl`} {...props} />,
            h5: (props) => <h5 className={`${heading} text-lg`} {...props} />,
            p: (props) => <p className="mb-6 leading-loose" {...props} />,
            a: (props) => (
              <a
                className="text-indigo-500 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-100 duration-150"
                {...props}
              />
            ),
            pre: (props) => (
              <pre
                className="overflow-x-auto md:mx-4 mb-6 px-6 py-4 md:px-8 md:py-6 rounded bg-gray-100 dark:bg-gray-900"
                {...props}
              />
            ),
            ul: (props) => <ul className="ml-10 mb-6 list-disc list-outside" {...props} />,
            ol: (props) => <ol className="ml-10 mb-6 list-decimal list-outside" {...props} />,
            li: (props) => <li className="pl-4" {...props} />,
          }}
        />
      </article>
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
