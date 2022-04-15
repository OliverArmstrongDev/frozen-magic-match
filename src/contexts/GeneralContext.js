import React, { createContext, useReducer} from 'react'

import anna from "../img/anna.png";
import elsa from "../img/elsa.png";
import elseAnna from "../img/elsa-anna.png";
import annaElsaOlaf from "../img/anna-elsa-olaf.png";
import sven from "../img/sven.png";
import frznAll from "../img/frozen-all.png";
import logoImg from '../img/logo.png';

export const MainContext = createContext();


const actions = {
  UPDATE_DISABLED: 'update-disabled',
  UPDATE_MATCH: 'update-match',
  UPDATE_SCORE: 'update-score',
  UPDATE_CARDS: 'update-cards',
  UPDATE_COLOR: 'update-color',
  UPDATE_TURNS: 'update-turns',
  UPDATE_CHOICE1: 'update-choice1',
  UPDATE_CHOICE2: 'update-choice2',
  UPDATE_GAME: 'update-game',
  RESET_TURNS: 'reset-turns',
  CHANGE_COLOR: 'change-color',
  IS_CHECKED: 'is-checked',
  LAST_SCORE: 'last-score',
  CURRENT_SCORE: 'current-score',
  ADD_DOC: 'add-document',
  SAVE2_DB: 'save2-db',
  MANUAL_CHANGE: 'manual-change',
  RESET_APP: 'reset-app',
  
}

 //reducer
 const mainReducer = (state, action) => {

  const {type, payload} = action;  
    switch(type){
      case actions.RESET_APP:
        return {...state, ...resetVals}
      case actions.MANUAL_CHANGE:
        return {...state, manualChange: payload}
      case actions.SAVE2_DB:
        return {...state, saveToDB: payload}
      case actions.ADD_DOC:
        return {...state, documents: payload}
      case actions.IS_CHECKED:
        return {...state, isChecked: payload}
      case actions.UPDATE_GAME:
        return {...state, gameNumber: payload}
      case actions.LAST_SCORE:
        return {...state, lastScore: payload}
        case actions.CURRENT_SCORE:
            return {...state, currentScore: payload}
      case actions.CHANGE_COLOR:
        return {...state, color: payload}
      case actions.UPDATE_DISABLED:
          return {...state, disabled: payload}
      case actions.UPDATE_COLOR:
          return {...state, color: payload}
      case actions.UPDATE_CHOICE1:
          return {...state, choiceOne: payload}
      case actions.UPDATE_CHOICE2:
          return {...state, choiceTwo: payload}
      case actions.UPDATE_TURNS:
          return {...state, turns: state.turns + 1}
          case actions.UPDATE_CARDS:
          return {...state, cards: payload}
          case actions.UPDATE_MATCH:
            return {...state, cards: state.cards.map(card => {
              if(card.src === state.choiceOne.src) {
                return {...card, matched: true}
              }else{
                return card;
              }
            })}
      case actions.RESET_TURNS:
          return {...state, turns: 0}
      default:
          return state;
      }

 }

 const initState = {
  color: '#00d1f6',
  turns: 0,
  currentScore: null,
  lastScore: [],
  cards: [],
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
  isChecked: true,
  gameNumber: 1,
  documents: null,
  saveToDB: false,
  manualChange: false
 
};

const resetVals = {
  color: "#00d1f6",
  turns: 0,
  currentScore: null,
  lastScore: [],
  gameNumber: 1,
  documents: null
}; 

//  console.log('resetVals', resetVals);



export default function GeneralContext({children}) {

  const [state, dispatch] = useReducer(mainReducer, initState)

   
    const cardImages = [
        {"src": anna, matched: false},
        {"src": elsa, matched: false},
        {"src": elseAnna, matched: false},
        {"src": annaElsaOlaf, matched: false},
        {"src": sven, matched: false},
        {"src": frznAll, matched: false}
      ]
      
  
   
    const themeColors =['#00d1f6', '#f32be2', '#18a1ed','#e9f001', '#e90000', '#a82fac','#1e2e32'];

      //functions
    const shuffleCards = () => {
    
      console.log('shuffle activated!', state.turns);
      
        dispatch({type: actions.LAST_SCORE, payload: state.turns})
      
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }));
       
        dispatch({type: actions.UPDATE_CHOICE1, payload: null});
  
        dispatch({type: actions.UPDATE_CHOICE2, payload: null});
      
        dispatch({type: actions.UPDATE_CARDS, payload: shuffledCards});
     
        dispatch({type: actions.RESET_TURNS});
      }

      const changeColor = (color, manualCH) => {
        console.log('colour change hit', color);
        
        
       if(!state.manualChange){ dispatch({type: actions.MANUAL_CHANGE, payload: manualCH})}

        dispatch({type: actions.CHANGE_COLOR, payload: color})
    }


  return (
    <MainContext.Provider value={{
      state, dispatch,
      actions, 
        cardImages,
        logoImg,
        shuffleCards,
        changeColor,
        themeColors
        }}>
        {children}
    </MainContext.Provider>
  )
}
