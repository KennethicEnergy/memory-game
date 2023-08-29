import { useEffect, useState } from 'react';
import './App.css'
import SingleCard from './components/SingleCard';
// import Modal from './components/Modal';

const pokemonUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;

const cardImages = [
  {src: `${pokemonUrl}/${1}.png`, matched: false},
  {src: `${pokemonUrl}/${2}.png`, matched: false},
  {src: `${pokemonUrl}/${3}.png`, matched: false},
  {src: `${pokemonUrl}/${4}.png`, matched: false},
  {src: `${pokemonUrl}/${5}.png`, matched: false},
  {src: `${pokemonUrl}/${6}.png`, matched: false},
  {src: `${pokemonUrl}/${7}.png`, matched: false},
  {src: `${pokemonUrl}/${8}.png`, matched: false},
  {src: `${pokemonUrl}/${9}.png`, matched: false},
  {src: `${pokemonUrl}/${10}.png`, matched: false},
  {src: `${pokemonUrl}/${11}.png`, matched: false},
  {src: `${pokemonUrl}/${12}.png`, matched: false},
]

const missingNo = `${pokemonUrl}/${0}.png`;

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [gameLevel, setGameLevel] = useState(1);
  // const [isModalOpen, setModalOpen] = useState(false);
 
  const setChoicesToNull = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  }

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoicesToNull();
    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  const incrementGameLevel = () => {
    setGameLevel(gameLevel + 1);
  };

  const resetTurn = () => {
    setChoicesToNull();
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  const pushNewItemInArray = () => {
    const newObjectToBePushed = {
      src: `${pokemonUrl}/${cardImages.length + 1}.png`,
      matched: false
    };
    cardImages.push(newObjectToBePushed)
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        },1000);
      }
    }
    
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const allMatched = cards.every(card => card.matched);
    if (cards.length > 0 && allMatched) {
      pushNewItemInArray()
      console.log(`great!, starting level ${gameLevel + 1} in 2 seconds`)
      setTimeout(() => {
        shuffleCards()
        incrementGameLevel()
      }, 2000)
    } else {
      // game over
    }
  }, [cards, gameLevel]);

  // start the game onload
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Memory Game - Level : {gameLevel}</h1>
      <div 
        className='card-grid' 
        // style={{gridTemplateColumns: gameLevel >= 2 ? '1fr 1fr 1fr 1fr' : ''}}
        >
        {cards.map(card => (
          <SingleCard 
            key={card.id}
            card={card} 
            missingNo={missingNo} 
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
          ))}
      </div>
      <p>Turns: {turns}</p>
      {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </Modal> */}
    </div>
  );
}

export default App;