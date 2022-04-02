import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Icekingdom.ttf';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import ScoreBoard from './components/ScoreBoard';



ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <div className='main-container'>
    <ScoreBoard />
    <App />
    </div>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
