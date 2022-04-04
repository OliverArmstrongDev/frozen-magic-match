import { useContext} from 'react';
import './App.css';
import { MainContext } from './contexts/GeneralContext';

import GameLogic from './GameLogic';





function App() {
  const {state} = useContext(MainContext);
  return (
    <>
      <GameLogic/> 
    </>
  )
}

export default App
