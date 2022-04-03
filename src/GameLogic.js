import { useTheme } from './hooks/useTheme';
import { useState, useEffect, useContext} from 'react';
import './App.css';
import { MainContext } from './contexts/GeneralContext';
import SingleCard from './components/SingleCard';



function GameLogic() {
  //get global state variables
  // const { setKeyword, keyword, color, updateScore} = useTheme();

const {
  score, setScore,
  cards, setCards,
  turns, setTurns,
  choiceOne, setChoiceOne,
  choiceTwo, setChoiceTwo,
  disabled, setDisabled,
  color,
  shuffleCards
} = useContext(MainContext);

//init shufflecards()
useEffect(() => {
  shuffleCards();
  },[])

//update background color on color change
useEffect(() => { 
  document.body.style.backgroundColor = color;
}, [color]) 

useEffect(() => {
  if(choiceOne && choiceTwo){
      setDisabled(true);
    if( choiceOne.src === choiceTwo.src){
       setCards(prevCards  => {
         return prevCards.map(card => {
           if(card.src === choiceOne.src) {
             return {...card, matched: true}
           }else{
             return card;
           }
         })
       })
       setTimeout(() => resetTurn(), 1000);
      } else { 
        
        setTimeout(() => resetTurn(), 1000);
      }
  } 

},[choiceOne, choiceTwo, turns])

//handle a choice
const handleChoice = (card) => {
choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

const resetTurn = () => {
  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1 )
  setDisabled(false);
}
  return (
    <>
    <div  className="GameLogic main-div" style={{background: color}}>
      <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
        handleChoice={handleChoice} 
        key={card.id} 
        card={card}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}
        </div>
        <p className='font-face-ik '>Turns: {turns}</p>
    </div>
     </>
  );
}

export default GameLogic;
