import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@crfrsr/design-system-react/reset.css';
import '@crfrsr/design-system-react/tokens.css';
import '@crfrsr/design-system-react/styles.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

