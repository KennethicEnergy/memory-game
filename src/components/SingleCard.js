import "./SingleCard.css"

export default function SingleCard({ card, missingNo, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front"/>
        <img 
          className="back" 
          src={missingNo}
          onClick={handleClick}
          alt="card back" />
      </div>
    </div>
  )
}