import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Icekingdom.ttf';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import GeneralContext from './contexts/GeneralContext';
import { AuthContextProvider } from './contexts/AuthContext';


ReactDOM.render(
  <React.StrictMode>
     <GeneralContext> 
      <ThemeContextProvider>
        <AuthContextProvider> 
        <App />
        </AuthContextProvider>
      </ThemeContextProvider>
    </GeneralContext>
  </React.StrictMode>,
  document.getElementById('root')
);
