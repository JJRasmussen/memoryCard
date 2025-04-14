import { useState, useEffect } from 'react';
//import axios from 'axios'

import Card from "./components/Card"


import './App.css'
import backupPlantList from './backupPlantList.js'

function App() {
  const [plantList, setPlantList] = useState(null)
  useEffect(() => {
    async function fetchPlantList(){
      try{
        //uncomment to access the perenual database
        //const response = await axios.get(`https://perenual.com/api/v2/species-list?key=sk-36Yw67f91e936cf971`);
        //setPlantList(response.data)
        setPlantList(backupPlantList.data)
        
      } catch (error){
        //if there are no more free uses of the API a backup list is used.
        setPlantList(backupPlantList.data)
        console.log("Error fetching plant data", error)
      }
    };
    fetchPlantList()
  },[]);


  let validPlants = []
  if(plantList != null){
    validPlants = plantList.filter((plant) => 
      (plant.id != null || 
        plant.common_name != null ||
        plant.default_image != null ||
        plant.default_image.small_url
      )
    )
    //if validPlants is too long
    if (validPlants.length > 25){
      validPlants.splice(20, (validPlants.length - 20))
    }
    //if validPlants is too short use plants from backup plant list
    for (let i = 0; validPlants.length < 20 ; i++){
      validPlants.push(
        backupPlantList.data[i]
      )
    }
  }

  let cards = []
  if(plantList != null){
    validPlants.map((plant) => {
      cards.push(
        <Card 
            id={plant.id} 
            cardName={plant.common_name}
            imageUrl={plant.default_image.small_url}
        />
    )})
  }
  
  return (
    <section className="cardContainer">
      {cards}
    </section>
    

  )
}

export default App

