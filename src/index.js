import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Icekingdom.ttf';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import GeneralContext from './contexts/GeneralContext';
import { AuthContextProvider } from './contexts/AuthContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
