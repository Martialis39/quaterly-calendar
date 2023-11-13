import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getQuarter } from './js/utility';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const quarter = getQuarter(new Date(Date.now()))

root.render(
  <React.StrictMode>
    <App currentQuarter={quarter} />
  </React.StrictMode>
);