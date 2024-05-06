import styled from "styled-components";
import { useEffect, useState } from "react";
import MainHome from "./MainHome";
import MainClubNews from "./MainClubNews";
import Header from "./Header";

const Base = styled.div`
  width: 100%;
  height: 100vh;
`;

const SliderObject = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
  const wholePage = document.getElementsByClassName("slider");
  const totalPageNumber = wholePage[0]?.children?.length;

  const [currentInputs, setCurrentInputs] = useState({
    currentWindowHeight: window.innerHeight,
    currentPage: 0,
  });

  //윈도우 리사이즈 시, 윈도우 사이즈를 조정한다
  const setPageSize = () => {
    setCurrentInputs({ currentWindowHeight: window.innerHeight });
  };

  //현재 페이지가 몇페이지인지 구하는 함수
  const setPage = () => {
    for (var i = 1; i < totalPageNumber; i++) {
      if (window.scrollY < currentInputs.currentWindowHeight * i) {
        setCurrentInputs({ ...currentInputs, currentPage: i });
        return;
      }
    }
  };

  // Scroll Event와 Resize시 무한 반복을 피하기 위함
  useEffect(() => {
    window.addEventListener("scroll", setPage);
    window.addEventListener("resize", setPageSize);
    return () => {
      window.removeEventListener("scroll", setPage);
      window.removeEventListener("resize", setPageSize);
    };
  });

  window.addEventListener("wheel", (e) => {
    // 마우스 휠을 내릴때
    if (e.deltaY > 0) {
      let p = 1;
      while (p < totalPageNumber) {
        if (currentInputs.currentPage === p) {
          window.scrollTo({
            top: currentInputs.currentWindowHeight * p,
            behavior: "smooth",
          });
        }
        p++;
      }
    }
    // 마우스 휠을 올릴때
    if (e.deltaY < 0) {
      let p = 1;
      while (p < totalPageNumber) {
        if (currentInputs.currentPage === p) {
          window.scrollTo({
            top: currentInputs.currentWindowHeight * (p - 1),
            behavior: "smooth",
          });
        }
        p++;
      }
    }
  });

  return (
    <Base className="slider">
      <SliderObject>
        <Header />
        <MainHome />
      </SliderObject>
      <SliderObject>
        <MainClubNews />
      </SliderObject>
      <SliderObject>
        <GreenBox></GreenBox>
      </SliderObject>
    </Base>
  );
}

export default HomeWeb;
