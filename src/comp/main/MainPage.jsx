import React from "react";
import MainHome from "./MainHome";
import NewSection from "./NewSection"; // 새로운 섹션 컴포넌트 임포트
import MainClubNews from "./MainClubNews";
import Header from "./Header";
import "./MainPage.css"; // CSS 파일 임포트

function HomeWeb() {
  return (
    <div className="Base slider">
      <Header />
      <div className="SliderObject">
        <MainHome />
      </div>
      <div className="SliderObject">
        <NewSection /> {/* 새로운 섹션 추가 */}
      </div>
      <div className="SliderObject">
        <MainClubNews />
      </div>
    </div>
  );
}

export default HomeWeb;
