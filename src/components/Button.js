import React, { useContext } from 'react'
import { MainContext } from '../contexts/GeneralContext';

export default function Button() {
  const {shuffleCards} = useContext(MainContext);
  return (
    <div>
        <button className='font-face-ik btn' onClick={shuffleCards} >New Game</button> 
    
    </div>
  )
}

