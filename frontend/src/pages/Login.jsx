import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-contents: center;
  align-items: center;
`;

export const LoginInfo = styled.div`
  display: flex;
  justify-contents: center;
  align-items: center;
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
  margin: 4px 5px;
  padding: 4px;
`;

export const Input = styled.input`
  padding: 2px;
  margin: 5px;
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
  &:hover {
    background-color: rgb(228, 228, 228);
  }
  &:active {
    background-color: grey};
  }
`;

function Login({ setAuth, setRole, setUsername }) {
  const [login, setLogin] = useState({});
  const history = useHistory();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, username: value });
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setLogin({ ...login, password: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post(`/api/login`, login)
      .then((res) => {
        if (res.data.success === true) {
          setAuth("Auth");
          setUsername(res.data.username);
          if (res.data.role === "Admin") {
            setRole("Admin");
          }
          history.push(`/`);
        }
      })
      .catch((err) => {
        console.log("err", err);
        alert(
          `Sorry, login failed! If you do not have an account, please sign up for one.`
        );
      });
  };

  return (
    <>
      <h1>Login to your account</h1>
      <Form>
        <LoginInfo>
          <LabelContainer>
            <Label>Username:</Label>
            <Label>Password:</Label>
          </LabelContainer>
          <InputContainer>
            <Input
              type="text"
              name="username"
              placeholder="username"
              value={login.username}
              onChange={handleUsernameChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              value={login.password}
              onChange={handlePasswordChange}
              minlength="6"
            />
          </InputContainer>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </LoginInfo>
      </Form>
    </>
  );
}

export default Login;
