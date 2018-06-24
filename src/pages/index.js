import React from "react";
import name from '../assets/images/name.svg';

export default () => (
    <div style={{ width: '100%', height: '100vh', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={name} style={{ width: '100%', maxWidth: '407px' }} />
    </div>
);