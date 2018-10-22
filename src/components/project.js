import React from 'react';
import Link from 'gatsby-link';

class Project extends React.Component {
  render = () => {
    return (
      <div className="one-project">
        <div className="text-box">
          <Link>
            <h1 className="title">{this.props.title}</h1>
          </Link>
          <p className="description">{this.props.description}</p>
          <p>
            <span aria-label="bread" role="img">
              🍞
            </span>{' '}
            Roll: {this.props.roll}
          </p>
          <p>
            <span aria-label="wizard" role="img">
              🧙
            </span>{' '}
            Worked with: {this.props.stack}
          </p>
          <p>
            <span aria-label="octopus" role="img">
              🐙
            </span>{' '}
            Github:{' '}
            <a href={`https://www.github.com/${this.props.github}`}>
              {this.props.github}
            </a>
          </p>
          <p>
            <span aria-label="sparkles" role="img">
              ✨
            </span>{' '}
            Live at: <a href={this.props.live}>{this.props.live}</a>
          </p>
        </div>
        <div className="image-box">
          <div className="black-box">
            <img alt={this.props.title} src={this.props.src} />
          </div>
        </div>
      </div>
    );
  };
}

export default Project;
