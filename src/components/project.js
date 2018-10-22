import React from 'react';
import Link from 'gatsby-link';

class Project extends React.Component {
  render = () => {
    return (
      <div className='one-project'>
        <div className='text-box'>
          <h1 className='title'>{this.props.title}</h1>
          <p className='description'>{this.props.description}</p>
          <p>🍞 Roll: {this.props.roll}</p>
          <p>🧙 Worked with: {this.props.stack}</p>
          <p>🐙 Github: <a href={`https://www.github.com/${this.props.github}`}>{this.props.github}</a></p>
          <p>✨ Live at: <a href={this.props.live}>{this.props.live}</a></p>
        </div>
        <div className='image-box'>
          <div className='black-box'>
            <img src={this.props.src} />
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
