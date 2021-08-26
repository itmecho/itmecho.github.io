import { loadAllPostMeta, PostMeta } from '@itmecho/lib/content';
import { Paper, Text, Title } from '@mantine/core';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

interface Props {
  posts: PostMeta[];
}

export default function Blog({ posts }: Props) {
  return (
    <>
      <Title>Blog</Title>
      {posts.map((p) => (
        <Paper>
          <Title>{p.title}</Title>
          <Text>{p.summary}</Text>
        </Paper>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const postList = loadAllPostMeta();

  return {
    props: {
      postList,
    },
  };
}
