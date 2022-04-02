import "./SingleCard.css"

export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
       if(!disabled) {
           handleChoice(card);
        } 
    }

  return (
    <div className= "card">
        <div className={flipped ? "flipped": ""}>
            <img className= "front" src={card.src} alt="front" />
            <img 
            onClick={handleClick} 
            className= "back" 
            src="./img/cover.jpg" 
            alt="cover" />
        </div>
    </div>
  )
}
