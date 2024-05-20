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

const TextFont_2 = styled.div`
  color: white;
  font-size: 90px;
  @media screen and (max-width: 1010px) {
    font-size: 65px;
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

function handleBoxClick(type) {
  console.log(`${type} box clicked`);
  // 기능 추가
}

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
      <BoxContainer>
        <Box onClick={() => handleBoxClick("System")}>
          <BoxImage src="/path/to/system-image.jpg" alt="System" />
          <BoxTitle>System</BoxTitle>
          <BoxContent>
            오버플로우, 권한상승 등의 취약점을 통해 운영체제를 장악하는 분야
          </BoxContent>
        </Box>
        <Box onClick={() => handleBoxClick("Web")}>
          <BoxImage src="/path/to/web-image.jpg" alt="Web" />
          <BoxTitle>Web</BoxTitle>
          <BoxContent>
            웹 서비스 상의 취약점을 통해 웹 서버, 데이터베이스 서버를 장악하는 분야
          </BoxContent>
        </Box>
        <Box onClick={() => handleBoxClick("Digital Forensics")}>
          <BoxImage src="/path/to/digital-forensics-image.jpg" alt="Digital Forensics" />
          <BoxTitle>Digital Forensics</BoxTitle>
          <BoxContent>
            파일 시스템 분석, 시스템 정보를 수집하여 디지털 증거를 수집 및 추구하는 분야
          </BoxContent>
        </Box>
        <Box onClick={() => handleBoxClick("Reversing")}>
          <BoxImage src="/path/to/reversing-image.jpg" alt="Reversing" />
          <BoxTitle>Reversing</BoxTitle>
          <BoxContent>
            역공학을 통해 프로그램의 실행 흐름을 제어하거나 분석하는 분야
          </BoxContent>
        </Box>
        <Box onClick={() => handleBoxClick("Project Team")}>
          <BoxImage src="/path/to/project-team-image.jpg" alt="Project Team" />
          <BoxTitle>Project Team</BoxTitle>
          <BoxContent>
            네트워크, 개발, 루트킷, 안드로이드 등 프로젝트 단위로 활동하는 팀
          </BoxContent>
        </Box>
      </BoxContainer>
    </BackgroundColor>
  );
}

export default MainHome;
