import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Form,
  Label,
  DescriptionLabel,
  ProductInfo,
  LabelContainer,
  InputContainer,
  Input,
  DescriptionInput,
  CancelLink,
  Button,
} from "../styles/ProductUpdateStyle";

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
