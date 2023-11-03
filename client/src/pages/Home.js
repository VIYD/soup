import React from 'react'
import axios from 'axios';
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

function Home() {

    const [listOfCards, setListOfCards] = useState([]);
    let navigate = useNavigate();

    useState(() =>  { //useEffect
        axios.get("http://localhost:3001/cards").then((response) => {
            setListOfCards(response.data);
        });
    }, []);

    return ( 
        <div>
        {listOfCards.map((value, key) => {
            return <div className='cardHome' onClick={() => {navigate(`/card/${value.id}`)}}> 
                <div className='titleHome'> {value.title} </div>
                <div className='descriptionHome'> {value.description} </div>
            </div>
    })} 
        </div>
    )
}

export default Home