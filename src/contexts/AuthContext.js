import React, { createContext, useEffect, useReducer } from 'react'
import { projectAuth } from '../firebase/config';

export const actionType = {
    LOGIN: 'login',
    LOGOUT: 'logout',
    SIGNUP: 'signup',
    AUTHISREADY: 'auth-ready'
}
export const AuthContext = createContext();

export const authReducer = (state, action) => {
   const {type, payload} = action; //destructure action props

    switch (type) {
        case actionType.AUTHISREADY:
            return {...state, user: payload, authIsReady: true}
        case actionType.LOGIN:
            return {...state, user: payload}
        case actionType.LOGOUT:
            return {...state, user: null}
        default:
            return state;
    }
}


 // set logout to clear state - scores etc
 
export const AuthContextProvider = ({children}) => {
const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
})

useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged((user)=> {
        dispatch({type: actionType.AUTHISREADY, payload:user })
        unsub();
   })
}, [])


console.log('AuthContext State: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch, actionType}}>
            {children}
        </AuthContext.Provider>
    )
}