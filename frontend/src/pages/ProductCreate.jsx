import React, { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
            window.alert(`Products created successfully!`);
            history.push(`/products`);
          });
        } else {
          window.alert(`Sorry, only Admin can create products!`);
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
        {/* <Form onSubmit={handleSubmit}>
          <ProductInfo>
            <LabelContainer>
              <Label>Name:</Label>
              <DescriptionLabel>Description:</DescriptionLabel>
              <Label>Image URL:</Label>
              <Label>Start Date:</Label>
              <Label>End Date:</Label>
              <Label>Price:</Label>
              <Label>Seats Available:</Label>
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
        </Form> */}
      </>
    );
  }