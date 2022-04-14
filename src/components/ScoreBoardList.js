import { useContext, useEffect } from "react";
import { MainContext } from '../contexts/GeneralContext';
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection"
import './ScoreBoardList.css'


export default function ScoreBoardList() {
    const {user} = useAuthContext();
    const { state, dispatch, actions } = useContext(MainContext);

    
const { documents, setDocuments, error} = useCollection('GameResults',
["uid", "==", user ? user.uid: null], ["createdAt", "asc"]);


useEffect(() => {

  if(user && documents && documents.length) { 
  dispatch({type: actions.LAST_SCORE, payload: documents[documents.length -1].lastScore})

  }
  
  if(state.documents === null){
   setDocuments(null);
  }

}, [ documents, state.documents, state.lastScore])


  return (
    <div>
        {/* { documents.map(doc => ( console.log(doc.createdAt.toDate())))} */}
       
            <div className="scorelist-container"> 
                <h3>Score List:</h3>
                 {error && <p>{error}</p>}
                {(!user || !documents) && <h4>Play a game and save your score to see results here</h4>}
                {documents && documents.map(doc => (
                        <div className="score-list" key={doc.id}> 
                        <div>{doc.createdAt.toDate().toLocaleDateString()} -</div>
                        <div>{doc.createdAt.toDate().toLocaleTimeString()} -</div>
                        <div>Game number: {doc.gameNum} -</div>
                        <div>Score was: {doc.lastScore}</div>
                        </div>
                    ))}
            </div>
       
    </div>
  )
}