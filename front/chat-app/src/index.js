import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import API from './context/API';


ReactDOM.render(
  <React.StrictMode>
    <API>
      <App />
    </API>
  </React.StrictMode>,
  document.getElementById('root')
);

