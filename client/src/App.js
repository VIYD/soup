import './App.css';
//import axios from "axios"; //like fetch-api
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Home from './pages/Home';
import CreateCard from './pages/CreateCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Link to='/createcard'>+</Link>
      <Link to='/'>-</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createcard" element={<CreateCard />} />
        </Routes>
      </BrowserRouter>
    </div>    
    );
}

export default App;
