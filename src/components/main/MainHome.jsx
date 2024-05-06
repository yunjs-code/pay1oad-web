// MainHome.jsx

import React from "react";
import "./MainHome.css";

function MainHome() {
  return (
    <div className="backgroundColor">
      <div className="centerWrapper">
        <div className="leftWrapper">
          <div className="leftTextArea">
            <div className="textFont">
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>GACHON UNIV'S</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>NO.1</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>INFORMATION</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>SECURITY</div>
              <div style={{ alignSelf: "flex-start", alignItems: "center" }}>CLUB</div>
            </div>
          </div>
        </div>
        <div className="rightWrapper">
          <div className="textFont_2">PAY1OAD</div>
        </div>
      </div>
    </div>
  );
}

export default MainHome;
