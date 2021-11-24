import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      <NavLink to="/products">
        <button>Programmes offered</button>
      </NavLink>
      <NavLink to="/about">
        <button>About</button>
      </NavLink>
      <NavLink to="/contact">
        <button>Contact Us!</button>
      </NavLink>
    </>
  );
}
