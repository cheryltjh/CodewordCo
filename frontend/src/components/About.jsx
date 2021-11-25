import React from "react";
import styled from "styled-components";

const P = styled.p`
  margin: 8px;
`;


function About() {
  return (
    <>
      <h1>About Us</h1>
      <P>Providing every student with the support and tools for success.</P>
      <P>We strive to give our students the curriculum and the space to encourage learning.</P>
      <P>We invite you to browse our site to find just what you have been looking for, and get in touch with any questions.</P>
    </>
  );
}

export default About;
