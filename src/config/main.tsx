import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from '../routers';
import './i18n/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
