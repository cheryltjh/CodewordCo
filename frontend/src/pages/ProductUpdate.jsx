import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components"
import {Link} from "react-router-dom"

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

export const CancelLink = styled(Link)`
  text-decoration: none;
  outline: none;
  border: none;
`;

export const Button = styled.button`
  padding: 10px;
  margin: 7px 2px;
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

export default function ProducUpdate({ role, auth }) {
  const history = useHistory();
  const { id } = useParams();
  const [updateProductDetail, setUpdateProductDetail] = useState({
    name: "",
    description: "",
    image: "",
    start: "",
    end: "",
    price: "",
    seatsAvailable: "",
  });

  // get the product data for the update form to prepopulate the values
  useEffect(() => {
    async function getProductData() {
      await axios.get(`/api/products/${id}`).then((product) => {
        setUpdateProductDetail({
          name: product.data.data.name,
          description: product.data.data.description,
          image: product.data.data.image,
          start: product.data.data.start,
          end: product.data.data.end,
          price: product.data.data.price,
          seatsAvailable: product.data.data.seatsAvailable,
        });
      });
    }
    getProductData();
  }, [id]);

  //for every change in product details, update the state
  const handleChange = (event) => {
    const name = event.target.name;
    setUpdateProductDetail({
      ...updateProductDetail,
      [name]: event.target.value,
    });
  };

  // update on clicking update Button
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      await axios
        .put(`/api/products/${id}`, updateProductDetail)
        .then((res) => {
          window.alert(`Product updated successfully!`);
        });
      history.push(`/products`);
    } else {
      window.alert(`Sorry, only Admin can update products!`);
      history.push(`/products`);
    }
  };

  return (
    <>
      <h1>Update Product Details</h1>
      <Form onSubmit={handleUpdate}>
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
            <Input
              type="text"
              name="name"
              minLength="2"
              value={updateProductDetail.name}
              onChange={(event) => handleChange(event)}
              required
            />
            <DescriptionInput
              type="textarea"
              name="description"
              minLength="1"
              value={updateProductDetail.description}
              onChange={(event) => handleChange(event)}
              required
            />
            <Input
              type="text"
              name="image"
              minLength="1"
              value={updateProductDetail.image}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="date"
              name="start"
              minLength="1"
              value={updateProductDetail.start}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="date"
              name="end"
              minLength="1"
              value={updateProductDetail.end}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="text"
              name="price"
              minLength="1"
              value={updateProductDetail.price}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="text"
              name="seatsAvailable"
              minLength="1"
              value={updateProductDetail.seatsAvailable}
              onChange={(event) => handleChange(event)}
            />
          </InputContainer>
        </ProductInfo>
        <Button type="submit" value="Update Products">
          Update Product
        </Button>
      </Form>
      <CancelLink to={"/products"}>
        <Button>Cancel</Button>
      </CancelLink>
    </>
  );
}
