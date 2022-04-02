import React, { createContext, useReducer } from 'react'

export const ThemeContext = createContext();

const themeReducer = (state, action) => {
switch (action.type){
    case 'CHANGE_COLOR':
         return {...state, color: action.payload}
    case 'UPDATE_SCORE':
         return {...state, score: action.payload}
        default:
            return state;
    }
}
export const ThemeContextProvider= ({children})=> {
    
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#00d1f6',
        score: 0
    })

const changeColor = (color) => {
    dispatch({type: 'CHANGE_COLOR', payload: color})
}
const updateScore = (score) => {
    dispatch({type: 'UPDATE_SCORE', payload: score})
}

  return (
    <ThemeContext.Provider value={{...state, changeColor, updateScore}}>
        {children}
    </ThemeContext.Provider>
  )
}
