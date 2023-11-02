import React from 'react'
import axios from 'axios';
import {useEffect, useState} from "react";

function Home() {

    const [listOfCards, setListOfCards] = useState([]);

    useEffect(() =>  {
        axios.get("http://localhost:3001/cards").then((response) => {
        setListOfCards(response.data);
    });
    }, []);

    return ( 
        <div>
        {listOfCards.map((value, key) => {
            return <div className='card'> 
                <div className='title'> {value.title} </div>
                <div className='description'> {value.description} </div>
            </div>
    })} 
        </div>
    )
}

export default Home