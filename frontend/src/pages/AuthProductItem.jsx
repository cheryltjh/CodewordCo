import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
    Img,
    Button,
    ContentBox,
    Content1,
  } from "../styles/AuthProductItem";

function AuthProductList({ userName, role }) {
  let id = useParams();
  let history = useHistory();
  // For the product data
  const [product, setProduct] = useState();

  // handle function to return user to product list page
  const productListPage = () => {
    history.push(`/products`);
  };

  // useeffect to get the products data
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
      <div>
        <ContentBox>
          <h1>{product?.name}</h1>
          <Img src={product?.image} alt={product?.name} width="400px" height="400px" />
          <Content1>
          <h4>Description:</h4>
              <p> {product?.description}</p>
              <h4>Start date:</h4>
              <p>{product?.start}</p>
              <h4>End date:</h4>
              <p> {product?.end}</p>
              <h4>Price:</h4>
              <p> {product?.price}</p>
              <h4>Seats Available:</h4>
              <p> {product?.seatsAvailable}</p>
          </Content1>
          <Button onClick={() => productListPage()}>Back</Button>
        </ContentBox>
      </div>
      <br />
    </>
  );
}

export default AuthProductList;
