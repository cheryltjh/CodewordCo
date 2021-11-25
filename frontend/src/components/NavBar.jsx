import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  height: 10vh;
  overflow: hidden;
  flex-wrap: wrap;
  border-bottom: 1px solid #ddd;
`;

const Li = styled.li`
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5px 26px;
  font-size: 16px;
  border-radius: 24px;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: #0D1B2A;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const Button = styled.button`
  padding: 10px;
  margin: 6px 25px;
  border: none;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #778DA9;
  @media only screen and (max-width: 600px) {
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
  `;

function NavBar({ role, auth, handleLogOut, userName }) {
  return (
    <>
      <Navbar>
        <LinkStyled to="/" className="home">
          <Li>Home</Li>
        </LinkStyled>
        <LinkStyled to="/products" className="products">
          <Li>Classes & Fees</Li>
        </LinkStyled>
        <LinkStyled to="/about" className="about">
          <Li>About Us</Li>
        </LinkStyled>
        {role === "Admin" ? (
          <LinkStyled to="/dashboard" className="dashboard">
            <Li>Admin Dashboard</Li>
          </LinkStyled>
        ) : (
          <></>
        )}
        {auth === "NoAuth" ? (
          <>
            <LinkStyled to="/signup" className="signup">
              <Li>Signup</Li>
            </LinkStyled>
            <LinkStyled to="/login" className="login">
              <Button primary>Login</Button>
            </LinkStyled>
          </>
        ) : (
          <>
            <p>Welcome, {userName}!</p>
            <LinkStyled to="/" className="logout">
              <Button primary onClick={handleLogOut}>
                Logout
              </Button>
            </LinkStyled>
          </>
        )}
      </Navbar>
    </>
  );
}

export default NavBar;