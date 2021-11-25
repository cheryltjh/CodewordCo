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

export const EnrollInfo = styled.div`
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

export default function EnrollmentUpdate({ role, auth }) {
  const history = useHistory();
  const { id } = useParams();
  const [updateEnrollDetail, setUpdateEnrollDetail] = useState({
    name: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    product: "",
  });

  // get the enroll data for the update form to prepopulate the values
  useEffect(() => {
    async function getEnrollData() {
      await axios.get(`/api/enroll/${id}`).then((enroll) => {
        setUpdateEnrollDetail({
          name: enroll.data.data.name,
          phone: enroll.data.data.phone,
          email: enroll.data.data.email,
          dateOfBirth: enroll.data.data.dateOfBirth,
          product: enroll.data.data.product,
        });
      });
    }
    getEnrollData();
  }, [id]);

  //for every change in enroll details, update the state
  const handleChange = (event) => {
    const name = event.target.name;
    setUpdateEnrollDetail({
      ...updateEnrollDetail,
      [name]: event.target.value,
    });
  };

  // update on clicking update Button
  const handleUpdate = async (event) => {
    event.preventDefault();
    if (role === "Admin" && auth === "Auth") {
      await axios
        .put(`/api/enroll/${id}`, updateEnrollDetail)
        .then((res) => {
          window.alert(`Enrollment updated successfully!`);
        });
      history.push(`/dashboard`);
    } else {
      window.alert(`Sorry, only Admin can update enrollment!`);
      history.push(`/products`);
    }
  };

  return (
    <>
      <h1>Update Enrollment Details</h1>
      <Form onSubmit={handleUpdate}>
        <EnrollInfo>
          <LabelContainer>
            <Label>Name:</Label>
            <DescriptionLabel>Phone:</DescriptionLabel>
            <Label>Email:</Label>
            <Label>Date Of Birth:</Label>
            <Label>Product:</Label>
          </LabelContainer>
          <InputContainer>
            <Input
              type="text"
              name="name"
              minLength="2"
              value={updateEnrollDetail.name}
              onChange={(event) => handleChange(event)}
              required
            />
            <DescriptionInput
              type="text"
              name="phone"
              minLength="1"
              value={updateEnrollDetail.phone}
              onChange={(event) => handleChange(event)}
              required
            />
            <Input
              type="text"
              name="email"
              minLength="1"
              value={updateEnrollDetail.email}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="text"
              name="dateOfBirth"
              minLength="1"
              value={updateEnrollDetail.dateOfBirth}
              onChange={(event) => handleChange(event)}
            />
            <Input
              type="text"
              name="product"
              minLength="1"
              value={updateEnrollDetail.product}
              onChange={(event) => handleChange(event)}
            />
          </InputContainer>
        </EnrollInfo>
        <Button type="submit" value="Update Enrollment">
          Update Enrollment
        </Button>
      </Form>
      <CancelLink to={"/products"}>
        <Button>Cancel</Button>
      </CancelLink>
    </>
  );
}
