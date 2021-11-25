import './App.css'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import About from './pages/About';
import Contact from './pages/Contact';
import Signup from './pages/Signup';
import CartScreen from './pages/Cart';
import Login from './pages/Login';
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
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;