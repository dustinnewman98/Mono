import React from "react";
import Link from 'gatsby-link';
import PageHeader from "../components/page-header";
import PageContent from "../components/page-content";

function getMonth(input) {
    let d = new Date(input);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[d.getMonth()];
}

function getDay(input) {
    let d = new Date(input);
    return d.getDate();
}

export default function Posts({ data }) {
    const { edges: posts } = data.allMarkdownRemark;
    return (
        <PageContent>
            <PageHeader text='My Posts' emoji='💌' />
            {posts
                .filter(post => post.node.frontmatter.title.length > 0)
                .map(({ node: post }) => {
                    return (<Link to={post.fields.path} className="one-post" style={{ display: 'flex' }}>
                        <div className="one-post-date" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h1 className="one-post-date-day">{getDay(post.fields.date)}</h1>
                            <p className="one-post-date-month">{getMonth(post.fields.date)}</p>
                        </div>
                        <div className="one-post-blurb" style={{ display: 'flex', flexDirection: 'column' }}>
                            <h1 className="one-post-blurb-title">{post.frontmatter.title}</h1>
                            <h2 className="one-post-blurb-subtitle">{post.frontmatter.subtitle}</h2>
                        </div>
                    </Link>);
                })}
        </PageContent>
    );
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
        filter: {
            sourceInstanceName: { 
                eq: "posts" 
            }
        }
        sort: { 
            order: DESC, 
            fields: [fields___date] 
        }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            date(formatString: "MMMM DD, YYYY")
            path
          }
          frontmatter {
            title
            subtitle
          }
        }
      }
    }
  }
`;