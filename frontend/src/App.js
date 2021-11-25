import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./pages/Signup";
import ProductList from "./pages/ProductList";
import ProductItem from "./pages/ProductItem";
import EnrollmentForm from "./pages/EnrollmentForm";
import SuccessPage from "./pages/SuccessPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductItem />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/enroll" element={<EnrollmentForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
