import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

export const Th = styled.th`
  padding-top: 12px;
  padding-bottom: 12px;
  width: 250px;
  text-align: left;
  background-color: #778da9;
  color: white;
  border: 1px solid #ddd;
`;

export const Td = styled.td`
border: 1px solid #ddd;
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

function Dashboard({ role }) {
  // For the enrollment data
  const [enrolls, setEnrolls] = useState([]);
  let history = useHistory();
  // useeffect to get the enrolls data on render
  useEffect(() => {
    async function getEnrollsData() {
      await axios.get(`/api/enroll/`).then((enroll) => {
        setEnrolls(enroll.data.data);
      });
    }
    getEnrollsData();
  }, []);

  const deleteEnroll = (id) => {
    axios.delete(`/api/enroll/${id}`);
    window.alert(`Enrollment deleted`);
    setEnrolls(enrolls.filter((enroll) => enroll._id !== id));
  };

  const updateEnroll = (id) => {
    history.push(`/enroll/edit/${id}`);
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      {/* Only allow admin to view dashboard */}
      {enrolls.map((element) => {
        return (
          <>
            <div class="enrolls">
              <p key={element._id} />
              <Link to={`/enroll/${element._id}`}></Link>
              <tr>
                <Th>Name:</Th>
                <Th>Phone number:</Th>
                <Th>Email:</Th>
                <Th>Date of Birth:</Th>
                <Th>Class/course:</Th>
              </tr>
              <tr>
                <Td>{element.name}</Td>
                <Td>{element.phone}</Td>
                <Td>{element.email}</Td>
                <Td>{element.dateOfBirth}</Td>
                <Td>{element.product}</Td>
                {role === "Admin" && (
                  <>
                    <Button onClick={() => updateEnroll(element._id)}>
                      Update
                    </Button>{" "}
                    <Button onClick={() => deleteEnroll(element._id)}>
                      Delete
                    </Button>
                  </>
                )}
              </tr>
              <br />
            </div>
          </>
        );
      })}
    </>
  );
}

export default Dashboard;
