import React from 'react';
import { graphql } from 'gatsby';
import BaseLayout from '@components/layout/BaseLayout';

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: {
  data: any;
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <BaseLayout>
      <h1 className="text-4xl md:text-6xl md:leading-tight mb-4">{frontmatter.title}</h1>
      <h2 className="text-sm mb-8">{frontmatter.date}</h2>
      <div className="post-content text-lg md:text-md" dangerouslySetInnerHTML={{ __html: html }} />
    </BaseLayout>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
