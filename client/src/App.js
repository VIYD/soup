import './App.css';
import axios from "axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import Home from './pages/HomePage';
import CreateCard from './pages/CreateCardPage';
import Card from './pages/ChosenCardPage';
import Registration from './pages/RegistrationPage';
import Login from './pages/LoginPage';
import { AuthContext } from './helpers/AuthContext';

import "@fontsource/jetbrains-mono";

function App() {
  let [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/auth/checkAuth', {
      headers: {
        accessToken: localStorage.getItem('accessToken'),
      },
    })
    .then((response) => {
        if (response.data.error) {
          setAuthState(false)
        } else {
          setAuthState(true)
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className='site-header'>
            <p>SOUP</p>
            <Link to='/'>Home</Link>
            <Link to='/createCard'>Create Card</Link>
            {!authState && (
              <>
              <Link to='/login'>Login</Link>
              <Link to='/registration'>Registration</Link>
              </>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createcard" element={<CreateCard />} />
            <Route path="/card/:id" element={<Card />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
