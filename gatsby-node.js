const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = boundActionCreators;

    node.collection = getNode(node.parent).sourceInstanceName;
    const slug = createFilePath({
      node,
      getNode,
      basePath: 'src/',
    });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              excerpt(pruneLength: 250)
              html
              id
              collection
              fields {
                slug
              }
              frontmatter {
                title
                subtitle
                date
              }
            }
          }
        }
      }
    `).then(result => {
      console.log(result);
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.collection == 'projects') {
          createPage({
            path: `/projects${node.fields.slug}`,
            component: path.resolve(`./src/templates/project.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          });
        } else if (node.collection == 'posts') {
          createPage({
            path: `/posts${node.fields.slug}`,
            component: path.resolve(`./src/templates/post.js`),
            context: {
              // Data passed to context is available in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          });
        }
      });
      resolve();
    });
  });
};
