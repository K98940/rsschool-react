import './index.css';
import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { setupStore } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={setupStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);
