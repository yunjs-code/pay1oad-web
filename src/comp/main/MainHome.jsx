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

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 90%;
  margin-bottom: 150px;
  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
`;

const RightWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LeftWrapper = styled.div`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center; 
`;
const LeftTextArea = styled.div`
  font-size: 90px;
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TextFont = styled.div`
  color: yellow;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: center;
  

  @media screen and (max-width: 1010px) {
    font-size: 40px;
  }
  @media screen and (max-width: 810px) {
    font-size: 37px;
  }
`;
const TextFont_2 = styled.div`
  color: white;
  font-size: 90px;
  @media screen and (max-width: 1010px) {
    font-size: 65px;
  }
`;
function MainHome() {
  return (
    <BackgroundColor>
      <CenterWrapper>
        <LeftWrapper>
          <LeftTextArea>
            <TextFont>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>GACHON UNIV'S</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>NO.1</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>INFORMATION</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>SECURITY</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>CLUB</div>
            </TextFont>
          </LeftTextArea>
        </LeftWrapper>
        <RightWrapper>
          <TextFont_2>PAY1OAD</TextFont_2>
        </RightWrapper>
      </CenterWrapper>
    </BackgroundColor>
  );
}

export default MainHome;
