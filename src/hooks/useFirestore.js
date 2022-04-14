import { useEffect, useReducer, useRef, useState } from "react";
import {projectFirestore, timeStamp} from "../firebase/config"



let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null}
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null}
        case 'ERROR':
            return {isPending: false, document: null, success: false, error: action.payload}
        default:
            return state;
        }
}


export const useFirestore =(collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] =useState(false);

    //collection ref

    let ref = projectFirestore.collection(collection); //get refence to collection
  

    //only dispatch if not cancelled

    const dispatchIfNotCancelled = (action) => {
        if(!isCancelled) {
            dispatch(action)
         }
    }

    //add a document

const addDocument = async (doc) => {
    dispatch({type: 'IS_PENDING'})
    console.log('add doc', doc);
   

    try {
        const createdAt = timeStamp.fromDate(new Date());
        const addedDocument = await ref.add({...doc, createdAt });
                
         dispatchIfNotCancelled({type: 'ADDED_DOCUMENT', payload: addedDocument })

    } catch (error) {
        dispatchIfNotCancelled({type: 'ERROR', payload: error.message })
    }
  
}

//update/add document to store color data for logged in user
const updateColorDocument = async (doc) => {
    dispatch({type: 'IS_PENDING'})
    try {
       
        await ref.doc(doc.uid).set({...doc});  
       dispatchIfNotCancelled({type: 'UPDATE_COLOR', payload: updateColorDocument })

        
    } catch (error) {
        dispatchIfNotCancelled({type: 'ERROR', payload: error.message })
    }
  
}

//delete a document

const deleteDocument = async (id) => {
    dispatch({type: 'IS_PENDING'})
    try {
        
          await ref.doc(id).delete()
         dispatchIfNotCancelled({type: 'DELETED_DOCUMENT'})

    } catch (error) {
        dispatchIfNotCancelled({type: 'ERROR', payload: 'Could not delete!' })
    }



}

useEffect(() => {
  return () => setIsCancelled(true);
}, [])

return {addDocument, deleteDocument, updateColorDocument, response}

}
