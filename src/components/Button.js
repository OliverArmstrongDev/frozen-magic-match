import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { MainContext } from "../contexts/GeneralContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFirestore } from "../hooks/useFirestore";
import CheckBox from "./CheckBox";

export default function Button() {
  const { state, actions, dispatch } = useContext(MainContext);
  const history = useHistory();
  const { user } = useAuthContext();
  const { addDocument } = useFirestore("GameResults");
  //const [saveToDB, setSaveToDB] = useState(false);

  useEffect(() => {
    if (state.saveToDB) {
      if (user) {
        addDocument({
          uid: user.uid,
          name: user.displayName,
          gameNum: state.gameNumber - 1,
          lastScore: state.lastScore,
        });
        dispatch({ type: actions.SAVE2_DB, payload: false });
      } else {
        history.push(`/signup`);
      }
    }

    //state.currentScore, state.lastScore, state.gameNumber,actions.SAVE2_DB, state.saveToDB
  }, [
    state.currentScore,
    state.lastScore,
    state.gameNumber,
    actions.SAVE2_DB,
    state.saveToDB,
  ]);

  const handleResetClick = () => {
    dispatch({ type: actions.UPDATE_GAME, payload: (state.gameNumber = 1) });
    shuffleCards();
  };

  const handleSave = () => {
    if (state.isChecked) {
      if (state.cards.every((card) => card.matched === true)) {
        dispatch({ type: actions.UPDATE_GAME, payload: state.gameNumber + 1 });
        dispatch({ type: actions.CURRENT_SCORE, payload: state.turns });
        dispatch({ type: actions.LAST_SCORE, payload: state.turns });

        //if user exists save to DB
        dispatch({ type: actions.SAVE2_DB, payload: true });
        shuffleCards();
      } else {
        alert("Match ALL cards to save your score!");
      }
    } else {
      alert("Game is ready!");
    }
  };

  const getButton = () => {
    //IS or NOT user and saved IS checked
    if ((!user || user) && state.isChecked) {
      return (
        <button className="font-face-ik btn" onClick={handleSave}>
          Save & New Game
        </button>
      );
    }
    //NO user or IS user and saved is NOT checked
    if ((!user || user) && !state.isChecked) {
      if (state.turns > 0) {
        return (
          <button className="font-face-ik btn" onClick={handleResetClick}>
            Start Again
          </button>
        );
      } else {
        return (
          <button className="font-face-ik btn" onClick={handleSave}>
            New Game
          </button>
        );
      }
    }
  };

  const { shuffleCards } = useContext(MainContext);
  return (
    <div>
      {getButton()}
      <CheckBox label={"Save Scores?"} />
    </div>
  );
}
