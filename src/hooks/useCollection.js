import { useState, useEffect, useRef, useContext } from "react";
import { MainContext } from "../contexts/GeneralContext";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const { actions, dispatch } = useContext(MainContext);

  //useRef stops the loop of re-rendering array 'query'

  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    //    console.log('query', query);

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
       
        setDocuments(results);

        dispatch({ type: actions.ADD_DOC, payload: results });

        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not get the data");
        dispatch({ type: actions.ADD_DOC, payload: null });
        setDocuments(null);
      }
    );

    //unsubscribe on unmount

    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, setDocuments, error };
};
