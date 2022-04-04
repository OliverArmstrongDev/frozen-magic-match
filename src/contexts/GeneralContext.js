import React, { createContext, useReducer} from 'react'

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
  RESET_TURNS: 'reset-turns',
  CHANGE_COLOR: 'change-color'
}

 //reducer
 const mainReducer = (state, action) => {

  const {type, payload} = action;  
    switch(type){
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
      case actions.UPDATE_SCORE:
          return {...state, score: payload}
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


export default function GeneralContext({children}) {

  const [state, dispatch] = useReducer(mainReducer, {
    color: '#00d1f6',
    turns: 0,
    score: 0,
    cards: [],
    choiceOne: null,
    choiceTwo: null,
    disabled: false
  })

   
    const cardImages = [
        {"src": "./img/anna.png", matched: false},
        {"src": "./img/elsa.png", matched: true},
        {"src": "./img/elsa-anna.png", matched: true},
        {"src": "./img/anna-elsa-olaf.png", matched: true},
        {"src": "./img/sven.png", matched: true},
        {"src": "./img/frozen-all.png", matched: true}
      ]
      
      //logo
    const logoImg = './img/logo.png';
   
    const themeColors =['#00d1f6', '#f32be2', '#18a1ed','#e9f001', '#e90000', '#a82fac'];

      //functions
    const shuffleCards = () => {
    
      console.log('shuffle activated!');
      
        dispatch({type: actions.UPDATE_SCORE, payload: state.turns})
      
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }));
       
        dispatch({type: actions.UPDATE_CHOICE1, payload: null});
  
        dispatch({type: actions.UPDATE_CHOICE2, payload: null});
      
        dispatch({type: actions.UPDATE_CARDS, payload: shuffledCards});
     
        dispatch({type: actions.RESET_TURNS});
      }

      const changeColor = (color) => {
        console.log('change color hit', color);
        
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
