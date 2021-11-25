import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  margin: 6px 2px;
  border: none;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #778da9;
  @media only screen and (max-width: 600px) {
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
`;

export default function SuccessPage() {
  return (
    <div>
      <h1>Enrollment success!</h1>
      Thanks for enrolling with us. <br />
      A staff will be in contact with you shortly about the enrollment details.
      <br />
      <Link to="/" className="home">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
