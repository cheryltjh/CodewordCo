import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import {
  CardWrapper,
  CardImage,
  CardTextWrapper,
  CardTextTitle,
  CardStatWrapper,
  CardStats,
  LinkText,
  ProductCreateBtn,
  Button,
  Div,
  ProductWrapper,
  ContentContainer,
} from "../styles/ProductListStyle";

function ProductList({ role }) {
  // For the product data
  const [products, setProducts] = useState([]);
  let history = useHistory();
  // useeffect to get the products data on render
  useEffect(() => {
    async function getProductsData() {
      await axios.get(`/api/products/`).then((product) => {
        setProducts(product.data.data);
      });
    }
    getProductsData();
  }, []);

  const deleteProduct = (id) => {
    axios.delete(`/api/products/${id}`);
    window.alert(`Programme deleted`);
    setProducts(products.filter((product) => product._id !== id));
  };

  const updateProduct = (id) => {
    history.push(`/products/${id}`);
  };

  return (
    <>
      <h1>Programmes offered</h1>
      <ContentContainer>
        {/* Only allow admin to make new product */}
        {role === "Admin" && (
          <>
            <ProductCreateBtn to="/products/new">
              <Button>Create Product</Button>
            </ProductCreateBtn>
          </>
        )}
        <ProductWrapper>
          {products.map((element) => {
            return (
              <>
                <Div class="products">
                  <p key={element._id} />
                  <CardWrapper>
                    <Link to={`/products/${element._id}`}>
                      <CardImage src={element.image} />
                    </Link>
                    <CardTextWrapper>
                      <CardTextTitle>{element.name}</CardTextTitle>
                    </CardTextWrapper>
                    {role === "Admin" && (
                      <>
                        <CardStatWrapper>
                          <CardStats>
                            <LinkText
                              onClick={() => updateProduct(element._id)}
                            >
                              Update
                            </LinkText>
                          </CardStats>
                          <CardStats>
                            <LinkText
                              onClick={() => deleteProduct(element._id)}
                            >
                              X
                            </LinkText>
                          </CardStats>
                        </CardStatWrapper>
                      </>
                    )}
                  </CardWrapper>
                </Div>
              </>
            );
          })}
        </ProductWrapper>
      </ContentContainer>
    </>
  );
}

export default ProductList;
