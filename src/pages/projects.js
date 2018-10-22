import React from 'react';
import PageHeader from '../components/page-header';
import PageContent from '../components/page-content';
import Project from '../components/project';

export default function Projects() {
  const { edges: projects } = data.allMarkdownRemark;

  return (
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
  );
}

export const projQuery = graphql`
  query projQuery {
    allMarkdownRemark {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            description
            role
            stack
            github
            live
            path
          }
        }
      }
    }
  }
`;
