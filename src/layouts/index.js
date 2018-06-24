import React from 'react';
import Header from '../components/header';
import '../styles/main.scss';

export default ({ children }) => {
    return (
        <div>
            <Header />
            {children()}
        </div>
    )
}