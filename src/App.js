import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from './Pages/Home';
import Create from './Pages/Create';
import Update from './Pages/Update';
import Navbar from './Components/Navbar/Navbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Create />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
