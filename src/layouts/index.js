import React from 'react';
import Helmet from 'react-helmet';
import Header from '../components/header';
import '../styles/main.scss';
import getSeo from '../utils/get-seo';

export default ({ children, location }) => {
    return (
        <div>
            <Helmet
                title={getSeo(location.pathname)} />
            <Header />
            {children()}
        </div>
    )
}