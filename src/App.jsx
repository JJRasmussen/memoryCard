import { useState, useEffect } from 'react';
import axios from 'axios'

import Card from "./components/Card"

import './App.css'
import backupPlantList from './backupPlantList.js'

function App() {
  const [plantList, setPlantList] = useState(null)

  useEffect(() => {
    async function fetchPlantList(){
      try{
        const response = await axios.get(`https://perenual.com/api/v2/species-list?key=sk-36Yw67f91e93650cf9731`);
        setPlantList(response.data)
      } catch (error){
        //if there are no more free uses of the API a backup list is used.
        setPlantList(backupPlantList)
        console.log("Error fetching plant data", error)
      }
    };
  },[]);


  const nrOfCards = 8
  function cardArrayCreation(){
    for (let i = 0; i < nrOfCards; i++){
      cardArray.push(
        <Card cardName={i}/>
      )
    }
  }
  let cardArray = []
  cardArrayCreation()
  return (
    <>
      {cardArray}
      <h1>API Data</h1>
      <pre>{JSON.stringify(plantList, null, 2)}</pre>
    </>
    

  )
}

export default App

