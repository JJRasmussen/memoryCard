import { useState, useEffect } from 'react';
import axios from 'axios'

import Card from "./components/Card"


import './App.css'
import backupPlantList from './backupPlantList.js'

function App() {
  const [plantList, setPlantList] = useState(null)
  const [pickedCards, setPickedCards] = useState([])
  console.log("pickedCards: ")
  console.log(pickedCards)
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
    setPickedCards(prevPicked => (
      prevPicked.includes(id) ? 
      gameOver() :
      [...prevPicked, id]
    ))
    randomizeCards()
  }

  function gameOver(){
    console.log("GAME OVER")
    console.log("You got " + pickedCards.length + " points!")

    setPickedCards([])
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

  return (
    <section className="cardContainer">
      {plantList != null && cards}
    </section>
  )
}

export default App

