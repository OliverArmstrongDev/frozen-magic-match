import  { useState, useEffect, useContext } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext';
import { useCollection } from './useCollection';
import { MainContext } from '../contexts/GeneralContext';

export const useLogout = () => {
    const [isCancelled, setIsCancelled] =useState(false);
    const [error, setError] =useState(null);
    const [isPending, setIsPending] =useState(false);
    const {dispatch, actionType} = useAuthContext();
    const { actions, dispatch: stateDispatch, changeColor} = useContext(MainContext);

  const logout = async () => {
      setError(null);
      setIsPending(true);

    try {
        //logout user
         await projectAuth.signOut();

    
        //dispatch logout action
        dispatch({type: actionType.LOGOUT})
        //set documents to null/
        //stateDispatch({type: actions.ADD_DOC, payload: null});
        stateDispatch({type: actions.RESET_APP});
        changeColor('#00d1f6');

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
    

    return {logout, error, isPending}


}