import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 8px 5px 0px 0px;
  padding: 4px;
`;

export const Input = styled.input`
padding: 2px 2px;
margin: 5px 5px;
border: 1px solid black;
box-sizing: border-box;
cursor: pointer;
font-size: 16px;
@media only screen and (max-width: 600px) {
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  position: relative;
}
`;

export const PasswordDescription = styled.p`
  font-size: 10px;
  margin: -2px 5px 0px 11px;
`;

export const PasswordLabel = styled.label`
  margin: 11px 5px 0px 0px;
  padding: 4px;
`;

export const PasswordInput = styled.input`
  padding: 3px 2px;
  margin: 7px 5px;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  }
`;

export const ConfirmPasswordInput = styled.input`
  padding: 3px 2px;
  margin: 10px 5px -3px 5px;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  }
`;

export const Button = styled.button`
  padding: 10px;
  margin: 6px 2px;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #778da9;
  color: white;
  @media only screen and (max-width: 600px) {
    border: none;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
`;

const addUser = async (user) => {
  console.log("user", user);
  await axios.post(`/api/users`, user);
};

function UserCreate() {
  const [user, setUser] = useState({});
  const history = useHistory();
  const inputConfirmPassword = useRef();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, email: value });
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setUser({ ...user, password: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const password = inputConfirmPassword.current.value;
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
    } else if (password !== user.password) {
      alert("Passwords do not match!");
    } else {
      addUser(user);
      alert(`New user ${user.username} created successfully!`);
      history.push("/login");
    }
  };

  return (
    <>
      <h1>Register an account</h1>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <LabelContainer>
            <Label>Email:</Label>
            <Label>Username:</Label>
            <PasswordLabel>Password:</PasswordLabel>
            <PasswordDescription>(min. 6 chars)</PasswordDescription>
            <PasswordLabel>Confirm Password:</PasswordLabel>
          </LabelContainer>
          <InputContainer>
            <Input
              type="email"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={handleEmailChange}
              required
            ></Input>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={user.username}
              onChange={handleUsernameChange}
              required
            ></Input>
            <PasswordInput
              type="password"
              name="password"
              placeholder="password"
              value={user.password}
              onChange={handlePasswordChange}
              required
            ></PasswordInput>
            <ConfirmPasswordInput
              type="password"
              placeholder="confirm password"
              ref={inputConfirmPassword}
              minLength="2"
              required
            ></ConfirmPasswordInput>
          </InputContainer>
          <Button>Create an account</Button>
        </UserInfo>
      </Form>
    </>
  );
}

export default UserCreate;
