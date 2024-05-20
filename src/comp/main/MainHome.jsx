import React from "react";
import styled, { keyframes } from "styled-components";

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
  height: 60%;
  width: 90%;
  margin-bottom: 100px;
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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TextFont_2 = styled.div`
  color: white;
  font-size: 90px;
  display: flex;
  @media screen and (max-width: 1010px) {
    font-size: 65px;
  }
  
  span {
    opacity: 0;
    animation: ${fadeIn} 0.5s forwards;
  }

  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }
  span:nth-child(7) {
    animation-delay: 0.7s;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: -50px; /* 상자의 위치를 위로 올리기 위해 조정 */
`;

const Box = styled.div`
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 18%;
  text-align: center;
  color: white;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    background-color: #333333;
    transform: translateY(-10px);
  }

  @media screen and (max-width: 760px) {
    width: 80%;
    margin: 10px 0;
  }
`;

const BoxImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const BoxTitle = styled.h3`
  margin-bottom: 10px;
`;

const BoxContent = styled.p`
  font-size: 14px;
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
          <TextFont_2>
            {"PAY1OAD".split("").map((char, index) => (
              <span key={index}>{char}</span>
            ))}
          </TextFont_2>
        </RightWrapper>
      </CenterWrapper>
    </BackgroundColor>
  );
}

export default MainHome;
