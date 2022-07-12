import React, { useState, useEffect } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useContext } from "react";
import { MainContext } from "../../contexts/GeneralContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
//styles
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const { state, dispatch, actions } = useContext(MainContext);
  const { user } = useAuthContext();
  const { addDocument, updateColorDocument, response } =
    useFirestore("GameResults");

  useEffect(() => {
    if (state.saveToDB) {
      if (user) {
        console.log("save in UseEffect", user);

        if (user.lastScore > 0) {
          addDocument({
            uid: user.uid,
            name: user.displayName,
            gameNum: state.gameNumber - 1,
            lastScore: state.lastScore,
          });
          dispatch({ type: actions.SAVE2_DB, payload: false });
        }
      }
    }
  }, [user, state.saveToDB]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
    dispatch({ type: actions.SAVE2_DB, payload: true });
  };

  return (
    <form onSubmit={handleSubmit} className={"signup-form"}>
      <h2>Signup</h2>
      <label>
        <span>Display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      {!isPending && <button className="btn">Signup</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
