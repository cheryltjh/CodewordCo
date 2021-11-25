import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  margin: 6px 2px;
  border: none;
  border-radius: 2px;
  box-sizing: border-box;
  cursor: pointer;
  color: white;
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

export const ContentBox = styled.div`
  display: flex;
  align-items: center;
  grid-area: content;
  justify-content: center;
  grid-gap: 50px;
`;

export const Content1 = styled.div`
  width: 500px;
  height: 100%;
`;

export default function ProductItem() {
  let id = useParams();
  let history = useHistory();
  // For the product data
  const [product, setProduct] = useState();
  // handle function to return user to product list page
  const enrollmentPage = () => {
    history.push(`/enroll`);
  };
  // useeffect to get the product data
  useEffect(() => {
    async function getProductData() {
      await axios.get(`/api/products/${id.id}`).then((product) => {
        setProduct(product.data.data);
      });
    }
    getProductData();
  }, []);

  return (
    <>
      <ContentBox>
      <Link to="/products">
        <Button>Back to programmes listing</Button>
      </Link>
        <img
          src={product?.image}
          alt={product?.name}
          width="400px"
          height="400px"
        />
        <Content1>
          <h1>{product?.name}</h1>
          <h4>Description:</h4>
          {product?.description}
          <h4>Start date:</h4>
          <p>{product?.start}</p>
          <h4>End date:</h4>
          <p> {product?.end}</p>
          <h4>Price:</h4>
          <p> {product?.price}</p>
          <h4>Seats Available:</h4>
          <p> {product?.seatsAvailable}</p>
          <Button onClick={() => enrollmentPage()}>Enroll Now!</Button>
        </Content1>
      </ContentBox>
    </>
  );
}
