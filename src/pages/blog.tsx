import React from 'react';
import { graphql, PageProps } from 'gatsby';
import BaseLayout from '@components/layout/BaseLayout';
import PostPreview from '@components/PostPreview';
import SearchBar from '@components/SearchBar';

interface Edge {
  node: {
    id: string;
    excerpt: string;
    frontmatter: {
      date: string;
      slug: string;
      title: string;
    };
  };
}

interface Data {
  allMarkdownRemark: {
    edges: Edge[];
  };
}

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}: PageProps<Data>) => {
  const [filter, setFilter] = React.useState('');

  const posts = edges
    .filter(
      (edge: Edge) =>
        !!edge.node.frontmatter.date && edge.node.frontmatter.title.toLowerCase().includes(filter)
    )
    .sort((a, b) => {
      if (a.node.frontmatter.date > b.node.frontmatter.date) return 1;
      if (a.node.frontmatter.date < b.node.frontmatter.date) return -1;
      return 0;
    })
    .map((edge: Edge) => (
      <PostPreview
        key={edge.node.id}
        title={edge.node.frontmatter.title}
        date={edge.node.frontmatter.date}
        excerpt={edge.node.excerpt}
        url={`/blog/${edge.node.frontmatter.slug}`}
      />
    ));

  console.log(posts);
  return (
    <BaseLayout>
      <div className="mb-8">
        <SearchBar query={filter} onChange={(newValue: string) => setFilter(newValue)} />
      </div>
      <div className="grid grid-flow-cols gap-8 md:grid-cols-2">{posts}</div>
    </BaseLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`;
