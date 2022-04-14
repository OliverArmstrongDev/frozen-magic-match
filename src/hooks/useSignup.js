import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] =useState(false);
    const [error, setError] =useState(null);
    const [isPending, setIsPending] =useState(false);
    const {dispatch, actionType} = useAuthContext();


    const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

        try {
        //signup user
        const res =  await projectAuth.createUserWithEmailAndPassword(email, password);
        

        if(!res){
            throw new Error('Could not complete signup')
        }

        //add dsiplayname to use
            await res.user.updateProfile({ displayName })

            //dispatch login action
            dispatch({type: actionType.LOGIN, payload: res.user})
            // console.log(res);
            

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

    return { error, isPending, signup  } 
}


