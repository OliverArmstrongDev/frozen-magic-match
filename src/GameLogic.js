// import { useTheme } from './hooks/useTheme';
import { useEffect, useContext} from 'react';
import './App.css';
import { MainContext } from './contexts/GeneralContext';
import SingleCard from './components/SingleCard';
import { useCollection } from "./hooks/useCollection";
import { useAuthContext } from './hooks/useAuthContext';




function GameLogic() {
  //get global state variables
const {
  dispatch, actions,
  state,
  shuffleCards,changeColor
} = useContext(MainContext);
const {user} = useAuthContext();

const {documents, error, getColorDocument} = useCollection('GameColor',
["uid", "==", user ? user.uid: null]
);


//init shufflecards()
useEffect(() => {
  
  shuffleCards();
  },[])

//update background color on color change
useEffect(() => { 
  let _BGColor;
  let _manual;

  // console.log('is user', user);
  // console.log('manual change', state.manualChange);
  // console.log('docs firestore', documents);
  // console.log('docs state', state.documents);
  
 if(documents && documents.length > 0){

   if(!state.manualChange){ //if NOT a manual change //= false
      
          if(user && documents[0].BGColour !== undefined){
                  _BGColor = documents[0].BGColour
                  // console.log('from firestore', _BGColor);
                
                }  
            else{
                  _BGColor = state.color;
                  // console.log('else bg from state',_BGColor);
                }
          _manual = false;
        
    }
    else{ //if it is a manual color change
      
      _BGColor = state.color; 
      _manual = true;
    }    
  }
 else{
      
      _BGColor = state.color; 
      _manual = false;
 }
   
    document.body.style.backgroundColor = _BGColor;
    changeColor(_BGColor, _manual);

}, [state.color, state.lastScore, state.documents, state.manualChange, user]) 


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
    <div className="GameLogic main-div" style={{background: state.color}}>
    {state.cards && state.cards.every(card=> (card.matched === true)) ? <div className='success-div font-face-ik'> <h1 className='success-msg'>Woohoo! <br /> You matched them all!!</h1></div>  : null}
      <div className="card-grid">
        {state.cards && state.cards.map(card => (
        <SingleCard 
        handleChoice={handleChoice} 
        key={card.id} 
        card={card}
        flipped={card === state.choiceOne || card === state.choiceTwo || card.matched}
        disabled={state.disabled}
        />
        ))}
        </div>
        <h1>Game number: {state.gameNumber}</h1>
       <p className='font-face-ik '>Turns: {state.turns}</p>
    </div>
     </>
  );
}

export default GameLogic;
