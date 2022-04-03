import React, { useContext } from 'react'
import { MainContext } from '../contexts/GeneralContext';
// import { useTheme } from '../hooks/useTheme';
//import './ScoreBoard.css';


const ScoreBoard =() => {
    //const {score} = useTheme();
    const {score} = useContext(MainContext);

  return (
    <div className='score-container'>
        <p className='score-title'>Your last score: {score}</p>
    </div>
  )
}

export default ScoreBoard