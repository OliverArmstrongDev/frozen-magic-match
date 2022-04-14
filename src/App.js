

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import GameLogic from './GameLogic';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import ScoreBoardSingle from './components/ScoreBoardSingle';
import ThemeSelector from './components/ThemeSelector';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { useAuthContext } from './hooks/useAuthContext';
import ScoreBoardList from './components/ScoreBoardList';


function App() {
  const {user, authIsReady} = useAuthContext();

  return (
    <>
    {authIsReady && (
    <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path={'/'}>
          <Header/>
          <ThemeSelector/>
          <ScoreBoardSingle/>     
            <GameLogic/> 
            <ScoreBoardList />
          </Route>
          <Route path={'/signup'}>
          {user && <Redirect to='/' />}
            <Signup/> 
          </Route>
          <Route path={'/login'}>
            {user && <Redirect to='/' />}
            <Login/> 
          </Route>
        </Switch>
    </BrowserRouter>
    )}
    </>
   
  );
}

export default App



