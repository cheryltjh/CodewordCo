import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import styled from "styled-components"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.label`
  margin: 7px 5px 8px 5px;
`;

export const ProductInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

export const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 2.5px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin: 5px;
  padding: 2px;
  border: 1px solid black;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  @media only screen and (max-width: 600px) {
    border: 1px solid black;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  }
`;

export const Select = styled.select`
  margin: 5px;
  padding: 2px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 7px 5px;
  border: none;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 16px;
  background-color: #778da9;
  @media only screen and (max-width: 600px) {
    border: none;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position: relative;
  }
`;


export default function EnrollmentForm({ auth }) {
  let history = useHistory();
  const inputName = useRef();
  const inputPhone = useRef();
  const inputEmail = useRef();
  const inputDateOfBirth = useRef();
  const inputProduct = useRef();
  const [products, setProducts] = useState([]);

  // useeffect to get the products data on render for selection
  useEffect(() => {
    async function getProductsData() {
      await axios.get(`/api/products/`).then((product) => {
        setProducts(product.data.data);
      });
    }
    getProductsData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (auth === "Auth") {
      // get the product information from the form
      let name = inputName.current.value;
      let phone = inputPhone.current.value;
      let email = inputEmail.current.value;
      let dateOfBirth = inputDateOfBirth.current.value;
      let product = inputProduct.current.value;
      const enrollInformation = {
        name,
        phone,
        email,
        dateOfBirth,
        product
      };
      console.log([enrollInformation]);
      await axios.post(`/api/enroll/`, enrollInformation).then((res) => {
        // window.alert(`Enrolled successfully!`);
        history.push(`/successpage`);
      });
    } else {
      window.alert(`Sorry, you can only enroll when you're logged in!`);
      history.push(`/login`);
    }
  };

  // for redirecting back
  const handleCancel = () => {
    history.push(`/`);
  };

  return (
    <>
      <h1>Enrollment Form. <br/>Please fill in your details below:</h1>
      <Form onSubmit={handleSubmit}>
        <ProductInfo>
          <LabelContainer>
            <Label>Name:</Label>
            <Label>Phone:</Label>
            <Label>Email:</Label>
            <Label>Date of Birth:</Label>
            <Label>Programme:</Label>
          </LabelContainer>
          <InputContainer>
            <Input type="text" ref={inputName} minLength="2" required />
            <Input type="text" ref={inputPhone} minLength="1" required />
            <Input type="text" ref={inputEmail} minLength="5" />
            <Input type="date" ref={inputDateOfBirth} minLength="2" required />
            <Select ref={inputProduct}>
              {products.map((element) => {
                return (
                  <option value={element.name}>{element.name}</option>
                )}
                )}
            </Select>
          </InputContainer>
          <Button>Enroll me!</Button>
        <Button onClick={handleCancel}>Cancel</Button>
        </ProductInfo>
      </Form>
    </>
  );
}
