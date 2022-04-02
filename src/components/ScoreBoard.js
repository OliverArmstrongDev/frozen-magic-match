import React from 'react'
import { useTheme } from '../hooks/useTheme';
import './ScoreBoard.css';


const ScoreBoard =() => {
    const {score} = useTheme();

  return (
    <div className='score-container'>
        <p className='score-title'>Your last score: {score}</p>
    </div>
  )
}

export default ScoreBoard