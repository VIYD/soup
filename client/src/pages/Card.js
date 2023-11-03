import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

function Card() {
    let { id } = useParams();
    const [cardObject, setCardObject] = useState({});

    useEffect (() => {
        axios.get(`http://localhost:3001/cards/byID/${id}`).then((response) => {
            setCardObject(response.data);
        });
    });

    return (
        <div className="cardPage">
            <div className="title">{cardObject.title}</div>
            <div className="description">{cardObject.description}</div>
        </div>
    )
}

export default Card;