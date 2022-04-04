import React, { createContext, useState} from 'react'

export const MainContext = createContext();

export default function GeneralContext({children}) {

    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [color, setColor] = useState('#00d1f6')

    //images
    const cardImages = [
        {"src": "./img/anna.png", matched: false},
        {"src": "./img/elsa.png", matched: false},
        {"src": "./img/elsa-anna.png", matched: false},
        {"src": "./img/anna-elsa-olaf.png", matched: false},
        {"src": "./img/sven.png", matched: false},
        {"src": "./img/frozen-all.png", matched: false}
      ]
      
      //logo
    const logoImg = './img/logo.png';
   
    
      //functions
    const shuffleCards = () => {

        setScore(turns);
      
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() }));
      
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards);
        setTurns(0);
      }


  return (
    <MainContext.Provider value={{
        score, setScore,
        cards, setCards,
        turns, setTurns,
        choiceOne, setChoiceOne,
        choiceTwo, setChoiceTwo,
        disabled, setDisabled,
        cardImages,
        logoImg,
        color, setColor,
        shuffleCards
        }}>
        {children}
    </MainContext.Provider>
  )
}
