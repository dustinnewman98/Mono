import React from 'react';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import Project from '../components/project';
import Layout from '../layouts';

export default function Projects({ data }) {
  const { edges: projects } = data.allMarkdownRemark;

  return (
    <Layout>
      <PageContent>
        <PageHeader text="My Projects" emoji="🤖" />
        {projects
          .filter(project => project.node.frontmatter.title.length > 0)
          .map(({ node: project }) => {
            return (
              <Project
                title={project.frontmatter.title}
                description={project.frontmatter.description}
                role={project.frontmatter.role}
                stack={project.frontmatter.stack}
                github={project.frontmatter.github}
                live={project.frontmatter.live}
              />
            );
          })}
      </PageContent>
    </Layout>
  );
}

export const projQuery = graphql`
  query projQuery {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: {
          regex: "/(\/src\/projects)/.*.md$/"
        }
      }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            role
            stack
            github
            live
          }
        }
      }
    }
  }
`;
