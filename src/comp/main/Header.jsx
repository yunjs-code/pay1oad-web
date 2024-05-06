import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const BackgroundColor = styled.div`
  background-color: #b4ccdf;
  height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  flex-direction: row;
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right :10px;
  flex-direction: row;
`;

const TextCss = styled.div`
  height: 50%;
  width: 100%;
  color: #ffffff;
  margin-right: 10px;
  cursor: pointer;
`;

const Button = styled.button`
  height: 50%;
  width: 100%;
  color: #000000;
  margin-right: 10px;
  margin-left: 10px;
`;

function Header() {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭")
    setLoginSuccess(false);
  };
  const goToSign = () => {
    navigate("/SignIn");
  };

  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const goToClubNews = () => {
    navigate("/ClubNews");
  };


  const goToUserPage= () => {
    navigate("/UserPage");
  };
  const location = useLocation();
  const loggedIn = location.state?.loggedIn || false;

  useEffect(() => {
    if (loggedIn) {
      setLoginSuccess(true);
      const usernameFromState = location.state?.username || "";
      setUserName(usernameFromState);
    } else {
      setLoginSuccess(false);
      setUserName("");
    }
  }, [loggedIn, location.state]);


  return (
    <BackgroundColor>
      <LeftWrapper>
        <TextCss onClick={goToClubNews}>Club News</TextCss>
        <TextCss>Security News</TextCss>
        <TextCss>CTF</TextCss>
      </LeftWrapper>
      <RightWrapper>
          {loginSuccess ? (
              <>
                <p onClick={goToUserPage}> {userName} 님  </p>
                <Button onClick={handleLogout}>로그아웃
                </Button>
              </>
          ) : (
              <>
                <TextCss onClick={goToSign}>SIGN IN</TextCss>
                <TextCss onClick={goToLogIn}>LOG IN</TextCss>
              </>
          )}
      </RightWrapper>
    </BackgroundColor>
  );
}

export default Header;
