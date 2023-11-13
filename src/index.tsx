import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getQuarter } from './js/utility';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const now = new Date(Date.now())
const currentQuarter = getQuarter(now)
root.render(
  <React.StrictMode>
    <App currentQuarter={0} />
  </React.StrictMode>
);