// import { useTheme } from './hooks/useTheme';
import { useEffect, useContext} from 'react';
import './App.css';
import { MainContext } from './contexts/GeneralContext';
import SingleCard from './components/SingleCard';


function GameLogic() {
  //get global state variables
const {
  dispatch, actions,
  state,
  shuffleCards
} = useContext(MainContext);


//init shufflecards()
useEffect(() => {
  shuffleCards();
  },[])

//update background color on color change
useEffect(() => { 
  document.body.style.backgroundColor = state.color;
}, [state.color]) 

// useEffect(() => { 
//   if(state.cards.length){
//     state.cards.every(card=> (card.matched === true)) 
//     ? 
//     alert('You matched them all. Great work!')
//     : 
//     console.log('not all matched', state.cards);

//   } 
//   else{
//    console.log('no lenth', state.cards.length );
//   }
// }, [state.cards]) 


useEffect(() => {
  if(state.choiceOne && state.choiceTwo){
    dispatch({type: actions.UPDATE_DISABLED, payload: true});
   
      if( state.choiceOne.src === state.choiceTwo.src){
        const _data = state.cards.map(card => {
          if(card.src === state.choiceOne.src) {
          return {...card, matched: true }
          }
          else
          {
            return card;
          }
        })
        dispatch({type: actions.UPDATE_CARDS, payload: _data});
        setTimeout(() => resetTurn(), 1000);
      
   }else { 
      setTimeout(() => resetTurn(), 1000);
    
    }
  }
},[state.choiceOne, state.choiceTwo, state.turns])


//handle a choice
const handleChoice = (card) => {
state.choiceOne ? dispatch({type: actions.UPDATE_CHOICE2 , payload: card}) : dispatch({type: actions.UPDATE_CHOICE1, payload: card})

}

const resetTurn = () => {
  console.log('reset turn');
  dispatch({type: actions.UPDATE_CHOICE1, payload: null})
  dispatch({type: actions.UPDATE_CHOICE2, payload: null})
  dispatch({type: actions.UPDATE_TURNS})
  dispatch({type: actions.UPDATE_DISABLED, payload: false});
}
  return (
    <>
    <div  className="GameLogic main-div" style={{background: state.color}}>
    {state.cards.every(card=> (card.matched === true)) ? <div className='success-div font-face-ik'> <h1 className='success-msg'>Woohoo! <br /> You matched them all!!</h1></div>  : null}
      <div className="card-grid">
        {state.cards.map(card => (
        <SingleCard 
        handleChoice={handleChoice} 
        key={card.id} 
        card={card}
        flipped={card === state.choiceOne || card === state.choiceTwo || card.matched}
        disabled={state.disabled}
        />
        ))}
        </div>
       
        <p className='font-face-ik '>Turns: {state.turns}</p>
    </div>
     </>
  );
}

export default GameLogic;
