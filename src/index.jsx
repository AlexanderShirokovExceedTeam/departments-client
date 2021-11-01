import ReactDom from 'react-dom'
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.scss';
import App from './App';

ReactDom.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
