import './App.css';
import axios from "axios"; //like fetch-api
import {useEffect, useState} from "react";

function App() {

  const [listOfCards, setListOfCards] = useState([]);

  useEffect(() =>  {
    axios.get("http://localhost:3001/cards").then((response) => {
      setListOfCards(response.data);
    });
  }, []);


  return (<div className="App"> 
    {listOfCards.map((value, key) => {
      return <div className='card'> 
        <div className='title'> {value.title} </div>
        <div className='description'> {value.description} </div>
      </div>
    })} 
    </div>    
    );
}

export default App;
