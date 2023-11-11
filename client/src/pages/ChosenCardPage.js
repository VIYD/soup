import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function Card() {
    let { id } = useParams();
    const [cardObject, setCardObject] = useState([]); //useState({})
    //const [listOfCards, setListOfCards] = useState([]);

    useState (() => { //useEffect
        axios.get(`http://localhost:3001/cards/byID/${id}`).then((response) => {
            setCardObject(response.data);
        });
    });

    return (
        <div className="cardPage">        
            <div className="cardChosen">
                <div className="titleChosen">{cardObject.title}</div>
                <div className="descriptionChosen">{cardObject.description}</div>
                <div className="usernameChosen">Created by {cardObject.username}</div>
            </div>
        </div>
    )
};

export default Card;