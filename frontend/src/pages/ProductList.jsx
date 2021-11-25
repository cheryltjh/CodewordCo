import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export const ProductCreateBtn = styled(Link)`
  text-decoration: none;
  outline: none;
  border: none;
`;

export const Button = styled.button`
  margin-bottom: 10px;
  background-color: #778da9;
  color: white;
  padding: 10px 25px;
  font-size: 18px;
  outline: none;
  cursor: pointer;
  border: none;
`;

export const Div = styled.div`
  margin: 5px;
`;
export const ProductWrapper = styled.div`
  width: 100%;
  margin: 5px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 200px;
  grid-template-rows: 200px 40px 40px;
  grid-template-areas: "image" "text" "stats";
  border-radius: 18px;
  text-align: center;
`;

export const CardImage = styled.img`
  display: block;
  grid-area: image;
  object-fit: cover;
  width: 200px;
  height: 250px;
`;

export const CardTextWrapper = styled.div`
  grid-area: text;
  margin: 5px;
  color: #0d1b2a;
`;

export const CardTextTitle = styled.h2`
  font-size: 1.5rem;
  box-sizing: border-box;
  min-width: 0px;
  text-align: center;
  margin: 0px;
  color: #0d1b2a;
`;

export const CardStatWrapper = styled.div`
  grid-area: stats;
  display: grid;
  /* grid-template-columns: 1fr 1fr 1fr; */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  background: #778da9;
`;

export const CardStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

export const LinkText = styled.a`
  color: #000;
  margin-top: -2px;
  padding: 4px 7px;
  text-decoration: none;
  border-radius: 24px;
`;

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
    history.push(`/products/edit/${id}`);
  };

  return (
    <>
      <h1>Classes Available</h1>
      <ContentContainer>
        {/* Only allow admin to make new product */}
        {role === "Admin" && (
          <>
            <ProductCreateBtn to="/products/new">
              <Button>Create New Class</Button>
            </ProductCreateBtn>
          </>
        )}
        <ProductWrapper>
          {products.map((element) => {
            return (
              <>
                <Div class="products">
                  <CardTextWrapper>
                    <CardTextTitle>{element.name}</CardTextTitle>
                  </CardTextWrapper>
                  <p key={element._id} />
                  <CardWrapper>
                    <Link to={`/products/${element._id}`}>
                      <CardImage src={element.image} />
                    </Link>
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
