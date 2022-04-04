import React, { useContext } from 'react'
import { MainContext } from '../contexts/GeneralContext';
// import { useTheme } from '../hooks/useTheme';
//import './ScoreBoard.css';


const ScoreBoard =() => {
    //const {score} = useTheme();
    const {state } = useContext(MainContext);
    //console.log('sboard', score);
    

  return (
    <div className='score-container'>
        <p className='score-title'>Your last score: {state.score}</p>
    </div>
  )
}

export default ScoreBoard