import React, { createContext, useReducer} from 'react'

export const ThemeContext = createContext();



const themeReducer = (state, action) => {
switch (action.type){
    case 'CHANGE_COLOR':
         return {...state, color: action.payload}
    case 'UPDATE_SCORE':
         return {...state, score: action.payload}
    case 'SET_FUNC':
         return {...state, func: action.payload}
    case 'KEYWORD':
         return {...state, keyword: action.payload}
        default:
            return state;
    }
}
export const ThemeContextProvider= ({children})=> {
    
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#00d1f6',
        score: 0,
        myFunc: () => ()=> {},
        keyword: ''
        
    })

const changeColor = (color) => {
    dispatch({type: 'CHANGE_COLOR', payload: color})
}
const updateScore = (score) => {
    dispatch({type: 'UPDATE_SCORE', payload: score})
}
const setMyFunc = (func) => {
    dispatch({type: 'SET_FUNC', payload: func})

}
const setKeyword = (text) => {
    dispatch({type: 'KEYWORD', payload: text})

}


  return (
    <ThemeContext.Provider value={{...state, changeColor, updateScore, setKeyword, setMyFunc}}>
        {children}
    </ThemeContext.Provider>
  )
}
