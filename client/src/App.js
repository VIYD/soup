import './App.css';
//import axios from "axios"; //like fetch-api
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import CreateCard from './pages/CreateCard';
import Card from './pages/Card';
import "@fontsource/jetbrains-mono";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='site-header'>
        <p>SOUP</p>
        <Link to='/createcard'>Create Card</Link>
        <Link to='/'>Home</Link>
      </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createcard" element={<CreateCard />} />
          <Route path="/card/:id" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </div>    
    );
}

export default App;
