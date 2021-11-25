import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

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
        <Link to="/products">
              <button primary>Back to programmes listing</button>
            </Link>
            <h1>{product?.name}</h1>
            <img src={product?.image} alt={product?.name} width="400px" height="400px" />
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
            <button onClick={() => enrollmentPage()}>Enroll Now!</button>
          </>
    )
}
