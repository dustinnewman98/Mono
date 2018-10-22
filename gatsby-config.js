module.exports = {
  siteMetadata: {
    title: 'DUSTIN NEWMAN',
    description: 'LA-based web and iOS developer (will work for chai lattes.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/projects`,
        name: 'projects',
      },
    },
    'gatsby-transformer-remark',
  ],
};
