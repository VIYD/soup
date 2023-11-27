import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      {listOfCards.length === 0 ? (
        <div>
          <p>Workspace is empty</p>
          <Link to="/createCard">Maybe try creating a card?</Link>
        </div>
      ) : (
        listOfCards.map((value, key) => (
          <div
            className="cardHome"
            title={`Created by ${value.username}`}
            onClick={() => {
              navigate(`/card/${value.id}`);
            }}
            key={key}
          >
            <div className="titleHome"> {value.title} </div>
            <textarea
              className="descriptionHome"
              readOnly
              value={value.description}
            ></textarea>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
