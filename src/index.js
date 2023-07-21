import React from 'react';
import App from './App';
import reactDOM from 'react-dom/client';

import './scss/main.scss';

const root = reactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);