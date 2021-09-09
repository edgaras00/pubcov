import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {ArticleContextProvider} from './Context/articleContext';

ReactDOM.render(
  <Router>
    <ArticleContextProvider>
      <App />
    </ArticleContextProvider>
  </Router>,
  document.getElementById('root')
  );