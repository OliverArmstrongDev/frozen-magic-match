import { useState, useEffect} from 'react';
import './App.css';


import SingleCard from './components/SingleCard';
//  import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme';


const cardImages = [
  {"src": "./img/anna.png", matched: false},
  {"src": "./img/elsa.png", matched: false},
  {"src": "./img/elsa-anna.png", matched: false},
  {"src": "./img/anna-elsa-olaf.png", matched: false},
  {"src": "./img/sven.png", matched: false},
  {"src": "./img/frozen-all.png", matched: false}
  
]

// const cardImages = [
//   {"src": "./img/anna.png", matched: false},
//   {"src": "./img/elsa.png", matched: false},
//   {"src": "./img/elsa-anna.png", matched: false},
//   {"src": "./img/anna-elsa-olaf.png", matched: false},
//   {"src": "./img/sven.png", matched: false},
//   {"src": "./img/frozen-all.png", matched: false},
//   {"src": "./img/anna-olaf.png", matched: false},
//   {"src": "./img/kristof.png", matched: false},
//   {"src": "./img/elsa2.png", matched: false},
//   {"src": "./img/olaf2.png", matched: false}
// ]
// const cardImages = [
//   {"src": "/img/helmet-1.png", matched: false},
//   {"src": "/img/potion-1.png", matched: false},
//   {"src": "/img/ring-1.png", matched: false},
//   {"src": "/img/scroll-1.png", matched: false},
//   {"src": "/img/shield-1.png", matched: false},
//   {"src": "/img/sword-1.png", matched: false}
// ]

function App() {
const [cards, setCards] = useState([]);
const [turns, setTurns] = useState(0);
const [choiceOne, setChoiceOne] = useState(null)
const [choiceTwo, setChoiceTwo] = useState(null)
const [disabled, setDisabled] = useState(false)

//logo
const logoImg = './img/logo.png';

//get global state
const {color, updateScore, passFunction} = useTheme();

useEffect(() => { 
  document.body.style.backgroundColor = color;
}, [color]) 

useEffect(() => {
  
  if(choiceOne && choiceTwo){
      setDisabled(true);
    if( choiceOne.src === choiceTwo.src){
       setCards(prevCards  => {
         return prevCards.map(card => {
           if(card.src === choiceOne.src) {
             return {...card, matched: true}
           }else{
             return card;
           }
         })
       })
       setTimeout(() => resetTurn(), 1000);
      } else { 
        
        setTimeout(() => resetTurn(), 1000);
      }
  } 

},[choiceOne, choiceTwo, turns])




  //shuffle cards
const shuffleCards = () => {
  updateScore(turns);

  const shuffledCards = [...cardImages, ...cardImages]
  .sort(() => Math.random() - 0.5)
  .map((card) => ({...card, id: Math.random() }));

  setChoiceOne(null)
  setChoiceTwo(null)
  setCards(shuffledCards);
  setTurns(0);

}

//handle a choice
const handleChoice = (card) => {
choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
}

const resetTurn = () => {

  setChoiceOne(null)
  setChoiceTwo(null)
  setTurns(prevTurns => prevTurns +1 )
  setDisabled(false);
}
useEffect(() => {
shuffleCards();
},[])

// useEffect(() => {
//   score ? console.log('yes', score,turns): console.log('no', score);
// },[score,turns])

  return (
    <>
    <div  className="App main-div" style={{background: color}}>
    
     
     {/* <div className='logo-div'>
      <img className='logo' src={logoImg} alt="frozen logo" />
      <h2 className='font-face-ik magic'>Magic Match!</h2>
      <div>
        <button className='font-face-ik btn' onClick={shuffleCards} >New Game</button> 
      </div>
     </div> */}
      <div className="card-grid">
        {cards.map(card => (
        <SingleCard 
        handleChoice={handleChoice} 
        key={card.id} 
        card={card}
        flipped={card === choiceOne || card === choiceTwo || card.matched}
        disabled={disabled}
        />
        ))}
        </div>
        <p className='font-face-ik '>Turns: {turns}</p>
    </div>
     </>
  );
}

export default App;
