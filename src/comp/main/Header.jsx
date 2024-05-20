import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userName, setUserName] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const loggedIn = location.state?.loggedIn || false;
    if (loggedIn) {
      setLoginSuccess(true);
      const usernameFromState = location.state?.username || "";
      setUserName(usernameFromState);
    } else {
      setLoginSuccess(false);
      setUserName("");
    }
  }, [location.state]);

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭");
    dispatch(logoutUser());
    setLoginSuccess(false);
    setUserName("");
    navigate("/");
  };

  const goToSign = () => {
    navigate("/SignIn");
  };

  const goToLogIn = () => {
    navigate("/LogIn");
  };

  const goToClubNews = () => {
    navigate("/board"); // 게시판 경로로 변경
  };

  const goToUserPage = () => {
    navigate("/UserPage", { state: { loggedIn: true, username: userName } });
  };

  const handleSearch = () => {
    console.log("검색 버튼 클릭");
    // 검색 기능 구현 필요
  };

  const goToCtf = () => {
    window.location.href = "http://pay1oad.com:50001/";
  };

  return (
    <div className="header">
      <div className="left-wrapper">
        <div className="text-css" onClick={goToClubNews}>Club News</div>
        <div className="text-css">Security News</div>
        <div className="text-css" onClick={goToCtf}>CTF</div>
      </div>
      <div className="right-wrapper">
        {loginSuccess ? (
          <>
            <div className="text-css" onClick={goToUserPage}> {userName} 님 </div>
            <button className="button" onClick={handleLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <div className="text-css" onClick={goToLogIn}>LOG IN</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
