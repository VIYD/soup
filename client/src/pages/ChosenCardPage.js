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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/cards/byID/${id}`
        );
        setCardObject(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          navigate("/CardNotFound");
        } else {
          navigate("/PageNotFound");
          console.error("Error getting card:", error);
        }
      }
    };

    fetchData();
  }, [id, navigate]);

  const deleteCard = (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      axios
      .delete(`http://localhost:3001/cards/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => navigate("/"));
    }
  };

  const editCard = (option) => {
    if (option === "title") {
      let newTitle = prompt("New title should be:");
      if (newTitle === null) {
        alert("Card was not changed");
        return
      }
      axios.put(
        "http://localhost:3001/cards/title",
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setCardObject({...cardObject, title: newTitle})
    } else {
      let newDescription = prompt("New description should be:");
      if (newDescription === null) {
        alert("Card was not changed");
        return
      }
      axios.put(
        "http://localhost:3001/cards/description",
        {
          newDescription: newDescription,
          id: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setCardObject({...cardObject, description: newDescription})
    }
  };

  return (
    <div className="cardPage">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="cardChosen">
          <div
            className="titleChosen"
            onClick={() => {
              if (authState.username === cardObject.username) {
                editCard("title");
              }
            }}
          >
            {cardObject.title}
          </div>
          <textarea
            className="descriptionChosen"
            readOnly
            value={cardObject.description}
            onClick={() => {
              if (authState.username === cardObject.username) {
                editCard("description");
              }
            }}
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
