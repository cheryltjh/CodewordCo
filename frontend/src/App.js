import "./App.css";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Contact from "./components/Contact";
import Signup from "./pages/Signup";
import ProductList from "./pages/ProductList";
import ProductItem from "./pages/ProductItem";
import ProductUpdate from "./pages/ProductUpdate";
import ProductCreate from "./pages/ProductCreate";
import EnrollmentForm from "./pages/EnrollmentForm";
import SuccessPage from "./pages/SuccessPage";
import EnrollmentUpdate from "./pages/EnrollmentUpdate";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const [auth, setAuth] = useState("NoAuth");
  const [role, setRole] = useState("Guest");
  const [userName, setUsername] = useState("");
  // const history = useHistory();
  // handle function for logging out, passed as props to navbar
  const handleLogOut = async (event) => {
    await axios.delete(`/api/login`);
    setAuth("NoAuth");
    setRole("Guest");
    setUsername("");
    // history.push(`/`);
  };

  return (
    <div className="App">
      <Router>
        <NavBar
          role={role}
          auth={auth}
          handleLogOut={handleLogOut}
          userName={userName}
        />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products/edit/:id">
            <ProductUpdate role={role} auth={auth} />
          </Route>
          <Route path="/enrolls/edit/:id">
            <EnrollmentUpdate role={role} auth={auth} />
          </Route>
          <Route path="/products/new">
            <ProductCreate role={role} auth={auth} />
          </Route>
          <Route path="/products/:id">
            <ProductItem />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/products">
            <ProductList role={role} />
          </Route>
          <Route path="/enroll">
            <EnrollmentForm auth={auth} />
          </Route>
          <Route path="/success">
            <SuccessPage />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/dashboard">
            <Dashboard role={role} auth={auth}/>
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login
              setAuth={setAuth}
              setRole={setRole}
              setUsername={setUsername}
            />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
