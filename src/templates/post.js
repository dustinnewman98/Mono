import React from 'react'

export default function PostTemplate({ data }) {
    const post = data.markdownRemark;
    const frontmatter = post.frontmatter;

    return (
        <div className="post">
            <h1 className="post-title">{frontmatter.title}</h1>
            {frontmatter.subtitle ? <h2 className="post-subtitle">{frontmatter.subtitle}</h2> : null}
            <h3 className="post-date">{frontmatter.date}</h3>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
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