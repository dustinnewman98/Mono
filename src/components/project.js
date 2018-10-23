import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

class Project extends React.Component {
  render = () => {
    return (
      <div className="one-project">
        <div className="text-box">
          <Link>
            <h1 className="title">{this.props.title}</h1>
          </Link>
          <div className="info">
            <p className="subtitle">{this.props.subtitle}</p>
            <p>
              <span aria-label="bread" role="img">
                🍞
              </span>{' '}
              Role: {this.props.role}
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
        </div>
        <div className="image-box">
          <div className="black-box">
            <Img fixed={this.props.img} />
          </div>
        </div>
      </div>
    );
  };
}

export default Project;
