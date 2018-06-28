import React from 'react';
import Helmet from 'react-helmet';
import getSeo from '../utils/get-seo';

export default function PostTemplate({ data }) {
    const post = data.markdownRemark;
    const frontmatter = post.frontmatter;

    return (
        <div>
            <Helmet
                title={getSeo(frontmatter.title)}
                meta={[{
                    name: 'og:title',
                    content: `${frontmatter.title}`
                }, {
                    name: 'twitter:title',
                    content: `${frontmatter.title}`
                }, {
                    name: 'description',
                    content: `${frontmatter.subtitle}`
                }, {
                    name: 'og:description',
                    content: `${frontmatter.subtitle}`
                }, {
                    name: 'twitter:description',
                    content: `${frontmatter.subtitle}`
                }, {
                    name: 'twitter:card',
                    content: 'summary'
                }]} />
            <div className="post">
                <h1 className="post-title">{frontmatter.title}</h1>
                {frontmatter.subtitle ? <h2 className="post-subtitle">{frontmatter.subtitle}</h2> : null}
                <h3 className="post-date">{frontmatter.date}</h3>
                <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </div>
    );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        subtitle
      }
    }
  }
`
    ;