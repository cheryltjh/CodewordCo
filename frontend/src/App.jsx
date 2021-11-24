import './App.css'
import Home from './screens/Home';
import NavBar from './screens/NavBar';
import About from './screens/About';
import Contact from './screens/Contact';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {


  return (
    <div className="App">
        <BrowserRouter>
          <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;