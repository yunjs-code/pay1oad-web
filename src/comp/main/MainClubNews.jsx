import React from "react";
import styled from "styled-components";

const BackgroundColor = styled.div`
  background-color: #000000;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const NameWrapper = styled.div`
  height: 100px;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  @media screen and (max-width: 760px) {
    height: 50px;
  }
`;

const NameCss = styled.div`
  height: 50px;
  width: 300px;
  background-color: yellow;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-size: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
  @media screen and (max-width: 760px) {
    height: 25px;
    width: 150px;
    font-size: 10px;
  }
`;

const NewsBoxWrapper = styled.div`
  height: 80%;
  width: 100%;
  height: calc(100% - 100px);
  justify-content: center;
  align-items: center;
  display: flex;
`;

const NewsBox = styled.div`
  background-color: white;
  height: 80%;
  width: 80%;
  border-radius: 20px;
`;

function MainHome() {
  return (
    <BackgroundColor>
      <NameWrapper>
        <NameCss>Club News Update</NameCss>
      </NameWrapper>
      <NewsBoxWrapper>
        <NewsBox></NewsBox>
      </NewsBoxWrapper>
    </BackgroundColor>
  );
}

export default MainHome;
