import React from 'react';
import Helmet from 'react-helmet';
import getSeo from '../utils/get-seo';

export default function ProjectTemplate({ data }) {
  const project = data.markdownRemark;
  const frontmatter = project.frontmatter;

  return (
    <div>
      <Helmet
        title={getSeo(frontmatter.title)}
        meta={[
          {
            name: 'og:title',
            content: `${frontmatter.title}`,
          },
          {
            name: 'twitter:title',
            content: `${frontmatter.title}`,
          },
          {
            name: 'description',
            content: `${frontmatter.subtitle}`,
          },
          {
            name: 'og:description',
            content: `${frontmatter.subtitle}`,
          },
          {
            name: 'twitter:description',
            content: `${frontmatter.subtitle}`,
          },
          {
            name: 'twitter:card',
            content: 'summary',
          },
        ]}
      />
      <div className="project">
        <h1 className="title">{frontmatter.title}</h1>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query ProjectByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
      }
    }
  }
`;