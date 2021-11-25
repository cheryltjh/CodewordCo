import React from "react";
import styled from "styled-components";
import code from "../components/code2.png";

const HeroContainer = styled.div`
  background-image: url(${code});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 94vh;
  @media only screen and (max-width: 1600px) {
    height: 94vh;
  }
`;

const HeroContent = styled.section`
  height: 70%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #0d1b2a;
  @media only screen and (max-width: 375px) {
    text-align: start;
    height: 80%;
  }
`;

const HeroContentText = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
  @media only screen and (max-width: 375px) {
    position: absolute;
    align-items: flex-start;
  }
`;

const HeroTitle = styled.h1`
  font-size: 53px;
  font-weight: 900;
  display: flex;
  @media only screen and (max-width: 600px) {
    width: 80%;
  }
  @media only screen and (max-width: 375px) {
    position: absolute;
    align-items: flex-start;
  }
`;

const HeroText = styled.h3`
  font-size: 20px;
  font-weight: 400;
  padding: 2.5rem 2rem;
  @media only screen and (max-width: 375px) {
    padding: 1.5rem 0;
  }
`;

function Home() {
  return (
    <div>
      <HeroContainer>
        <HeroContent>
          <HeroContentText>
            <HeroTitle>Dive into the world of coding! Make your learning easy, fun and useful today!</HeroTitle>
            <HeroText>
              Feel free to reach out to us via our contact page for more
              information with regards to our courses, fees or any other questions you have!
            </HeroText>
          </HeroContentText>
        </HeroContent>
      </HeroContainer>
    </div>
  );
}

export default Home;
