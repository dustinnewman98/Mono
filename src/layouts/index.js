import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header';
import '../styles/main.scss';
import getSeo from '../utils/get-seo';

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <Helmet
          defaultTitle={`DUSTIN NEWMAN`}
          titleTemplate={`%s | DUSTIN NEWMAN`}
        />
        <Header />
        {this.props.children}
      </div>
    );
  }
}
