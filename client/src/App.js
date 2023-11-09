import './App.css';
//import axios from "axios"; //like fetch-api
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";

import Home from './pages/HomePage';
import CreateCard from './pages/CreateCardPage';
import Card from './pages/ChosenCardPage';
import Registration from './pages/RegistrationPage';
import Login from './pages/LoginPage';

import "@fontsource/jetbrains-mono";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='site-header'>
        <p>SOUP</p>
        <Link to='/'>Home</Link>
        <Link to='/createCard'>Create Card</Link>
        <Link to='/login'>Login</Link>
        <Link to='/registration'>Registration</Link>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createcard" element={<CreateCard />} />
          <Route path="/card/:id" element={<Card />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>    
    );
}

export default App;
