import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@crfrsr/ui/reset.css';
import '@crfrsr/ui/tokens.css';
import '@crfrsr/ui/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

