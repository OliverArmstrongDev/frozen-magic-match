import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/Icekingdom.ttf';
import App from './App';
import { ThemeContextProvider } from './contexts/ThemeContext';
import ScoreBoard from './components/ScoreBoard';
import ThemeSelector from './components/ThemeSelector';
import Header from './components/Header';
import GeneralContext from './contexts/GeneralContext';


ReactDOM.render(
  <React.StrictMode>
     <GeneralContext> 
      <ThemeContextProvider>
        <Header/>
        <ThemeSelector/>
      {/* <div className='main-container flex justify-center content-center'> */}
        <ScoreBoard/>
        <App />
      {/* </div> */}
      </ThemeContextProvider>
    </GeneralContext>
  </React.StrictMode>,
  document.getElementById('root')
);
