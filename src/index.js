import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App';
import { AlertState } from './context/AlertContext';
import { LoadingBarState } from './context/LoadingBarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingBarState>
    <AlertState>
      <App />
    </AlertState>
    </LoadingBarState>
  </React.StrictMode>
);