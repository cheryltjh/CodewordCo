import React, { useRef } from "react";
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

export const DescriptionLabel = styled.label`
  margin: 40px 5px 43px 5px;
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
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
    position:relative;
  }
`;

export const DescriptionInput = styled.textarea`
  height: 90px;
  resize: none;
  margin: 5px;
  padding: 2px;
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

export const Select = styled.select`
  margin: 5px;
  padding: 2px;
  cursor: pointer;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 7px 2px;
  border: none;
  box-sizing: border-box;
  color: white;
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

export default function ProductCreate({role, auth}) {
    let history = useHistory();
    const inputProductName = useRef();
    const inputProductDescription = useRef();
    const inputProductImage = useRef();
    const inputStartDate = useRef();
    const inputEndDate = useRef();
    const inputPrice = useRef();
    const inputSeatsAvailable = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (role === "Admin" && auth === "Auth") {
          // get the product information from the form
          const name = inputProductName.current.value;
          const description = inputProductDescription.current.value;
          const image = inputProductImage.current.value;
          const start = inputStartDate.current.value;
          const end = inputEndDate.current.value;
          const price = inputPrice.current.value;
          const seatsAvailable = inputSeatsAvailable.current.value;
          const productInformation = {
            name,
            description,
            image,
            start,
            end,
            price,
            seatsAvailable,
          };
          console.log([productInformation]);
          await axios.post(`/api/products/`, productInformation).then((res) => {
            window.alert(`Class created successfully!`);
            history.push(`/products`);
          });
        } else {
          window.alert(`Sorry, only Admin can create classes!`);
          history.push(`/products`);
        }
      };
    
      // for redirecting back
      const handleCancel = () => {
        history.push(`/products`);
      };

    return (
        <>
        <h1>Create New Product</h1>
        <Form onSubmit={handleSubmit}>
          <ProductInfo>
            <LabelContainer>
              <Label>Name:</Label>
              <DescriptionLabel>Description:</DescriptionLabel>
              <Label>Image URL:</Label>
              <Label>Start Date:</Label>
              <Label>End Date:</Label>
              <Label>Price:</Label>
              <Label>Class size:</Label>
            </LabelContainer>
            <InputContainer>
            <Input type="text" ref={inputProductName} minLength="2" required />
              <DescriptionInput
                type="text"
                ref={inputProductDescription}
                minLength="1"
                required
              />
              <Input type="url" ref={inputProductImage} minLength="5" />
              <Input type="date" ref={inputStartDate} minLength="2" required />
              <Input type="date" ref={inputEndDate} minLength="2" required />
              <Input type="text" ref={inputPrice} minLength="2" required />
              <Input type="text" ref={inputSeatsAvailable} minLength="2" required />
            </InputContainer>
          </ProductInfo>
          <Button>Create New Product</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form>
      </>
    );
  }