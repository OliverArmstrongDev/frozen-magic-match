import { useState, useEffect, useContext } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { MainContext } from '../contexts/GeneralContext';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] =useState(false);
    const [error, setError] =useState(null);
    const [isPending, setIsPending] =useState(false);
    const {dispatch, actionType} = useAuthContext();

    const {state } = useContext(MainContext);
      const {user} = useAuthContext();

   
    const login = async (email, password) => {
    setError(null);
    setIsPending(true);

        try {
        //signup user
        const res =  await projectAuth.signInWithEmailAndPassword(email, password);
        

        if(!res){
            throw new Error('Could not log in')
        }

            //dispatch login action
            dispatch({type: actionType.LOGIN, payload: res.user})
            console.log('turs', state.turns);
            console.log(res);

            if(!isCancelled){
                setIsPending(false)
                setError(null);
               }
           } 
           catch (error) {
           if(!isCancelled){
               console.log(error.message);
               setError(error.message);
               setIsPending(false);
           }
        }
    }

    useEffect(() => {
        return () => { setIsCancelled(true); }
      }, [])

    return { error, isPending, login  } 
}


