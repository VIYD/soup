import "./App.css";
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";

import Home from "./pages/HomePage";
import CreateCard from "./pages/CreateCardPage";
import Card from "./pages/ChosenCardPage";
import Registration from "./pages/RegistrationPage";
import Login from "./pages/LoginPage";
import Validation from "./pages/Validation";
import PageNotFound from "./pages/PageNotFound";
import CardNotFound from "./pages/CardNotFound";

import "@fontsource/jetbrains-mono";

function App() {
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

  function logout() {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      isLogged: false,
    });
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className="site-header">
            <p style={{ marginLeft: "3vh" }}>SOUP</p>
            <Link to="/">Home</Link>
            <Link to="/createCard">Create Card</Link>
            {!authState.isLogged ? (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ) : (
              <>
                <button className="header-button" onClick={logout}>
                  Logout
                </button>
              </>
            )}

            <p className="username">{authState.username}</p>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createcard" element={<CreateCard />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="CardNotFound" element={<CardNotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
