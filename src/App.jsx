import { useState, useEffect } from 'react';
import axios from 'axios'

import Card from "./components/Card"


import './App.css'
import backupPlantList from './backupPlantList.js'

function App() {
  const [plantList, setPlantList] = useState(null)
  const [pickedCards, setPickedCards] = useState([])
  const [gameState, setGameState] = useState({
    isGameOver: false,
    isGameWon: false,
  })

  //Get plants from Perenual 
  useEffect(() => {
    const randomPage = Math.floor(Math.random()*75)
    async function fetchPlantList(){
      try{
        //uncomment to access the perenual database
        const response = await axios.get(`https://perenual.com/api/v2/species-list?key=sk-36Yw67f91e93650cf9731&page=${randomPage}`);
        setPlantList(response.data.data)
        //setPlantList(backupPlantList.data)
        
      } catch (error){
        //if there are no more free uses of the API a backup list is used.
        setPlantList(backupPlantList.data)
        console.log("Error fetching plant data", error)
      }
    };
    fetchPlantList()
  },[]);
  const numberOfCards = 20
  //Sanitize input and ensure 20 valid plants 
  let validPlants = []
  if(plantList != null){
    validPlants = plantList.filter((plant) => 
      (plant.id != null && 
        plant.common_name != null &&
        plant.default_image != null &&
        plant.default_image.small_url != null
      )
    )
    //if validPlants is too long
    if (validPlants.length > numberOfCards){
      validPlants.splice(numberOfCards, (validPlants.length - numberOfCards))
    }
    //if validPlants is too short use plants from backup plant list
    for (let i = 0; validPlants.length < numberOfCards ; i++){
      validPlants.push(
        backupPlantList.data[i]
      )
    }
  }
  //
  function cardPressed(id){
    if(gameState.isGameOver){
      return
    }
    if (pickedCards.includes(id) || pickedCards.length === plantList.length){
      gameOver()
    } else {
      setPickedCards(prevPicked => ([...prevPicked, id]))
    }
    randomizeCards()
  }
  //Create a Card component for each plant
  let cards = []
  if(plantList != null){
    validPlants.map((plant) => {
      cards.push(
        <Card 
            key={plant.id} 
            id={plant.id} 
            cardName={plant.common_name}
            imageUrl={plant.default_image.small_url}
            handleClick={() => cardPressed(plant.id)}
        />
    )})
  }
  function gameOver(){
    if(pickedCards.length === plantList.length){
      setGameState({
        isGameOver: true,
        isGameWon: true,
      }) 
    } else {
      setGameState({
        isGameOver: true,
        isGameWon: false,
      })
    }
    console.log("isGameWon is: " + isGameWon)
  }
  function newGame(){
    setPickedCards([])
    setGameState({
      isGameOver: false,
      isGameWon: false,
    })
  }

  //Fisher-Yates shuffle
  function shuffleArray(array){
    let temp
    for (let i = array.length - 1; i > 0; i--){
      let random = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[random]
      array[random] = temp
    }
    return array
  }
  
  function randomizeCards(){
    setPlantList(prevPlantList => (
      shuffleArray(prevPlantList))
    )
  }

  function renderGameStatus() {
    if(gameState.isGameWon){
      return(
        <>
          <h2>Congratulations, You win!</h2>
          <p>You got {pickedCards.length} points!</p>
          <button onClick={newGame}>Press here to play again</button>
        </>
      )
    }
    if (gameState.isGameOver){
      return(
        <>
          <h2>Game over</h2>
          <p>You got {pickedCards.length} points!</p>
          <button onClick={newGame}>Press here to play again</button>
        </>
      )
    }
    if(pickedCards.length === 0){
      return(
        <>
          <h2>Pick your first card</h2>
        </>
      )
    } else {
      return(
        <>
          <h2>You have {pickedCards.length} points</h2>
        </>
      )
  }
  }

  return (
    <main>
      <header>
        <h1>Memory game</h1>
        <div>
          <p>
            Each time you press a new card you gain a point. 
            After a card is pressed the placement will be shuffled.
            If you press a card that had already been pressed the game is over.
          </p>
          {renderGameStatus()}
        </div>
      </header>
      <section className="cardContainer">
        {plantList != null && cards}
      </section>
    </main>
  )
}

export default App

