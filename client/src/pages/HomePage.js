import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [listOfCards, setListOfCards] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/cards").then((response) => {
      setListOfCards(response.data);
    });
  }, []);

  return (
    <div>
      {listOfCards.map((value, key) => {
        //no cards - show alert?
        return (
          <div
            className="cardHome"
            title={`Created by ${value.username}`}
            onClick={() => {
              navigate(`/card/${value.id}`);
            }}
          >
            <div className="titleHome"> {value.title} </div>
            <textarea
              className="descriptionHome"
              readOnly
              value={value.description}
            ></textarea>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
