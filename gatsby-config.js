module.exports = {
  siteMetadata: {
    title: 'itmecho',
    github: 'https://github.com/itmecho',
    twitter: 'https://twitter.com/_itmecho',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'markdown-pages',
        path: './posts/',
      },
      __key: 'posts',
    },
    'gatsby-transformer-remark',
  ],
};
