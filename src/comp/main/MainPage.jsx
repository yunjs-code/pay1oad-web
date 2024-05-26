import styled from "styled-components";
// import { useEffect, useState } from "react";
import MainHome from "./MainHome";
import MainClubNews from "./MainClubNews";
import Header from "./Header";
import "./MainPage.css";
const Base = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
`;

const SliderObject = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GreenBox = styled(SliderObject)`
  background-color: lightgreen;
`;

const GreyBox = styled(SliderObject)`
  background-color: grey;
`;

const OrangeBox = styled(SliderObject)`
  background-color: orange;
`;

function HomeWeb() {
  return (
    <Base className="slider">
      <Header />
      <SliderObject>
        <MainHome />
      </SliderObject>
      <SliderObject>
        <MainClubNews />
      </SliderObject>
      <SliderObject>
        <MainClubNews />
      </SliderObject>
    </Base>
  );
}

export default HomeWeb;
