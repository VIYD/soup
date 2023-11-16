import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

function Card() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [cardObject, setCardObject] = useState([]);

  let [authState, setAuthState] = useState({
    username: "",
    id: 0,
    isLogged: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/checkAuth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, isLogged: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            isLogged: true,
          });
        }
      });
  }, []);

  useState(() => {
    axios.get(`http://localhost:3001/cards/byID/${id}`).then((response) => {
      setCardObject(response.data);
    });
  });

  const deleteCard = (id) => {
    axios
      .delete(`http://localhost:3001/cards/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => navigate("/"));
  };

  return (
    <div className="cardPage">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="cardChosen">
          <div className="titleChosen">{cardObject.title}</div>
          <textarea
            className="descriptionChosen"
            readOnly
            value={cardObject.description}
          ></textarea>
          <div className="usernameChosen">Created by {cardObject.username}</div>
        </div>
        {authState.username === cardObject.username && (
          <button
            className="deleteButton"
            onClick={() => deleteCard(cardObject.id)}
          >
            Delete
          </button>
        )}
      </AuthContext.Provider>
    </div>
  );
}

export default Card;
